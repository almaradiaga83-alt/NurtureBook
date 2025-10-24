/**
 * Theme Context
 * Manages light/dark theme switching
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { ThemeMode } from '../types';
import { storage } from '../services/storage';
import { lightTheme, darkTheme, Theme } from '../theme';

interface ThemeState {
  mode: ThemeMode;
  theme: Theme;
}

type ThemeAction = { type: 'SET_THEME'; payload: ThemeMode };

interface ThemeContextType extends ThemeState {
  toggleTheme: () => Promise<void>;
  setTheme: (mode: ThemeMode) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const initialState: ThemeState = {
  mode: 'light',
  theme: lightTheme,
};

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'SET_THEME':
      return {
        mode: action.payload,
        theme: action.payload === 'dark' ? darkTheme : lightTheme,
      };
    default:
      return state;
  }
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Load theme preference on mount
  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await storage.getTheme();
      if (savedTheme) {
        dispatch({ type: 'SET_THEME', payload: savedTheme as ThemeMode });
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const toggleTheme = async (): Promise<void> => {
    const newMode = state.mode === 'light' ? 'dark' : 'light';
    await setTheme(newMode);
  };

  const setTheme = async (mode: ThemeMode): Promise<void> => {
    try {
      await storage.storeTheme(mode);
      dispatch({ type: 'SET_THEME', payload: mode });
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  };

  const value: ThemeContextType = {
    ...state,
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
