/**
 * Mood constants for journal entries
 */

import { MoodType } from '../types';

// Mood emoji mapping
export const moodEmojis: Record<MoodType, string> = {
  calm: '😌',
  happy: '😊',
  tired: '😴',
  sad: '😔',
  excited: '🤩',
};

// Mood color mapping
export const moodColors: Record<MoodType, string> = {
  calm: '#d0f0c0',
  happy: '#86e3ce',
  tired: '#cddafd',
  sad: '#ffb3ba',
  excited: '#ffe4b3',
};