/**
 * TypeScript type definitions for NurtureBook app
 */

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  isGuest: boolean;
  createdAt: Date;
  children?: Child[]; // Optional for regular users
}

export interface Parent extends User {
  children: Child[];
}

export interface Child {
  id: string;
  name: string;
  age: number;
  profileImage?: string;
  totalPoints: number;
  parentId: string;
  createdAt: Date;
}

// Journal types
export type MoodType = 'calm' | 'happy' | 'tired' | 'sad' | 'excited';

export interface JournalEntry {
  id: string;
  userId: string;
  content: string;
  mood: MoodType;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Chore types
export interface Chore {
  id: string;
  title: string;
  description?: string;
  points: number;
  assignedTo: string; // Child ID
  dueDate?: Date;
  completed: boolean;
  completedAt?: Date;
  createdBy: string; // Parent ID
  createdAt: Date;
}

// AI Insights types
export interface AIInsight {
  id: string;
  title: string;
  description: string;
  type: 'pattern' | 'suggestion' | 'milestone';
  dateRange: {
    start: Date;
    end: Date;
  };
  createdAt: Date;
}

// Navigation types
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  MainApp: undefined;
};

export type MainTabParamList = {
  Journal: undefined;
  Family: undefined;
  Profile: undefined;
};

export type JournalStackParamList = {
  JournalDashboard: undefined;
  NewJournalEntry: undefined;
  AIInsights: undefined;
};

export type FamilyStackParamList = {
  ChoresList: undefined;
  ChildProfile: { childId: string };
};

export type ProfileStackParamList = {
  ParentProfile: undefined;
  Settings: undefined;
};

// Theme types
export type ThemeMode = 'light' | 'dark';

// Localization types
export type SupportedLanguage = 'en' | 'es';

// Storage keys
export const STORAGE_KEYS = {
  USER_SESSION: 'user_session',
  JOURNAL_ENTRIES: 'journal_entries',
  CHORES: 'chores',
  CHILDREN: 'children',
  PARENT_PROFILE: 'parent_profile',
  LANGUAGE: 'language',
  THEME: 'theme',
} as const;
