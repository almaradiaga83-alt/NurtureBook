/**
 * AsyncStorage wrapper utilities for NurtureBook app
 * Handles all local data persistence
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../types';

/**
 * Generic function to store data in AsyncStorage
 */
export const storeData = async <T>(key: string, value: T): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error storing data for key ${key}:`, error);
    throw error;
  }
};

/**
 * Generic function to retrieve data from AsyncStorage
 */
export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error retrieving data for key ${key}:`, error);
    return null;
  }
};

/**
 * Generic function to remove data from AsyncStorage
 */
export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing data for key ${key}:`, error);
    throw error;
  }
};

/**
 * Clear all app data from AsyncStorage
 */
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing all data:', error);
    throw error;
  }
};

/**
 * Get all keys from AsyncStorage
 */
export const getAllKeys = async (): Promise<readonly string[]> => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    console.error('Error getting all keys:', error);
    return [];
  }
};

/**
 * Check if a key exists in AsyncStorage
 */
export const keyExists = async (key: string): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null;
  } catch (error) {
    console.error(`Error checking if key ${key} exists:`, error);
    return false;
  }
};

// Specific storage functions for app data
export const storage = {
  // User session
  storeUserSession: (session: any) => storeData(STORAGE_KEYS.USER_SESSION, session),
  getUserSession: () => getData(STORAGE_KEYS.USER_SESSION),
  clearUserSession: () => removeData(STORAGE_KEYS.USER_SESSION),
  
  // Journal entries
  storeJournalEntries: (entries: any[]) => storeData(STORAGE_KEYS.JOURNAL_ENTRIES, entries),
  getJournalEntries: () => getData(STORAGE_KEYS.JOURNAL_ENTRIES),
  
  // Chores
  storeChores: (chores: any[]) => storeData(STORAGE_KEYS.CHORES, chores),
  getChores: () => getData(STORAGE_KEYS.CHORES),
  
  // Children
  storeChildren: (children: any[]) => storeData(STORAGE_KEYS.CHILDREN, children),
  getChildren: () => getData(STORAGE_KEYS.CHILDREN),
  
  // Parent profile
  storeParentProfile: (profile: any) => storeData(STORAGE_KEYS.PARENT_PROFILE, profile),
  getParentProfile: () => getData(STORAGE_KEYS.PARENT_PROFILE),
  
  // Language preference
  storeLanguage: (language: string) => storeData(STORAGE_KEYS.LANGUAGE, language),
  getLanguage: () => getData(STORAGE_KEYS.LANGUAGE),
  
  // Theme preference
  storeTheme: (theme: string) => storeData(STORAGE_KEYS.THEME, theme),
  getTheme: () => getData(STORAGE_KEYS.THEME),
};
