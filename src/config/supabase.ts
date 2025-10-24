/**
 * Supabase configuration and client setup
 */

import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

// Supabase configuration
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Auth helper functions
export const auth = {
  signUp: async (email: string, password: string, userData?: any) => {
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
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};

// Database helper functions
export const db = {
  // Users
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  updateProfile: async (userId: string, updates: any) => {
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
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  createJournalEntry: async (entry: any) => {
    const { data, error } = await supabase
      .from('journal_entries')
      .insert(entry)
      .select()
      .single();
    return { data, error };
  },

  updateJournalEntry: async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('journal_entries')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  deleteJournalEntry: async (id: string) => {
    const { error } = await supabase
      .from('journal_entries')
      .delete()
      .eq('id', id);
    return { error };
  },

  // Children
  getChildren: async (parentId: string) => {
    const { data, error } = await supabase
      .from('children')
      .select('*')
      .eq('parent_id', parentId)
      .order('created_at', { ascending: true });
    return { data, error };
  },

  createChild: async (child: any) => {
    const { data, error } = await supabase
      .from('children')
      .insert(child)
      .select()
      .single();
    return { data, error };
  },

  updateChild: async (id: string, updates: any) => {
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
    const { data, error } = await supabase
      .from('chores')
      .insert(chore)
      .select()
      .single();
    return { data, error };
  },

  updateChore: async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('chores')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  deleteChore: async (id: string) => {
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