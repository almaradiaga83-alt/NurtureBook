/**
 * Chores Context
 * Manages chores, children, and points system
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Chore, Child } from '../types';
import { storage } from '../services/storage';
import { mockChores, mockChildren } from '../services/mockData';

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

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Load chores
      const storedChores = await storage.getChores();
      if (storedChores && Array.isArray(storedChores) && storedChores.length > 0) {
        const chores = storedChores.map((chore: any) => ({
          ...chore,
          dueDate: chore.dueDate ? new Date(chore.dueDate) : undefined,
          completedAt: chore.completedAt ? new Date(chore.completedAt) : undefined,
          createdAt: new Date(chore.createdAt),
        }));
        dispatch({ type: 'SET_CHORES', payload: chores });
      } else {
        dispatch({ type: 'SET_CHORES', payload: mockChores });
        await storage.storeChores(mockChores);
      }

      // Load children
      const storedChildren = await storage.getChildren();
      if (storedChildren && Array.isArray(storedChildren) && storedChildren.length > 0) {
        const children = storedChildren.map((child: any) => ({
          ...child,
          createdAt: new Date(child.createdAt),
        }));
        dispatch({ type: 'SET_CHILDREN', payload: children });
      } else {
        dispatch({ type: 'SET_CHILDREN', payload: mockChildren });
        await storage.storeChildren(mockChildren);
      }
    } catch (error) {
      console.error('Error loading chores data:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load chores data' });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addChore = async (title: string, points: number, assignedTo: string, dueDate?: Date): Promise<void> => {
    try {
      const newChore: Chore = {
        id: `chore-${Date.now()}`,
        title,
        points,
        assignedTo,
        dueDate,
        completed: false,
        createdBy: 'parent-1', // This would come from auth context
        createdAt: new Date(),
      };

      const updatedChores = [...state.chores, newChore];
      await storage.storeChores(updatedChores);
      dispatch({ type: 'ADD_CHORE', payload: newChore });
    } catch (error) {
      console.error('Error adding chore:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add chore' });
    }
  };

  const updateChore = async (id: string, updates: Partial<Chore>): Promise<void> => {
    try {
      const updatedChore: Chore = {
        ...state.chores.find(chore => chore.id === id)!,
        ...updates,
      };

      const updatedChores = state.chores.map(chore =>
        chore.id === id ? updatedChore : chore
      );
      
      await storage.storeChores(updatedChores);
      dispatch({ type: 'UPDATE_CHORE', payload: updatedChore });
    } catch (error) {
      console.error('Error updating chore:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update chore' });
    }
  };

  const deleteChore = async (id: string): Promise<void> => {
    try {
      const updatedChores = state.chores.filter(chore => chore.id !== id);
      await storage.storeChores(updatedChores);
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

      const updatedChore: Chore = {
        ...chore,
        completed: true,
        completedAt: new Date(),
      };

      const updatedChores = state.chores.map(c =>
        c.id === choreId ? updatedChore : c
      );

      // Update child points
      const updatedChildren = state.children.map(child =>
        child.id === chore.assignedTo
          ? { ...child, totalPoints: child.totalPoints + chore.points }
          : child
      );

      await storage.storeChores(updatedChores);
      await storage.storeChildren(updatedChildren);
      
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

      const updatedChore: Chore = {
        ...chore,
        completed: false,
        completedAt: undefined,
      };

      const updatedChores = state.chores.map(c =>
        c.id === choreId ? updatedChore : c
      );

      // Subtract points from child
      const updatedChildren = state.children.map(child =>
        child.id === chore.assignedTo
          ? { ...child, totalPoints: Math.max(0, child.totalPoints - chore.points) }
          : child
      );

      await storage.storeChores(updatedChores);
      await storage.storeChildren(updatedChildren);
      
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
      const updatedChildren = state.children.map(child =>
        child.id === childId ? { ...child, totalPoints: points } : child
      );
      
      await storage.storeChildren(updatedChildren);
      dispatch({ type: 'SET_CHILDREN', payload: updatedChildren });
    } catch (error) {
      console.error('Error updating child points:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update child points' });
    }
  };

  const refreshData = async (): Promise<void> => {
    await loadData();
  };

  const value: ChoresContextType = {
    ...state,
    addChore,
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
