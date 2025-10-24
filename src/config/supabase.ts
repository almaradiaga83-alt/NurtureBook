/**
 * Supabase configuration and client setup
 */

import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Supabase configuration
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || 'https://your-project.supabase.co';
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || 'your-anon-key';

// Demo mode flag - set to true for Expo Snack testing
export const DEMO_MODE = supabaseUrl === 'https://your-project.supabase.co';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Demo user for testing
const DEMO_USER = {
  id: 'demo-user-123',
  email: 'demo@nurturebook.com',
  user_metadata: { name: 'Demo Parent' },
};

// Auth helper functions
export const auth = {
  signUp: async (email: string, password: string, userData?: any) => {
    if (DEMO_MODE) {
      // Demo mode - simulate successful signup
      return {
        data: {
          user: { ...DEMO_USER, email, user_metadata: { name: userData?.name || 'Demo User' } },
          session: { user: DEMO_USER }
        },
        error: null
      };
    }
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });
    return { data, error };
  },

  signIn: async (email: string, password: string) => {
    if (DEMO_MODE) {
      // Demo mode - simulate successful login
      return {
        data: {
          user: { ...DEMO_USER, email },
          session: { user: DEMO_USER }
        },
        error: null
      };
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  signOut: async () => {
    if (DEMO_MODE) {
      return { error: null };
    }
    
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getCurrentUser: async () => {
    if (DEMO_MODE) {
      return { user: null, error: null };
    }
    
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    if (DEMO_MODE) {
      // Return a mock subscription for demo mode
      return {
        data: { subscription: { unsubscribe: () => {} } }
      };
    }
    
    return supabase.auth.onAuthStateChange(callback);
  },
};

// Database helper functions
export const db = {
  // Users
  getProfile: async (userId: string) => {
    if (DEMO_MODE) {
      return {
        data: {
          id: userId,
          email: 'demo@nurturebook.com',
          name: 'Demo Parent',
          profile_image: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        error: null
      };
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  updateProfile: async (userId: string, updates: any) => {
    if (DEMO_MODE) {
      return {
        data: {
          id: userId,
          email: 'demo@nurturebook.com',
          name: updates.name || 'Demo Parent',
          profile_image: updates.profile_image || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        error: null
      };
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },

  // Journal entries
  getJournalEntries: async (userId: string) => {
    if (DEMO_MODE) {
      return {
        data: [
          {
            id: 'demo-entry-1',
            user_id: userId,
            content: 'Had a wonderful day with the kids at the park. They loved the playground!',
            mood: 'happy',
            date: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: 'demo-entry-2',
            user_id: userId,
            content: 'Feeling grateful for these precious moments with my family.',
            mood: 'calm',
            date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
            created_at: new Date(Date.now() - 86400000).toISOString(),
            updated_at: new Date(Date.now() - 86400000).toISOString(),
          }
        ],
        error: null
      };
    }
    
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  createJournalEntry: async (entry: any) => {
    if (DEMO_MODE) {
      return {
        data: {
          id: `demo-entry-${Date.now()}`,
          ...entry,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        error: null
      };
    }
    
    const { data, error } = await supabase
      .from('journal_entries')
      .insert(entry)
      .select()
      .single();
    return { data, error };
  },

  updateJournalEntry: async (id: string, updates: any) => {
    if (DEMO_MODE) {
      return {
        data: {
          id,
          ...updates,
          updated_at: new Date().toISOString(),
        },
        error: null
      };
    }
    
    const { data, error } = await supabase
      .from('journal_entries')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  deleteJournalEntry: async (id: string) => {
    if (DEMO_MODE) {
      return { error: null };
    }
    
    const { error } = await supabase
      .from('journal_entries')
      .delete()
      .eq('id', id);
    return { error };
  },

  // Children
  getChildren: async (parentId: string) => {
    if (DEMO_MODE) {
      return {
        data: [
          {
            id: 'demo-child-1',
            name: 'Emma',
            age: 8,
            profile_image: null,
            total_points: 150,
            parent_id: parentId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: 'demo-child-2',
            name: 'Alex',
            age: 6,
            profile_image: null,
            total_points: 120,
            parent_id: parentId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        ],
        error: null
      };
    }
    
    const { data, error } = await supabase
      .from('children')
      .select('*')
      .eq('parent_id', parentId)
      .order('created_at', { ascending: true });
    return { data, error };
  },

  createChild: async (child: any) => {
    if (DEMO_MODE) {
      return {
        data: {
          id: `demo-child-${Date.now()}`,
          ...child,
          total_points: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        error: null
      };
    }
    
    const { data, error } = await supabase
      .from('children')
      .insert(child)
      .select()
      .single();
    return { data, error };
  },

  updateChild: async (id: string, updates: any) => {
    if (DEMO_MODE) {
      return {
        data: {
          id,
          ...updates,
          updated_at: new Date().toISOString(),
        },
        error: null
      };
    }
    
    const { data, error } = await supabase
      .from('children')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  // Chores
  getChores: async (parentId: string) => {
    if (DEMO_MODE) {
      return {
        data: [
          {
            id: 'demo-chore-1',
            title: 'Clean Room',
            description: 'Tidy up bedroom and make bed',
            points: 10,
            assigned_to: 'demo-child-1',
            due_date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
            completed: false,
            completed_at: null,
            created_by: parentId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            children: { id: 'demo-child-1', name: 'Emma' }
          },
          {
            id: 'demo-chore-2',
            title: 'Feed Pet',
            description: 'Give food and water to the family pet',
            points: 5,
            assigned_to: 'demo-child-2',
            due_date: new Date().toISOString(), // Today
            completed: true,
            completed_at: new Date().toISOString(),
            created_by: parentId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            children: { id: 'demo-child-2', name: 'Alex' }
          }
        ],
        error: null
      };
    }
    
    const { data, error } = await supabase
      .from('chores')
      .select(`
        *,
        children (
          id,
          name
        )
      `)
      .eq('created_by', parentId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  createChore: async (chore: any) => {
    if (DEMO_MODE) {
      return {
        data: {
          id: `demo-chore-${Date.now()}`,
          ...chore,
          completed: false,
          completed_at: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        error: null
      };
    }
    
    const { data, error } = await supabase
      .from('chores')
      .insert(chore)
      .select()
      .single();
    return { data, error };
  },

  updateChore: async (id: string, updates: any) => {
    if (DEMO_MODE) {
      return {
        data: {
          id,
          ...updates,
          updated_at: new Date().toISOString(),
        },
        error: null
      };
    }
    
    const { data, error } = await supabase
      .from('chores')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  deleteChore: async (id: string) => {
    if (DEMO_MODE) {
      return { error: null };
    }
    
    const { error } = await supabase
      .from('chores')
      .delete()
      .eq('id', id);
    return { error };
  },
};

// Real-time subscriptions
export const subscriptions = {
  journalEntries: (userId: string, callback: (payload: any) => void) => {
    if (DEMO_MODE) {
      return { unsubscribe: () => {} };
    }
    
    return supabase
      .channel('journal_entries')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'journal_entries',
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();
  },

  chores: (parentId: string, callback: (payload: any) => void) => {
    if (DEMO_MODE) {
      return { unsubscribe: () => {} };
    }
    
    return supabase
      .channel('chores')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chores',
          filter: `created_by=eq.${parentId}`,
        },
        callback
      )
      .subscribe();
  },
};