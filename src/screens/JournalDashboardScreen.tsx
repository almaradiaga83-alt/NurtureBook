/**
 * Interactive Timeline Screen
 * Calendar-based journal entries with insights and milestones
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { JournalStackParamList } from '../types';
import { colors, typography, spacing } from '../theme';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useJournal } from '../contexts/JournalContext';
import { useLocale } from '../contexts/LocaleContext';
import { moodColors } from '../constants/moods';
import MenuIcon from '../components/icons/MenuIcon';
import SettingsIcon from '../components/icons/SettingsIcon';
import StarIcon from '../components/icons/StarIcon';

type JournalDashboardNavigationProp = StackNavigationProp<JournalStackParamList, 'JournalDashboard'>;

interface Props {
  navigation: JournalDashboardNavigationProp;
}

const JournalDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { entries } = useJournal();
  const { t } = useLocale();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Mock timeline entries for demo
  const timelineEntries = [
    {
      id: '1',
      date: new Date(2024, 9, 5), // October 5, 2024
      day: 'SAT',
      dayNumber: 5,
      title: 'A joyous day at the park!',
      content: 'Spent the afternoon with the kids at the new park. Sarah loved the swings, and Tom made...',
      mood: 'happy' as const,
    },
    {
      id: '2',
      date: new Date(2024, 9, 6), // October 6, 2024
      day: 'SUN',
      dayNumber: 6,
      title: 'Quiet Sunday morning.',
      content: 'Enjoyed a slow morning at home. We read books and had a big pancake breakfast. Felt...',
      mood: 'calm' as const,
    },
    {
      id: '3',
      date: new Date(2024, 9, 10), // October 10, 2024
      day: 'THU',
      dayNumber: 10,
      title: 'First soccer practice!',
      content: 'Tom had his first soccer practice today. He was so excited and scored a goal! Proud...',
      mood: 'excited' as const,
    },
    {
      id: '4',
      date: new Date(2024, 9, 12), // October 12, 2024
      day: 'SAT',
      dayNumber: 12,
      title: 'No journal entry today.',
      content: 'Sometimes it\'s okay to just live in the moment without writing it down. Feel free to...',
      mood: 'calm' as const,
    },
  ];

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const handleAddEntry = () => {
    navigation.navigate('NewJournalEntry');
  };

  const handleViewInsights = () => {
    navigation.navigate('AIInsights');
  };

  const handleReadMore = (entryId: string) => {
    // For demo purposes, just show the full content
    const entry = entries.find(e => e.id === entryId);
    if (entry) {
      // In a real app, this would navigate to a detail screen
      console.log('Full entry:', entry.content);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary.main} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <MenuIcon color={colors.secondary.main} size={24} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Interactive Timeline</Text>
          <Text style={styles.brandSubtitle}>NurtureBook</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton}>
          <SettingsIcon color={colors.secondary.main} size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Month selector */}
        <Card style={styles.monthCard}>
          <View style={styles.monthSelector}>
            <TouchableOpacity onPress={() => navigateMonth('prev')}>
              <Text style={styles.monthButton}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.monthText}>{formatMonthYear(currentMonth)}</Text>
            <TouchableOpacity onPress={() => navigateMonth('next')}>
              <Text style={styles.monthButton}>›</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Timeline entries */}
        <View style={styles.timelineContainer}>
          {timelineEntries.map((entry) => (
            <View key={entry.id} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <Text style={styles.dayLabel}>{entry.day}</Text>
                <View style={[styles.dayNumber, { backgroundColor: moodColors[entry.mood] }]}>
                  <Text style={styles.dayNumberText}>{entry.dayNumber}</Text>
                </View>
              </View>
              <View style={styles.timelineRight}>
                <Card style={styles.entryCard}>
                  <View style={styles.entryHeader}>
                    <View style={[styles.moodDot, { backgroundColor: moodColors[entry.mood] }]} />
                    <Text style={styles.entryTitle}>{entry.title}</Text>
                  </View>
                  <Text style={styles.entryContent}>{entry.content}</Text>
                  <TouchableOpacity onPress={() => handleReadMore(entry.id)}>
                    <Text style={styles.readMoreText}>Read more</Text>
                  </TouchableOpacity>
                </Card>
              </View>
            </View>
          ))}
        </View>

        {/* Growth Trends & Milestones */}
        <Text style={styles.sectionTitle}>Growth Trends & Milestones</Text>
        <Card style={styles.insightsCard}>
          <View style={styles.chartContainer}>
            <View style={styles.chartPlaceholder}>
              <View style={styles.chartSegment1} />
              <View style={styles.chartSegment2} />
              <View style={styles.chartSegment3} />
            </View>
          </View>
          <View style={styles.insightsContent}>
            <Text style={styles.insightsTitle}>Timeline Insights!</Text>
            <Text style={styles.insightsSubtitle}>Discover patterns in your family's journey.</Text>
          </View>
          <View style={styles.reflectSection}>
            <Text style={styles.reflectTitle}>Reflect on Your Progress</Text>
            <Text style={styles.reflectSubtitle}>Get AI-powered insights into your family's growth.</Text>
            <Button
              title="View ..."
              onPress={handleViewInsights}
              variant="secondary"
              size="small"
              style={styles.viewButton}
            />
          </View>
        </Card>

        {/* Milestone Suggestions */}
        <Text style={styles.sectionTitle}>Milestone Suggestions</Text>
        <View style={styles.milestonesContainer}>
          <Card style={styles.milestoneCard}>
            <View style={styles.milestoneContent}>
              <StarIcon color={colors.secondary.main} size={20} filled={true} />
              <Text style={styles.milestoneText}>Celebrate small victories, like a new skill learned!</Text>
            </View>
          </Card>
          <Card style={styles.milestoneCard}>
            <View style={styles.milestoneContent}>
              <StarIcon color={colors.secondary.main} size={20} filled={true} />
              <Text style={styles.milestoneText}>Document a funny family moment.</Text>
            </View>
          </Card>
        </View>
      </ScrollView>

      {/* Floating add button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddEntry}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.timeline, // Use exact timeline background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    backgroundColor: colors.background.timeline,
    minHeight: 60,
  },
  menuButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },

  headerCenter: {
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.secondary.main,
    textAlign: 'center',
  },
  brandSubtitle: {
    fontSize: typography.fontSize.xs,
    color: colors.secondary.main,
    fontWeight: typography.fontWeight.medium,
    opacity: 0.8,
  },
  settingsButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },

  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.primary.main,
  },
  monthCard: {
    marginBottom: spacing.lg,
    backgroundColor: colors.background.light,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  monthButton: {
    fontSize: 24,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    paddingHorizontal: spacing.md,
  },
  monthText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  timelineContainer: {
    marginBottom: spacing.lg,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: spacing.md,
    width: 60,
  },
  dayLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.onPrimary,
    marginBottom: spacing.xs,
  },
  dayNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNumberText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.light,
  },
  timelineRight: {
    flex: 1,
  },
  entryCard: {
    backgroundColor: colors.background.light,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  moodDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.sm,
    marginTop: 4,
  },
  entryTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    flex: 1,
    lineHeight: typography.lineHeight.tight * typography.fontSize.sm,
  },
  entryContent: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    lineHeight: typography.lineHeight.normal * typography.fontSize.xs,
    marginBottom: spacing.sm,
  },
  readMoreText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary.main,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.onPrimary,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  insightsCard: {
    backgroundColor: colors.background.light,
    marginBottom: spacing.lg,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  chartPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    position: 'relative',
    overflow: 'hidden',
  },
  chartSegment1: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#ff9800',
    borderRadius: 60,
  },
  chartSegment2: {
    position: 'absolute',
    width: '60%',
    height: '60%',
    backgroundColor: '#2196f3',
    borderRadius: 30,
    top: '20%',
    left: '20%',
  },
  chartSegment3: {
    position: 'absolute',
    width: '30%',
    height: '30%',
    backgroundColor: '#4caf50',
    borderRadius: 15,
    top: '35%',
    left: '35%',
  },
  insightsContent: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  insightsTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  insightsSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  reflectSection: {
    alignItems: 'flex-start',
  },
  reflectTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  reflectSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  viewButton: {
    backgroundColor: colors.secondary.main,
    paddingHorizontal: spacing.lg,
  },
  milestonesContainer: {
    gap: spacing.md,
    marginBottom: spacing['6xl'], // Space for FAB
  },
  milestoneCard: {
    backgroundColor: colors.background.light,
  },
  milestoneContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },

  milestoneText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    flex: 1,
    lineHeight: typography.lineHeight.normal * typography.fontSize.sm,
  },
  fab: {
    position: 'absolute',
    bottom: spacing['2xl'],
    right: spacing['2xl'],
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.secondary.main,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 24,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.light,
  },
});

export default JournalDashboardScreen;
