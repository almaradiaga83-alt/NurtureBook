/**
 * Chores List Screen
 * Garden-themed chores management with points system
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
import { FamilyStackParamList } from '../types';
import { colors, typography, spacing } from '../theme';
import Card from '../components/common/Card';
import { useChores } from '../contexts/ChoresContext';

type ChoresListNavigationProp = StackNavigationProp<FamilyStackParamList, 'ChoresList'>;

interface Props {
  navigation: ChoresListNavigationProp;
}

const ChoresListScreen: React.FC<Props> = ({ navigation }) => {
  const { chores, children, completeChore, uncompleteChore } = useChores();
  const [selectedChildFilter, setSelectedChildFilter] = useState<string | null>(null);

  // Filter chores based on selected child
  const filteredChores = selectedChildFilter 
    ? chores.filter(chore => chore.assignedTo === selectedChildFilter)
    : chores;

  const getChildName = (childId: string) => {
    const child = children.find(c => c.id === childId);
    return child?.name || 'Unknown';
  };

  const handleChoreToggle = async (choreId: string, completed: boolean) => {
    if (completed) {
      await uncompleteChore(choreId);
    } else {
      await completeChore(choreId);
    }
  };

  const handleChildProfile = (childId: string) => {
    navigation.navigate('ChildProfile', { childId });
  };

  const formatDueDate = (date?: Date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.light} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Garden</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerIcon}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Children Filter */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedChildFilter === null && styles.filterChipActive
              ]}
              onPress={() => setSelectedChildFilter(null)}
            >
              <Text style={[
                styles.filterChipText,
                selectedChildFilter === null && styles.filterChipTextActive
              ]}>
                All
              </Text>
            </TouchableOpacity>
            {children.map(child => (
              <TouchableOpacity
                key={child.id}
                style={[
                  styles.filterChip,
                  selectedChildFilter === child.id && styles.filterChipActive
                ]}
                onPress={() => setSelectedChildFilter(child.id)}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedChildFilter === child.id && styles.filterChipTextActive
                ]}>
                  {child.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Children Points Summary */}
        <View style={styles.childrenContainer}>
          {children.map(child => (
            <Card
              key={child.id}
              style={styles.childCard}
              onPress={() => handleChildProfile(child.id)}
            >
              <View style={styles.childInfo}>
                <View style={styles.childAvatar}>
                  <Text style={styles.childAvatarText}>
                    {child.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.childDetails}>
                  <Text style={styles.childName}>{child.name}</Text>
                  <Text style={styles.childPoints}>{child.totalPoints} points</Text>
                </View>
                <View style={styles.childBadge}>
                  <Text style={styles.childBadgeText}>🌱</Text>
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* Chores List */}
        <Text style={styles.sectionTitle}>Garden Tasks</Text>
        <View style={styles.choresContainer}>
          {filteredChores.length > 0 ? (
            filteredChores.map(chore => (
              <Card key={chore.id} style={styles.choreCard}>
                <View style={styles.choreContent}>
                  <TouchableOpacity
                    style={styles.choreToggle}
                    onPress={() => handleChoreToggle(chore.id, chore.completed)}
                  >
                    <View style={[
                      styles.choreCheckbox,
                      chore.completed && styles.choreCheckboxCompleted
                    ]}>
                      {chore.completed && (
                        <Text style={styles.choreCheckmark}>✓</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                  
                  <View style={styles.choreInfo}>
                    <Text style={[
                      styles.choreTitle,
                      chore.completed && styles.choreTitleCompleted
                    ]}>
                      {chore.title}
                    </Text>
                    <View style={styles.choreDetails}>
                      <Text style={styles.choreAssignee}>
                        {getChildName(chore.assignedTo)}
                      </Text>
                      {chore.dueDate && (
                        <Text style={styles.choreDueDate}>
                          Due: {formatDueDate(chore.dueDate)}
                        </Text>
                      )}
                    </View>
                  </View>
                  
                  <View style={styles.chorePoints}>
                    <Text style={styles.chorePointsText}>{chore.points}</Text>
                    <Text style={styles.chorePointsLabel}>pts</Text>
                  </View>
                </View>
              </Card>
            ))
          ) : (
            <Card style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>🌿</Text>
              <Text style={styles.emptyStateText}>No tasks in the garden</Text>
              <Text style={styles.emptyStateSubtext}>
                {selectedChildFilter 
                  ? `No tasks assigned to ${getChildName(selectedChildFilter)}`
                  : 'Add some tasks to get started!'
                }
              </Text>
            </Card>
          )}
        </View>

        {/* Garden Progress */}
        <Text style={styles.sectionTitle}>Garden Progress</Text>
        <Card style={styles.progressCard}>
          <View style={styles.progressContent}>
            <Text style={styles.progressTitle}>Weekly Growth</Text>
            <View style={styles.progressStats}>
              <View style={styles.progressStat}>
                <Text style={styles.progressStatNumber}>
                  {chores.filter(c => c.completed).length}
                </Text>
                <Text style={styles.progressStatLabel}>Completed</Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressStatNumber}>
                  {chores.filter(c => !c.completed).length}
                </Text>
                <Text style={styles.progressStatLabel}>Pending</Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressStatNumber}>
                  {children.reduce((sum, child) => sum + child.totalPoints, 0)}
                </Text>
                <Text style={styles.progressStatLabel}>Total Points</Text>
              </View>
            </View>
          </View>
        </Card>
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
  headerButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    fontSize: 24,
    color: colors.text.onPrimary,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.onPrimary,
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  filterContainer: {
    marginBottom: spacing.lg,
  },
  filterChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    backgroundColor: colors.background.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  filterChipActive: {
    backgroundColor: colors.secondary.main,
    borderColor: colors.secondary.main,
  },
  filterChipText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
  },
  filterChipTextActive: {
    color: colors.text.light,
  },
  childrenContainer: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  childCard: {
    backgroundColor: colors.background.secondary,
  },
  childInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  childAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.secondary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  childAvatarText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.light,
  },
  childDetails: {
    flex: 1,
  },
  childName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  childPoints: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  childBadge: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  childBadgeText: {
    fontSize: 24,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.onPrimary,
    marginBottom: spacing.md,
  },
  choresContainer: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  choreCard: {
    backgroundColor: colors.background.card,
  },
  choreContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  choreToggle: {
    marginRight: spacing.md,
  },
  choreCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choreCheckboxCompleted: {
    backgroundColor: colors.secondary.main,
    borderColor: colors.secondary.main,
  },
  choreCheckmark: {
    fontSize: 14,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.light,
  },
  choreInfo: {
    flex: 1,
  },
  choreTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  choreTitleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.text.secondary,
  },
  choreDetails: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  choreAssignee: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  choreDueDate: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  chorePoints: {
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  chorePointsText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.secondary.main,
  },
  chorePointsLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
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
    textAlign: 'center',
  },
  progressCard: {
    backgroundColor: colors.background.secondary,
    marginBottom: spacing['2xl'],
  },
  progressContent: {
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  progressStats: {
    flexDirection: 'row',
    gap: spacing['2xl'],
  },
  progressStat: {
    alignItems: 'center',
  },
  progressStatNumber: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.secondary.main,
    marginBottom: spacing.xs,
  },
  progressStatLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
});

export default ChoresListScreen;