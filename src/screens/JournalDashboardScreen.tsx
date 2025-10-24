/**
 * Journal Dashboard Screen
 * Main journal timeline with entries and AI insights
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
import { moodColors } from '../services/mockData';

type JournalDashboardNavigationProp = StackNavigationProp<JournalStackParamList, 'JournalDashboard'>;

interface Props {
  navigation: JournalDashboardNavigationProp;
}

const JournalDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { entries } = useJournal();
  const { t } = useLocale();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get entries for current month
  const getMonthEntries = () => {
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    
    return entries.filter(entry => 
      entry.date >= startOfMonth && entry.date <= endOfMonth
    ).sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const monthEntries = getMonthEntries();

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const formatDay = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  };

  const formatDayNumber = (date: Date) => {
    return date.getDate();
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
      <StatusBar barStyle="light-content" backgroundColor={colors.background.light} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('journal.timeline')}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Month selector */}
        <Card style={styles.monthCard}>
          <View style={styles.monthSelector}>
            <TouchableOpacity onPress={() => navigateMonth('prev')}>
              <Text style={styles.monthButton}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.monthText}>{formatDate(currentMonth)}</Text>
            <TouchableOpacity onPress={() => navigateMonth('next')}>
              <Text style={styles.monthButton}>›</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Timeline entries */}
        <View style={styles.timelineContainer}>
          {monthEntries.length > 0 ? (
            monthEntries.map((entry, index) => (
              <View key={entry.id} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <Text style={styles.dayLabel}>{formatDay(entry.date)}</Text>
                  <View style={styles.dayNumber}>
                    <Text style={styles.dayNumberText}>{formatDayNumber(entry.date)}</Text>
                  </View>
                  {index < monthEntries.length - 1 && <View style={styles.timelineLine} />}
                </View>
                <View style={styles.timelineRight}>
                  <Card style={styles.entryCard}>
                    <View style={styles.entryHeader}>
                      <View style={[styles.moodDot, { backgroundColor: moodColors[entry.mood] }]} />
                      <Text style={styles.entryTitle}>
                        {entry.content.length > 50 
                          ? `${entry.content.substring(0, 50)}...` 
                          : entry.content
                        }
                      </Text>
                    </View>
                    <Text style={styles.entryContent}>{entry.content}</Text>
                    <TouchableOpacity onPress={() => handleReadMore(entry.id)}>
                      <Text style={styles.readMoreText}>{t('journal.readMore')}</Text>
                    </TouchableOpacity>
                  </Card>
                </View>
              </View>
            ))
          ) : (
            <Card style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No journal entries this month</Text>
              <Text style={styles.emptyStateSubtext}>Start writing about your day!</Text>
            </Card>
          )}
        </View>

        {/* Growth Trends & Milestones */}
        <Text style={styles.sectionTitle}>{t('journal.growthTrends')}</Text>
        <Card style={styles.insightsCard}>
          <View style={styles.insightsContent}>
            <Text style={styles.insightsTitle}>Timeline Insights!</Text>
            <Text style={styles.insightsSubtitle}>Discover patterns in your family's journey.</Text>
            <Button
              title={t('journal.viewSummaries')}
              onPress={handleViewInsights}
              variant="primary"
              size="small"
              style={styles.insightsButton}
            />
          </View>
        </Card>

        {/* Milestone Suggestions */}
        <Text style={styles.sectionTitle}>{t('journal.milestoneSuggestions')}</Text>
        <View style={styles.milestonesContainer}>
          <Card style={styles.milestoneCard}>
            <View style={styles.milestoneContent}>
              <Text style={styles.milestoneIcon}>🏆</Text>
              <Text style={styles.milestoneText}>{t('journal.celebrateVictories')}</Text>
            </View>
          </Card>
          <Card style={styles.milestoneCard}>
            <View style={styles.milestoneContent}>
              <Text style={styles.milestoneIcon}>⭐</Text>
              <Text style={styles.milestoneText}>{t('journal.documentMoment')}</Text>
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
    backgroundColor: colors.background.light,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background.light,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  monthCard: {
    marginBottom: spacing.lg,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginBottom: spacing['2xl'],
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: spacing.md,
    position: 'relative',
  },
  dayLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  dayNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.secondary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNumberText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.light,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border.light,
    marginTop: spacing.sm,
  },
  timelineRight: {
    flex: 1,
  },
  entryCard: {
    backgroundColor: colors.background.card,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  moodDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.sm,
  },
  entryTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    flex: 1,
  },
  entryContent: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    lineHeight: typography.lineHeight.normal * typography.fontSize.xs,
    marginBottom: spacing.xs,
  },
  readMoreText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.secondary.main,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
  },
  emptyStateText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  emptyStateSubtext: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  sectionTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.onPrimary,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  insightsCard: {
    backgroundColor: colors.background.secondary,
    marginBottom: spacing['2xl'],
  },
  insightsContent: {
    alignItems: 'center',
  },
  insightsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  insightsSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  insightsButton: {
    backgroundColor: colors.secondary.main,
  },
  milestonesContainer: {
    gap: spacing.md,
    marginBottom: spacing['6xl'], // Space for FAB
  },
  milestoneCard: {
    backgroundColor: colors.background.secondary,
  },
  milestoneContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  milestoneIcon: {
    fontSize: 24,
  },
  milestoneText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: spacing['2xl'],
    right: spacing['2xl'],
    width: 64,
    height: 64,
    borderRadius: 32,
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
    fontSize: 32,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.light,
  },
});

export default JournalDashboardScreen;
