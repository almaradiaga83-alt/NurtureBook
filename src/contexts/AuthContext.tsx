/**
 * Authentication Context
 * Manages user session and authentication state
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { storage } from '../services/storage';
import { mockParent } from '../services/mockData';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isGuest: boolean;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_GUEST'; payload: boolean }
  | { type: 'LOGOUT' };

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  loginAsGuest: () => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isGuest: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload, isLoading: false, isGuest: false };
    case 'SET_GUEST':
      return { ...state, isGuest: action.payload, isLoading: false };
    case 'LOGOUT':
      return { ...state, user: null, isGuest: false };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user session on app start
  useEffect(() => {
    loadUserSession();
  }, []);

  const loadUserSession = async () => {
    try {
      const session = await storage.getUserSession();
      if (session && typeof session === 'object' && 'id' in session) {
        dispatch({ type: 'SET_USER', payload: session as User });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch (error) {
      console.error('Error loading user session:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Mock login validation
      if (email && password) {
        const user: User = {
          id: 'user-1',
          email,
          name: email.split('@')[0],
          isGuest: false,
          createdAt: new Date(),
          children: [], // Add required children property
        };
        
        await storage.storeUserSession(user);
        dispatch({ type: 'SET_USER', payload: user });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
      return false;
    }
  };

  const loginAsGuest = async (): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Set guest user with mock data
      await storage.storeUserSession(mockParent);
      dispatch({ type: 'SET_USER', payload: mockParent });
      dispatch({ type: 'SET_GUEST', payload: true });
    } catch (error) {
      console.error('Guest login error:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await storage.clearUserSession();
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = async (userUpdates: Partial<User>): Promise<void> => {
    if (!state.user) return;
    
    try {
      const updatedUser = { ...state.user, ...userUpdates };
      await storage.storeUserSession(updatedUser);
      dispatch({ type: 'SET_USER', payload: updatedUser });
    } catch (error) {
      console.error('Update user error:', error);
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    loginAsGuest,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
