/**
 * AI Insights Screen
 * Displays AI-generated insights based on journal patterns
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { JournalStackParamList } from '../types';
import { colors, typography, spacing } from '../theme';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useLocale } from '../contexts/LocaleContext';
import { getMockInsights } from '../services/aiInsights';
import { AIInsight } from '../types';

type AIInsightsNavigationProp = StackNavigationProp<JournalStackParamList, 'AIInsights'>;

interface Props {
  navigation: AIInsightsNavigationProp;
}

const AIInsightsScreen: React.FC<Props> = ({ navigation }) => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { t } = useLocale();

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Use mock insights for demo
      const mockInsights = await getMockInsights();
      setInsights(mockInsights);
    } catch (err) {
      setError('Failed to load insights');
      console.error('Error loading insights:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDateRange = (startDate: Date, endDate: Date) => {
    const start = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const end = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${start} - ${end}`;
  };

  const handleLearnMore = (insight: AIInsight) => {
    // For demo purposes, just show an alert
    console.log('Learn more about:', insight.title);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.background.light} />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('insights.title')}</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Loading state */}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary.main} />
          <Text style={styles.loadingText}>Generating insights...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.light} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('insights.title')}</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Date range */}
      {insights.length > 0 && (
        <Text style={styles.dateRange}>
          {formatDateRange(insights[0].dateRange.start, insights[0].dateRange.end)}
        </Text>
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {error ? (
          <Card style={styles.errorCard}>
            <Text style={styles.errorText}>{error}</Text>
            <Button
              title="Try Again"
              onPress={loadInsights}
              variant="primary"
              size="small"
              style={styles.retryButton}
            />
          </Card>
        ) : insights.length > 0 ? (
          insights.map((insight) => (
            <Card key={insight.id} style={styles.insightCard}>
              <Text style={styles.insightTitle}>{insight.title}</Text>
              <Text style={styles.insightDescription}>{insight.description}</Text>
              <TouchableOpacity 
                onPress={() => handleLearnMore(insight)}
                style={styles.learnMoreContainer}
              >
                <Text style={styles.learnMoreText}>
                  {insight.type === 'pattern' ? t('insights.seeDetails') : t('insights.learnMore')}
                </Text>
                <Text style={styles.learnMoreArrow}>→</Text>
              </TouchableOpacity>
            </Card>
          ))
        ) : (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>✨</Text>
            <Text style={styles.emptyTitle}>{t('insights.noInsights')}</Text>
            <Text style={styles.emptySubtitle}>{t('insights.checkBack')}</Text>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background.light,
  },
  backButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: colors.text.light,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.light,
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 48,
  },
  dateRange: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.main,
    textAlign: 'center',
    paddingVertical: spacing.sm,
    backgroundColor: colors.background.light,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  loadingText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
  errorCard: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
    marginTop: spacing.lg,
  },
  errorText: {
    fontSize: typography.fontSize.base,
    color: colors.status.error,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  retryButton: {
    backgroundColor: colors.primary.main,
  },
  insightCard: {
    backgroundColor: colors.background.insight,
    marginTop: spacing.lg,
  },
  insightTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.main,
    marginBottom: spacing.sm,
  },
  insightDescription: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    lineHeight: typography.lineHeight.normal * typography.fontSize.base,
    marginBottom: spacing.md,
  },
  learnMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  learnMoreText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.main,
  },
  learnMoreArrow: {
    fontSize: typography.fontSize.base,
    color: colors.primary.main,
    marginLeft: spacing.xs,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: spacing['3xl'],
    marginTop: spacing['2xl'],
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});

export default AIInsightsScreen;
