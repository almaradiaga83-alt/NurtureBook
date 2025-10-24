/**
 * Chores Context
 * Manages chores, children, and points system with Supabase
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Chore, Child } from '../types';
import { db, subscriptions } from '../config/supabase';
import { useAuth } from './AuthContext';

interface ChoresState {
  chores: Chore[];
  children: Child[];
  isLoading: boolean;
  error: string | null;
}

type ChoresAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CHORES'; payload: Chore[] }
  | { type: 'SET_CHILDREN'; payload: Child[] }
  | { type: 'ADD_CHORE'; payload: Chore }
  | { type: 'UPDATE_CHORE'; payload: Chore }
  | { type: 'DELETE_CHORE'; payload: string }
  | { type: 'COMPLETE_CHORE'; payload: { choreId: string; childId: string } }
  | { type: 'SET_ERROR'; payload: string | null };

interface ChoresContextType extends ChoresState {
  addChore: (title: string, points: number, assignedTo: string, dueDate?: Date) => Promise<void>;
  addChild: (name: string, age: number) => Promise<void>;
  updateChore: (id: string, updates: Partial<Chore>) => Promise<void>;
  deleteChore: (id: string) => Promise<void>;
  completeChore: (choreId: string) => Promise<void>;
  uncompleteChore: (choreId: string) => Promise<void>;
  getChoresByChild: (childId: string) => Chore[];
  getCompletedChores: () => Chore[];
  getPendingChores: () => Chore[];
  updateChildPoints: (childId: string, points: number) => Promise<void>;
  refreshData: () => Promise<void>;
}

const ChoresContext = createContext<ChoresContextType | undefined>(undefined);

const initialState: ChoresState = {
  chores: [],
  children: [],
  isLoading: true,
  error: null,
};

const choresReducer = (state: ChoresState, action: ChoresAction): ChoresState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_CHORES':
      return { ...state, chores: action.payload, isLoading: false };
    case 'SET_CHILDREN':
      return { ...state, children: action.payload };
    case 'ADD_CHORE':
      return { ...state, chores: [...state.chores, action.payload] };
    case 'UPDATE_CHORE':
      return {
        ...state,
        chores: state.chores.map(chore =>
          chore.id === action.payload.id ? action.payload : chore
        ),
      };
    case 'DELETE_CHORE':
      return {
        ...state,
        chores: state.chores.filter(chore => chore.id !== action.payload),
      };
    case 'COMPLETE_CHORE':
      return {
        ...state,
        chores: state.chores.map(chore =>
          chore.id === action.payload.choreId
            ? { ...chore, completed: true, completedAt: new Date() }
            : chore
        ),
        children: state.children.map(child =>
          child.id === action.payload.childId
            ? { ...child, totalPoints: child.totalPoints + (state.chores.find(c => c.id === action.payload.choreId)?.points || 0) }
            : child
        ),
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const ChoresProvider: React.FC<{ children: ReactNode }> = ({ children: childrenNode }) => {
  const [state, dispatch] = useReducer(choresReducer, initialState);
  const { user, isAuthenticated } = useAuth();

  // Load data when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadData();
      
      // Set up real-time subscription for chores
      const choreSubscription = subscriptions.chores(user.id, (payload) => {
        const { eventType, new: newRecord, old: oldRecord } = payload;
        
        switch (eventType) {
          case 'INSERT':
            if (newRecord) {
              const chore = convertDbChoreToChore(newRecord);
              dispatch({ type: 'ADD_CHORE', payload: chore });
            }
            break;
          case 'UPDATE':
            if (newRecord) {
              const chore = convertDbChoreToChore(newRecord);
              dispatch({ type: 'UPDATE_CHORE', payload: chore });
            }
            break;
          case 'DELETE':
            if (oldRecord) {
              dispatch({ type: 'DELETE_CHORE', payload: oldRecord.id });
            }
            break;
        }
      });

      return () => {
        choreSubscription.unsubscribe();
      };
    } else {
      // Clear data when user logs out
      dispatch({ type: 'SET_CHORES', payload: [] });
      dispatch({ type: 'SET_CHILDREN', payload: [] });
    }
  }, [isAuthenticated, user]);

  const convertDbChoreToChore = (dbChore: any): Chore => ({
    id: dbChore.id,
    title: dbChore.title,
    description: dbChore.description,
    points: dbChore.points,
    assignedTo: dbChore.assigned_to,
    dueDate: dbChore.due_date ? new Date(dbChore.due_date) : undefined,
    completed: dbChore.completed,
    completedAt: dbChore.completed_at ? new Date(dbChore.completed_at) : undefined,
    createdBy: dbChore.created_by,
    createdAt: new Date(dbChore.created_at),
  });

  const convertDbChildToChild = (dbChild: any): Child => ({
    id: dbChild.id,
    name: dbChild.name,
    age: dbChild.age,
    profileImage: dbChild.profile_image,
    totalPoints: dbChild.total_points,
    parentId: dbChild.parent_id,
    createdAt: new Date(dbChild.created_at),
  });

  const loadData = async () => {
    if (!user) return;
    
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Load chores
      const { data: choresData, error: choresError } = await db.getChores(user.id);
      if (choresError) {
        dispatch({ type: 'SET_ERROR', payload: choresError.message });
      } else {
        const chores = choresData?.map(convertDbChoreToChore) || [];
        dispatch({ type: 'SET_CHORES', payload: chores });
      }

      // Load children
      const { data: childrenData, error: childrenError } = await db.getChildren(user.id);
      if (childrenError) {
        dispatch({ type: 'SET_ERROR', payload: childrenError.message });
      } else {
        const children = childrenData?.map(convertDbChildToChild) || [];
        dispatch({ type: 'SET_CHILDREN', payload: children });
      }
    } catch (error) {
      console.error('Error loading chores data:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load chores data' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addChore = async (title: string, points: number, assignedTo: string, dueDate?: Date): Promise<void> => {
    if (!user) {
      dispatch({ type: 'SET_ERROR', payload: 'User not authenticated' });
      return;
    }

    try {
      const choreData = {
        title,
        points,
        assigned_to: assignedTo,
        due_date: dueDate?.toISOString(),
        completed: false,
        created_by: user.id,
      };

      const { data, error } = await db.createChore(choreData);
      
      if (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        return;
      }

      if (data) {
        const chore = convertDbChoreToChore(data);
        dispatch({ type: 'ADD_CHORE', payload: chore });
      }
    } catch (error) {
      console.error('Error adding chore:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add chore' });
    }
  };

  const updateChore = async (id: string, updates: Partial<Chore>): Promise<void> => {
    try {
      const dbUpdates = {
        title: updates.title,
        description: updates.description,
        points: updates.points,
        assigned_to: updates.assignedTo,
        due_date: updates.dueDate?.toISOString(),
        completed: updates.completed,
        completed_at: updates.completedAt?.toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await db.updateChore(id, dbUpdates);
      
      if (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        return;
      }

      if (data) {
        const chore = convertDbChoreToChore(data);
        dispatch({ type: 'UPDATE_CHORE', payload: chore });
      }
    } catch (error) {
      console.error('Error updating chore:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update chore' });
    }
  };

  const deleteChore = async (id: string): Promise<void> => {
    try {
      const { error } = await db.deleteChore(id);
      
      if (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        return;
      }

      dispatch({ type: 'DELETE_CHORE', payload: id });
    } catch (error) {
      console.error('Error deleting chore:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete chore' });
    }
  };

  const completeChore = async (choreId: string): Promise<void> => {
    try {
      const chore = state.chores.find(c => c.id === choreId);
      if (!chore) return;

      // Update chore completion status
      const choreUpdates = {
        completed: true,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { error: choreError } = await db.updateChore(choreId, choreUpdates);
      if (choreError) {
        dispatch({ type: 'SET_ERROR', payload: choreError.message });
        return;
      }

      // Update child points
      const child = state.children.find(c => c.id === chore.assignedTo);
      if (child) {
        const childUpdates = {
          total_points: child.totalPoints + chore.points,
        };

        const { error: childError } = await db.updateChild(child.id, childUpdates);
        if (childError) {
          dispatch({ type: 'SET_ERROR', payload: childError.message });
          return;
        }
      }

      // Update local state
      dispatch({ type: 'COMPLETE_CHORE', payload: { choreId, childId: chore.assignedTo } });
    } catch (error) {
      console.error('Error completing chore:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to complete chore' });
    }
  };

  const uncompleteChore = async (choreId: string): Promise<void> => {
    try {
      const chore = state.chores.find(c => c.id === choreId);
      if (!chore) return;

      // Update chore completion status
      const choreUpdates = {
        completed: false,
        completed_at: undefined,
        updated_at: new Date().toISOString(),
      };

      const { error: choreError } = await db.updateChore(choreId, choreUpdates);
      if (choreError) {
        dispatch({ type: 'SET_ERROR', payload: choreError.message });
        return;
      }

      // Update child points
      const child = state.children.find(c => c.id === chore.assignedTo);
      if (child) {
        const childUpdates = {
          total_points: Math.max(0, child.totalPoints - chore.points),
        };

        const { error: childError } = await db.updateChild(child.id, childUpdates);
        if (childError) {
          dispatch({ type: 'SET_ERROR', payload: childError.message });
          return;
        }
      }

      // Update local state
      const updatedChore = { ...chore, completed: false, completedAt: undefined };
      const updatedChildren = state.children.map(c =>
        c.id === chore.assignedTo
          ? { ...c, totalPoints: Math.max(0, c.totalPoints - chore.points) }
          : c
      );
      
      dispatch({ type: 'UPDATE_CHORE', payload: updatedChore });
      dispatch({ type: 'SET_CHILDREN', payload: updatedChildren });
    } catch (error) {
      console.error('Error uncompleting chore:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to uncomplete chore' });
    }
  };

  const getChoresByChild = (childId: string): Chore[] => {
    return state.chores.filter(chore => chore.assignedTo === childId);
  };

  const getCompletedChores = (): Chore[] => {
    return state.chores.filter(chore => chore.completed);
  };

  const getPendingChores = (): Chore[] => {
    return state.chores.filter(chore => !chore.completed);
  };

  const updateChildPoints = async (childId: string, points: number): Promise<void> => {
    try {
      const { data, error } = await db.updateChild(childId, { total_points: points });
      
      if (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        return;
      }

      if (data) {
        const child = convertDbChildToChild(data);
        const updatedChildren = state.children.map(c =>
          c.id === childId ? child : c
        );
        dispatch({ type: 'SET_CHILDREN', payload: updatedChildren });
      }
    } catch (error) {
      console.error('Error updating child points:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update child points' });
    }
  };

  const refreshData = async (): Promise<void> => {
    await loadData();
  };

  const addChild = async (name: string, age: number): Promise<void> => {
    if (!user) {
      dispatch({ type: 'SET_ERROR', payload: 'User not authenticated' });
      return;
    }

    try {
      const childData = {
        name,
        age,
        total_points: 0,
        parent_id: user.id,
      };

      const { data, error } = await db.createChild(childData);
      
      if (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        return;
      }

      if (data) {
        const child = convertDbChildToChild(data);
        dispatch({ type: 'SET_CHILDREN', payload: [...state.children, child] });
      }
    } catch (error) {
      console.error('Error adding child:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add child' });
    }
  };

  const value: ChoresContextType = {
    ...state,
    addChore,
    addChild,
    updateChore,
    deleteChore,
    completeChore,
    uncompleteChore,
    getChoresByChild,
    getCompletedChores,
    getPendingChores,
    updateChildPoints,
    refreshData,
  };

  return <ChoresContext.Provider value={value}>{childrenNode}</ChoresContext.Provider>;
};

export const useChores = (): ChoresContextType => {
  const context = useContext(ChoresContext);
  if (context === undefined) {
    throw new Error('useChores must be used within a ChoresProvider');
  }
  return context;
};
