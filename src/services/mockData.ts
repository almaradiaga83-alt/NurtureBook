/**
 * Mock data for NurtureBook app
 * Pre-populated demo data for testing without backend
 */

import { Parent, Child, JournalEntry, Chore, AIInsight, MoodType } from '../types';

// Mock parent data
export const mockParent: Parent = {
  id: 'parent-1',
  email: 'alex.doe@example.com',
  name: 'Alex Doe',
  profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsBBFGWiKdaiO9PZk3bJcsxutaGCOpcF3K3bWc5f9Wmz_PAUze7XufWMvPUFMlMdIf3XoZSmcZgT1hTxhC1vG8gzFHFsZpvpueYElK63d_7J1SVUmGRdFaLeglUqIeWj6ZUYOqVEocFfrXJFzAMaL4F_ZAwCUaouP2aAJn0nHLxXZOFX2haMqI9n5IRNbT6EVHrNyBSKQG5dTotRluIexv4h7yuY0MIBLdY2uODR36NMo8FufFva_rARiKaixmRmUAhPmB_tWqrXcZ',
  isGuest: true,
  createdAt: new Date('2024-01-01'),
  children: [],
};

// Mock children data
export const mockChildren: Child[] = [
  {
    id: 'child-1',
    name: 'Alex Johnson',
    age: 8,
    profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8MiHIkLItP932ynu9t67J6SPenVt0VSwwHVRFSUZ-5YCa1K9M7rZgdpRbf9PLnee9GPx-iIl7AgjLQ8lbWW0_0RGCsl-hRMYwD9ZohD_e-YmYZs9Tc9oSC76okx9gCAWkHjm_mK4D8G3s8hTCMNkpZtgXp5a1fintb6cPWzKZLZ8tc3UwMLuFAkpmhsNHSOxMwvra0wAKcOhejeRPDQjQ3HttIEhs-CpmA7jynh-OWzhS4ZoKv-kLn3EcdGacbjFzZH89RlKlCwB_',
    totalPoints: 150,
    parentId: 'parent-1',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'child-2',
    name: 'Sarah Johnson',
    age: 6,
    profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1AndYbis4aXE4irC6BOM0Oioy6c6oqPEzt24N3cR5x32-17e5ly9zHlfTHaWyGFW6k9f2f15nY_D3YTqoDNLbZh9AhyJXVDdfClP__r_TtlBPls8pkWcCLjZADCD4e0TrNYZMl8fak6fWrVRQm_pML1igMwhstSUbH07ChqU5_5n1X5xzqy1BMR5kowNRZ_2EUSaXFcSowEzNQnmMeaObC-VWVUS8hjNaScjqVfv4lE1vyC-1qcpLaNkjSurejvjAiFD6Wqo8bkwG',
    totalPoints: 80,
    parentId: 'parent-1',
    createdAt: new Date('2024-01-01'),
  },
];

// Mock journal entries
export const mockJournalEntries: JournalEntry[] = [
  {
    id: 'entry-1',
    userId: 'parent-1',
    content: 'Spent the afternoon with the kids at the new park. Sarah loved the swings, and Tom made a new friend on the slide. So much laughter!',
    mood: 'happy',
    date: new Date('2024-10-05'),
    createdAt: new Date('2024-10-05T15:30:00'),
    updatedAt: new Date('2024-10-05T15:30:00'),
  },
  {
    id: 'entry-2',
    userId: 'parent-1',
    content: 'Enjoyed a slow morning at home. We read books and had a big pancake breakfast. Felt very peaceful and relaxed.',
    mood: 'calm',
    date: new Date('2024-10-06'),
    createdAt: new Date('2024-10-06T10:00:00'),
    updatedAt: new Date('2024-10-06T10:00:00'),
  },
  {
    id: 'entry-3',
    userId: 'parent-1',
    content: 'Tom had his first soccer practice today. He was so excited and scored a goal! Proud parent moment.',
    mood: 'excited',
    date: new Date('2024-10-10'),
    createdAt: new Date('2024-10-10T18:00:00'),
    updatedAt: new Date('2024-10-10T18:00:00'),
  },
  {
    id: 'entry-4',
    userId: 'parent-1',
    content: 'Long day at work, feeling exhausted. Kids were challenging today but we made it through.',
    mood: 'tired',
    date: new Date('2024-10-12'),
    createdAt: new Date('2024-10-12T20:30:00'),
    updatedAt: new Date('2024-10-12T20:30:00'),
  },
  {
    id: 'entry-5',
    userId: 'parent-1',
    content: 'Sarah had a tough day at school. She was bullied and came home crying. My heart breaks for her.',
    mood: 'sad',
    date: new Date('2024-10-15'),
    createdAt: new Date('2024-10-15T16:45:00'),
    updatedAt: new Date('2024-10-15T16:45:00'),
  },
];

// Mock chores
export const mockChores: Chore[] = [
  {
    id: 'chore-1',
    title: 'Clean your room',
    points: 10,
    assignedTo: 'child-1',
    dueDate: new Date('2024-10-22'),
    completed: true,
    completedAt: new Date('2024-10-22T14:30:00'),
    createdBy: 'parent-1',
    createdAt: new Date('2024-10-20'),
  },
  {
    id: 'chore-2',
    title: 'Feed the dog',
    points: 5,
    assignedTo: 'child-1',
    dueDate: new Date('2024-10-22'),
    completed: false,
    createdBy: 'parent-1',
    createdAt: new Date('2024-10-20'),
  },
  {
    id: 'chore-3',
    title: 'Do your homework',
    points: 15,
    assignedTo: 'child-1',
    dueDate: new Date('2024-10-23'),
    completed: false,
    createdBy: 'parent-1',
    createdAt: new Date('2024-10-20'),
  },
  {
    id: 'chore-4',
    title: 'Set the table',
    points: 5,
    assignedTo: 'child-2',
    dueDate: new Date('2024-10-22T18:00:00'),
    completed: false,
    createdBy: 'parent-1',
    createdAt: new Date('2024-10-20'),
  },
  {
    id: 'chore-5',
    title: 'Put away toys',
    points: 8,
    assignedTo: 'child-2',
    dueDate: new Date('2024-10-22'),
    completed: false,
    createdBy: 'parent-1',
    createdAt: new Date('2024-10-20'),
  },
];

// Mock AI insights
export const mockAIInsights: AIInsight[] = [
  {
    id: 'insight-1',
    title: 'Bedtime Routine Consistency',
    description: 'We noticed a 20% increase in screen time before bed this week. Try introducing a 30-minute \'no-screen\' wind-down routine before bedtime.',
    type: 'suggestion',
    dateRange: {
      start: new Date('2024-10-23'),
      end: new Date('2024-10-29'),
    },
    createdAt: new Date('2024-10-29'),
  },
  {
    id: 'insight-2',
    title: 'Screen Time Patterns',
    description: 'Screen time has been consistently high on weekends. Consider planning more outdoor activities to balance it out.',
    type: 'pattern',
    dateRange: {
      start: new Date('2024-10-23'),
      end: new Date('2024-10-29'),
    },
    createdAt: new Date('2024-10-29'),
  },
  {
    id: 'insight-3',
    title: 'Positive Affirmation Trends',
    description: 'There has been a great increase in positive affirmations this week. Keep up the great work!',
    type: 'milestone',
    dateRange: {
      start: new Date('2024-10-23'),
      end: new Date('2024-10-29'),
    },
    createdAt: new Date('2024-10-29'),
  },
];

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
