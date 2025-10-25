/**
 * Child Profile Screen
 * Individual child dashboard with points and chores
 */

import React from 'react';
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
import { RouteProp } from '@react-navigation/native';
import { FamilyStackParamList } from '../types';
import { colors as themeColors, typography, spacing, borderRadius } from '../theme';
import Card from '../components/common/Card';
import { useChores } from '../contexts/ChoresContext';
import { useLocale } from '../contexts/LocaleContext';
import { Chore } from '../types';

type ChildProfileNavigationProp = StackNavigationProp<FamilyStackParamList, 'ChildProfile'>;
type ChildProfileRouteProp = RouteProp<FamilyStackParamList, 'ChildProfile'>;

interface Props {
  navigation: ChildProfileNavigationProp;
  route: ChildProfileRouteProp;
}

const ChildProfileScreen: React.FC<Props> = ({ navigation, route }) => {
  const { childId } = route.params;
  const { children, chores, completeChore, uncompleteChore } = useChores();
  const { t } = useLocale();

  const child = children.find(c => c.id === childId);
  if (!child) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Child not found</Text>
      </SafeAreaView>
    );
  }

  const childChores = chores.filter(chore => chore.assignedTo === childId);
  const completedChores = childChores.filter(chore => chore.completed);
  const pendingChores = childChores.filter(chore => !chore.completed);

  const handleChoreToggle = async (chore: Chore) => {
    if (chore.completed) {
      await uncompleteChore(chore.id);
    } else {
      await completeChore(chore.id);
    }
  };

  const handleAddChore = () => {
    // For demo purposes, just show an alert
    console.log('Add new chore for', child.name);
  };

  const getNextRewardThreshold = () => {
    const thresholds = [50, 100, 150, 200, 250];
    return thresholds.find(threshold => child.totalPoints < threshold) || 300;
  };

  const getProgressPercentage = () => {
    const nextThreshold = getNextRewardThreshold();
    const progress = (child.totalPoints / nextThreshold) * 100;
    return Math.min(progress, 100);
  };

  const getChildInitials = () => {
    const names = child.name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return child.name.substring(0, 2).toUpperCase();
  };

  const getChildColor = () => {
    // Use realistic photo-style background
    return '#f0f0f0'; // Light gray for realistic photo effect
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={themeColors.background.light} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('child.dashboard')}</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Child profile card */}
        <Card style={styles.profileCard}>
          <View style={styles.profileContent}>
            <View style={styles.avatarContainer}>
              <View style={[styles.avatar, { backgroundColor: getChildColor() }]}>
                <Text style={styles.avatarText}>{getChildInitials()}</Text>
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.childName}>{child.name}</Text>
              <Text style={styles.childAge}>Age {child.age}</Text>
            </View>
            <View style={styles.pointsContainer}>
              <Text style={styles.pointsLabel}>{t('child.totalPoints')}</Text>
              <Text style={styles.pointsValue}>{child.totalPoints}</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { width: `${getProgressPercentage()}%` }
                  ]} 
                />
              </View>
              <Text style={styles.nextRewardText}>
                {t('child.nextReward')} {getNextRewardThreshold()} {t('child.points')}
              </Text>
            </View>
          </View>
        </Card>

        {/* Chores section */}
        <Text style={styles.sectionTitle}>{t('child.chores')}</Text>
        <Card style={styles.choresCard}>
          {pendingChores.length > 0 ? (
            pendingChores.map((chore) => (
              <TouchableOpacity
                key={chore.id}
                style={styles.choreItem}
                onPress={() => handleChoreToggle(chore)}
              >
                <View style={styles.choreLeft}>
                  <Text style={styles.choreIcon}>○</Text>
                </View>
                <View style={styles.choreMiddle}>
                  <Text style={styles.choreTitle}>{chore.title}</Text>
                  <Text style={styles.chorePoints}>+{chore.points}</Text>
                </View>
                <View style={styles.choreRight}>
                  <Text style={styles.choreIcon}>○</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noChoresText}>No pending chores</Text>
          )}
        </Card>

        {/* Completed section */}
        <Text style={styles.sectionTitle}>{t('child.completed')}</Text>
        <Card style={styles.completedCard}>
          <View style={styles.completedContent}>
            <Text style={styles.completedIcon}>✓</Text>
            <Text style={styles.completedText}>{t('child.dragChores')}</Text>
          </View>
          {completedChores.length > 0 && (
            <View style={styles.completedChores}>
              {completedChores.map((chore) => (
                <TouchableOpacity
                  key={chore.id}
                  style={styles.completedChoreItem}
                  onPress={() => handleChoreToggle(chore)}
                >
                  <View style={styles.completedChoreLeft}>
                    <Text style={styles.completedChoreIcon}>✓</Text>
                  </View>
                  <View style={styles.completedChoreMiddle}>
                    <Text style={styles.completedChoreTitle}>{chore.title}</Text>
                    <Text style={styles.completedChorePoints}>+{chore.points}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Card>

        {/* Family section */}
        <Text style={styles.sectionTitle}>{t('child.family')}</Text>
        <Card style={styles.familyCard}>
          <View style={styles.familyContent}>
            {children.map((familyMember) => (
              <View key={familyMember.id} style={styles.familyMember}>
                <View style={[
                  styles.familyAvatar,
                  { backgroundColor: familyMember.id === childId ? themeColors.child.c1 : themeColors.child.c2 }
                ]}>
                  <Text style={styles.familyAvatarText}>
                    {familyMember.name.charAt(0)}
                  </Text>
                </View>
              </View>
            ))}
            <TouchableOpacity style={styles.addFamilyMember}>
              <Text style={styles.addIcon}>+</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>

      {/* Floating add button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddChore}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.background.light,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: themeColors.background.light,
  },
  backButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: themeColors.text.light,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: themeColors.text.light,
    flex: 1,
    textAlign: 'center',
  },
  settingsButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: 24,
    color: themeColors.text.light,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  profileCard: {
    backgroundColor: themeColors.background.card,
    marginTop: spacing.lg,
    marginBottom: spacing['2xl'],
  },
  profileContent: {
    alignItems: 'center',
    gap: spacing.lg,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    color: themeColors.text.primary,
  },
  profileInfo: {
    alignItems: 'center',
  },
  childName: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: themeColors.text.primary,
    marginBottom: spacing.xs,
  },
  childAge: {
    fontSize: typography.fontSize.base,
    color: themeColors.primary.main,
  },
  pointsContainer: {
    alignItems: 'center',
    width: '100%',
    gap: spacing.sm,
  },
  pointsLabel: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: themeColors.text.primary,
  },
  pointsValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: themeColors.primary.main,
  },
  progressBar: {
    width: '100%',
    height: 16,
    backgroundColor: themeColors.border.light,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: themeColors.status.success,
    borderRadius: borderRadius.full,
  },
  nextRewardText: {
    fontSize: typography.fontSize.sm,
    color: themeColors.text.secondary,
  },
  sectionTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: themeColors.text.light,
    marginBottom: spacing.md,
  },
  choresCard: {
    backgroundColor: themeColors.background.card,
    marginBottom: spacing['2xl'],
  },
  choreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.border.light,
  },
  choreLeft: {
    width: 28,
    alignItems: 'center',
  },
  choreIcon: {
    fontSize: 20,
    color: themeColors.text.muted,
  },
  choreMiddle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  choreTitle: {
    fontSize: typography.fontSize.base,
    color: themeColors.text.primary,
  },
  chorePoints: {
    fontSize: typography.fontSize.sm,
    color: themeColors.text.secondary,
  },
  choreRight: {
    width: 28,
    alignItems: 'center',
  },
  noChoresText: {
    fontSize: typography.fontSize.base,
    color: themeColors.text.muted,
    textAlign: 'center',
    paddingVertical: spacing.lg,
  },
  completedCard: {
    backgroundColor: themeColors.background.card,
    marginBottom: spacing['2xl'],
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: themeColors.secondary.main,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  completedContent: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  completedIcon: {
    fontSize: 32,
    color: themeColors.secondary.main,
  },
  completedText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    color: themeColors.secondary.main,
  },
  completedChores: {
    width: '100%',
    marginTop: spacing.lg,
  },
  completedChoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    backgroundColor: themeColors.border.light,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  completedChoreLeft: {
    width: 28,
    alignItems: 'center',
  },
  completedChoreIcon: {
    fontSize: 16,
    color: themeColors.status.success,
  },
  completedChoreMiddle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completedChoreTitle: {
    fontSize: typography.fontSize.sm,
    color: themeColors.text.primary,
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  completedChorePoints: {
    fontSize: typography.fontSize.xs,
    color: themeColors.text.secondary,
  },
  familyCard: {
    backgroundColor: themeColors.background.card,
    marginBottom: spacing['6xl'], // Space for FAB
  },
  familyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  familyMember: {
    alignItems: 'center',
  },
  familyAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  familyAvatarText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: themeColors.text.primary,
  },
  addFamilyMember: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: themeColors.secondary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    fontSize: 24,
    color: themeColors.secondary.main,
  },
  fab: {
    position: 'absolute',
    bottom: spacing['2xl'],
    right: spacing['2xl'],
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: themeColors.action.green,
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
    color: themeColors.text.light,
  },
  errorText: {
    fontSize: typography.fontSize.lg,
    color: themeColors.status.error,
    textAlign: 'center',
    marginTop: spacing['2xl'],
  },
});

export default ChildProfileScreen;
