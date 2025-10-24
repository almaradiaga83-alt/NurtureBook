/**
 * Authentication Context
 * Manages user session and authentication state with Supabase
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { auth, db } from '../config/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: { user: User; supabaseUser: SupabaseUser } }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'LOGOUT' };

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  updateUser: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
  user: null,
  supabaseUser: null,
  isLoading: true,
  isAuthenticated: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return { 
        ...state, 
        user: action.payload.user, 
        supabaseUser: action.payload.supabaseUser,
        isLoading: false, 
        isAuthenticated: true 
      };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'LOGOUT':
      return { 
        ...state, 
        user: null, 
        supabaseUser: null, 
        isAuthenticated: false 
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state and listen for changes
  useEffect(() => {
    const initialize = async () => {
      try {
        const { user } = await auth.getCurrentUser();
        if (user) {
          await loadUserProfile(user);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initialize();
    
    // Listen for auth state changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await loadUserProfile(session.user);
      } else {
        dispatch({ type: 'LOGOUT' });
      }
      dispatch({ type: 'SET_LOADING', payload: false });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);



  const loadUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const { data: profile, error } = await db.getProfile(supabaseUser.id);
      
      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create one
        const newProfile = {
          id: supabaseUser.id,
          email: supabaseUser.email || '',
          name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
        };
        
        const { data: createdProfile } = await db.updateProfile(supabaseUser.id, newProfile);
        if (createdProfile) {
          const profileData = createdProfile as any;
          const user: User = {
            id: profileData.id,
            email: profileData.email,
            name: profileData.name,
            profileImage: profileData.profile_image,
            isGuest: false,
            createdAt: new Date(profileData.created_at),
            children: [],
          };
          dispatch({ type: 'SET_USER', payload: { user, supabaseUser } });
        }
      } else if (profile) {
        const profileData = profile as any;
        const user: User = {
          id: profileData.id,
          email: profileData.email,
          name: profileData.name,
          profileImage: profileData.profile_image,
          isGuest: false,
          createdAt: new Date(profileData.created_at),
          children: [],
        };
        dispatch({ type: 'SET_USER', payload: { user, supabaseUser } });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const { data, error } = await auth.signIn(email, password);
      
      if (error) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return { success: false, error: error.message };
      }
      
      if (data.user) {
        await loadUserProfile(data.user);
        return { success: true };
      }
      
      return { success: false, error: 'Login failed' };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const signUp = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const { data, error } = await auth.signUp(email, password, { name });
      
      if (error) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return { success: false, error: error.message };
      }
      
      if (data.user) {
        // Profile will be created automatically when auth state changes
        return { success: true };
      }
      
      return { success: false, error: 'Sign up failed' };
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await auth.signOut();
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    if (!state.user) return { success: false, error: 'No user logged in' };
    
    try {
      const { data, error } = await db.updateProfile(state.user.id, {
        name: updates.name,
        profile_image: updates.profileImage,
      });
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      if (data && state.supabaseUser) {
        const updatedUser: User = {
          ...state.user,
          ...updates,
        };
        dispatch({ type: 'SET_USER', payload: { user: updatedUser, supabaseUser: state.supabaseUser } });
        return { success: true };
      }
      
      return { success: false, error: 'Update failed' };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const value: AuthContextType = {
    ...state,
    signIn,
    signUp,
    signOut,
    logout: signOut, // Alias for signOut
    updateProfile,
    updateUser: updateProfile, // Alias for updateProfile
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
