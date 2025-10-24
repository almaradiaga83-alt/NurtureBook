/**
 * Journal Context
 * Manages journal entries and related operations
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { JournalEntry, MoodType } from '../types';
import { storage } from '../services/storage';
import { mockJournalEntries } from '../services/mockData';

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

  // Load journal entries on mount
  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const storedEntries = await storage.getJournalEntries();
      
      if (storedEntries && Array.isArray(storedEntries) && storedEntries.length > 0) {
        // Convert date strings back to Date objects
        const entries = storedEntries.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date),
          createdAt: new Date(entry.createdAt),
          updatedAt: new Date(entry.updatedAt),
        }));
        dispatch({ type: 'SET_ENTRIES', payload: entries });
      } else {
        // Load mock data for demo
        dispatch({ type: 'SET_ENTRIES', payload: mockJournalEntries });
        await storage.storeJournalEntries(mockJournalEntries);
      }
    } catch (error) {
      console.error('Error loading journal entries:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load journal entries' });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addEntry = async (content: string, mood: MoodType): Promise<void> => {
    try {
      const newEntry: JournalEntry = {
        id: `entry-${Date.now()}`,
        userId: 'parent-1', // This would come from auth context
        content,
        mood,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedEntries = [newEntry, ...state.entries];
      await storage.storeJournalEntries(updatedEntries);
      dispatch({ type: 'ADD_ENTRY', payload: newEntry });
    } catch (error) {
      console.error('Error adding journal entry:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add journal entry' });
    }
  };

  const updateEntry = async (id: string, content: string, mood: MoodType): Promise<void> => {
    try {
      const updatedEntry: JournalEntry = {
        ...state.entries.find(entry => entry.id === id)!,
        content,
        mood,
        updatedAt: new Date(),
      };

      const updatedEntries = state.entries.map(entry =>
        entry.id === id ? updatedEntry : entry
      );
      
      await storage.storeJournalEntries(updatedEntries);
      dispatch({ type: 'UPDATE_ENTRY', payload: updatedEntry });
    } catch (error) {
      console.error('Error updating journal entry:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update journal entry' });
    }
  };

  const deleteEntry = async (id: string): Promise<void> => {
    try {
      const updatedEntries = state.entries.filter(entry => entry.id !== id);
      await storage.storeJournalEntries(updatedEntries);
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
