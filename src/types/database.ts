/**
 * Supabase Database Types
 * Generated from database schema
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string
          profile_image?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          profile_image?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          profile_image?: string
          created_at?: string
          updated_at?: string
        }
      }
      children: {
        Row: {
          id: string
          name: string
          age: number
          profile_image?: string
          total_points: number
          parent_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          age: number
          profile_image?: string
          total_points?: number
          parent_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          age?: number
          profile_image?: string
          total_points?: number
          parent_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      journal_entries: {
        Row: {
          id: string
          user_id: string
          content: string
          mood: 'calm' | 'happy' | 'tired' | 'sad' | 'excited'
          date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          mood: 'calm' | 'happy' | 'tired' | 'sad' | 'excited'
          date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          mood?: 'calm' | 'happy' | 'tired' | 'sad' | 'excited'
          date?: string
          created_at?: string
          updated_at?: string
        }
      }
      chores: {
        Row: {
          id: string
          title: string
          description?: string
          points: number
          assigned_to: string
          due_date?: string
          completed: boolean
          completed_at?: string
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string
          points: number
          assigned_to: string
          due_date?: string
          completed?: boolean
          completed_at?: string
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          points?: number
          assigned_to?: string
          due_date?: string
          completed?: boolean
          completed_at?: string
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      mood_type: 'calm' | 'happy' | 'tired' | 'sad' | 'excited'
    }
  }
}