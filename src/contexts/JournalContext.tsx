/**
 * Journal Context
 * Manages journal entries with Supabase backend
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { JournalEntry, MoodType } from '../types';
import { db, subscriptions } from '../config/supabase';
import { useAuth } from './AuthContext';

interface JournalState {
  entries: JournalEntry[];
  isLoading: boolean;
  error: string | null;
}

type JournalAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ENTRIES'; payload: JournalEntry[] }
  | { type: 'ADD_ENTRY'; payload: JournalEntry }
  | { type: 'UPDATE_ENTRY'; payload: JournalEntry }
  | { type: 'DELETE_ENTRY'; payload: string }
  | { type: 'SET_ERROR'; payload: string | null };

interface JournalContextType extends JournalState {
  addEntry: (content: string, mood: MoodType) => Promise<void>;
  updateEntry: (id: string, content: string, mood: MoodType) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  getEntriesByDateRange: (startDate: Date, endDate: Date) => JournalEntry[];
  getEntriesByMood: (mood: MoodType) => JournalEntry[];
  refreshEntries: () => Promise<void>;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

const initialState: JournalState = {
  entries: [],
  isLoading: true,
  error: null,
};

const journalReducer = (state: JournalState, action: JournalAction): JournalState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ENTRIES':
      return { ...state, entries: action.payload, isLoading: false };
    case 'ADD_ENTRY':
      return { ...state, entries: [action.payload, ...state.entries] };
    case 'UPDATE_ENTRY':
      return {
        ...state,
        entries: state.entries.map(entry =>
          entry.id === action.payload.id ? action.payload : entry
        ),
      };
    case 'DELETE_ENTRY':
      return {
        ...state,
        entries: state.entries.filter(entry => entry.id !== action.payload),
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const JournalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(journalReducer, initialState);
  const { user, isAuthenticated } = useAuth();

  // Load journal entries when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadEntries();
      
      // Set up real-time subscription
      const subscription = subscriptions.journalEntries(user.id, (payload) => {
        const { eventType, new: newRecord, old: oldRecord } = payload;
        
        switch (eventType) {
          case 'INSERT':
            if (newRecord) {
              const entry = convertDbEntryToJournalEntry(newRecord);
              dispatch({ type: 'ADD_ENTRY', payload: entry });
            }
            break;
          case 'UPDATE':
            if (newRecord) {
              const entry = convertDbEntryToJournalEntry(newRecord);
              dispatch({ type: 'UPDATE_ENTRY', payload: entry });
            }
            break;
          case 'DELETE':
            if (oldRecord) {
              dispatch({ type: 'DELETE_ENTRY', payload: oldRecord.id });
            }
            break;
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Clear entries when user logs out
      dispatch({ type: 'SET_ENTRIES', payload: [] });
    }
  }, [isAuthenticated, user]);

  const convertDbEntryToJournalEntry = (dbEntry: any): JournalEntry => ({
    id: dbEntry.id,
    userId: dbEntry.user_id,
    content: dbEntry.content,
    mood: dbEntry.mood,
    date: new Date(dbEntry.date),
    createdAt: new Date(dbEntry.created_at),
    updatedAt: new Date(dbEntry.updated_at),
  });

  const loadEntries = async () => {
    if (!user) return;
    
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const { data, error } = await db.getJournalEntries(user.id);
      
      if (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        return;
      }
      
      const entries = data?.map(convertDbEntryToJournalEntry) || [];
      dispatch({ type: 'SET_ENTRIES', payload: entries });
    } catch (error) {
      console.error('Error loading journal entries:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load journal entries' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addEntry = async (content: string, mood: MoodType): Promise<void> => {
    if (!user) {
      dispatch({ type: 'SET_ERROR', payload: 'User not authenticated' });
      return;
    }

    try {
      const entryData = {
        user_id: user.id,
        content,
        mood,
        date: new Date().toISOString(),
      };

      const { data, error } = await db.createJournalEntry(entryData);
      
      if (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        return;
      }

      // Entry will be added via real-time subscription
      // But we can also add it immediately for better UX
      if (data) {
        const entry = convertDbEntryToJournalEntry(data);
        dispatch({ type: 'ADD_ENTRY', payload: entry });
      }
    } catch (error) {
      console.error('Error adding journal entry:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add journal entry' });
    }
  };

  const updateEntry = async (id: string, content: string, mood: MoodType): Promise<void> => {
    try {
      const updates = {
        content,
        mood,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await db.updateJournalEntry(id, updates);
      
      if (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        return;
      }

      // Entry will be updated via real-time subscription
      if (data) {
        const entry = convertDbEntryToJournalEntry(data);
        dispatch({ type: 'UPDATE_ENTRY', payload: entry });
      }
    } catch (error) {
      console.error('Error updating journal entry:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update journal entry' });
    }
  };

  const deleteEntry = async (id: string): Promise<void> => {
    try {
      const { error } = await db.deleteJournalEntry(id);
      
      if (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
        return;
      }

      // Entry will be removed via real-time subscription
      dispatch({ type: 'DELETE_ENTRY', payload: id });
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete journal entry' });
    }
  };

  const getEntriesByDateRange = (startDate: Date, endDate: Date): JournalEntry[] => {
    return state.entries.filter(entry => 
      entry.date >= startDate && entry.date <= endDate
    );
  };

  const getEntriesByMood = (mood: MoodType): JournalEntry[] => {
    return state.entries.filter(entry => entry.mood === mood);
  };

  const refreshEntries = async (): Promise<void> => {
    await loadEntries();
  };

  const value: JournalContextType = {
    ...state,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntriesByDateRange,
    getEntriesByMood,
    refreshEntries,
  };

  return <JournalContext.Provider value={value}>{children}</JournalContext.Provider>;
};

export const useJournal = (): JournalContextType => {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};
