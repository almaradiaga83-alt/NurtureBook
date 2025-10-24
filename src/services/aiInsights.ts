/**
 * Mock AI Insights service
 * Simulates async API calls for generating insights
 */

import { AIInsight, JournalEntry, MoodType } from '../types';
import { mockAIInsights } from './mockData';

/**
 * Simulates an async API call to generate AI insights
 * Returns insights based on journal mood patterns
 */
export const generateAIInsights = async (journalEntries: JournalEntry[]): Promise<AIInsight[]> => {
  // Simulate API delay
  await new Promise<void>(resolve => setTimeout(resolve, 1500));
  
  // Analyze mood patterns from journal entries
  const moodCounts = journalEntries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<MoodType, number>);
  
  const totalEntries = journalEntries.length;
  
  // Generate insights based on patterns
  const insights: AIInsight[] = [];
  
  // Most frequent mood insight
  const mostFrequentMood = Object.entries(moodCounts).reduce((a, b) => 
    moodCounts[a[0] as MoodType] > moodCounts[b[0] as MoodType] ? a : b
  )[0] as MoodType;
  
  const moodPercentage = Math.round((moodCounts[mostFrequentMood] / totalEntries) * 100);
  
  insights.push({
    id: `insight-${Date.now()}-1`,
    title: 'Mood Pattern Analysis',
    description: `You've been feeling ${mostFrequentMood} ${moodPercentage}% of the time this week. ${getMoodInsight(mostFrequentMood, moodPercentage)}`,
    type: 'pattern',
    dateRange: {
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      end: new Date(),
    },
    createdAt: new Date(),
  });
  
  // Weekend vs weekday pattern
  const weekendEntries = journalEntries.filter(entry => {
    const day = entry.date.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  });
  
  if (weekendEntries.length > 0) {
    const weekendMoodCounts = weekendEntries.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<MoodType, number>);
    
    const weekendTiredCount = weekendMoodCounts.tired || 0;
    if (weekendTiredCount > weekendEntries.length * 0.5) {
      insights.push({
        id: `insight-${Date.now()}-2`,
        title: 'Weekend Energy Levels',
        description: 'You seem more tired on weekends. Consider planning lighter activities or ensuring better sleep schedules.',
        type: 'suggestion',
        dateRange: {
          start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          end: new Date(),
        },
        createdAt: new Date(),
      });
    }
  }
  
  // Positive trend insight
  const positiveMoods: MoodType[] = ['happy', 'excited', 'calm'];
  const positiveCount = journalEntries.filter(entry => 
    positiveMoods.includes(entry.mood)
  ).length;
  
  if (positiveCount / totalEntries > 0.7) {
    insights.push({
      id: `insight-${Date.now()}-3`,
      title: 'Positive Outlook Trend',
      description: 'Great job maintaining a positive outlook! Your journal shows mostly positive emotions this week.',
      type: 'milestone',
      dateRange: {
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        end: new Date(),
      },
      createdAt: new Date(),
    });
  }
  
  // Return mock insights if no patterns found
  if (insights.length === 0) {
    return mockAIInsights;
  }
  
  return insights;
};

/**
 * Get insight text based on mood and percentage
 */
const getMoodInsight = (mood: MoodType, percentage: number): string => {
  const insights = {
    happy: percentage > 60 ? 'That\'s wonderful! Keep doing what makes you happy.' : 'Consider what activities bring you joy.',
    calm: percentage > 60 ? 'You have great emotional balance. This is healthy for parenting.' : 'Try incorporating more mindfulness practices.',
    excited: percentage > 60 ? 'Your enthusiasm is contagious! Channel this energy positively.' : 'Look for opportunities to feel more excited about daily activities.',
    sad: percentage > 40 ? 'It\'s okay to feel sad sometimes. Consider talking to someone or seeking support.' : 'You\'re handling difficult emotions well.',
    tired: percentage > 50 ? 'You might be overworked. Consider prioritizing rest and self-care.' : 'Your energy levels seem balanced.',
  };
  
  return insights[mood];
};

/**
 * Get predefined insights for demo purposes
 */
export const getMockInsights = async (): Promise<AIInsight[]> => {
  // Simulate API delay
  await new Promise<void>(resolve => setTimeout(resolve, 1000));
  return mockAIInsights;
};
