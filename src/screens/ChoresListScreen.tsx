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
import MenuIcon from '../components/icons/MenuIcon';
import BellIcon from '../components/icons/BellIcon';
import PlantIcon from '../components/icons/PlantIcon';
import StarIcon from '../components/icons/StarIcon';

type ChoresListNavigationProp = StackNavigationProp<FamilyStackParamList, 'ChoresList'>;

interface Props {
  navigation: ChoresListNavigationProp;
}

const ChoresListScreen: React.FC<Props> = ({ navigation }) => {
  const { chores, children, completeChore, uncompleteChore } = useChores();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<'To Grow' | 'Bloomed'>('To Grow');

  // Filter chores based on selected child and status
  const filteredChores = chores.filter(chore => {
    const statusMatch = selectedStatus === 'To Grow' ? !chore.completed : chore.completed;
    if (selectedFilter === 'All') return statusMatch;
    if (selectedFilter === 'Mom' || selectedFilter === 'Dad') return statusMatch; // Mock filter
    const child = children.find(c => c.name === selectedFilter);
    return statusMatch && (child ? chore.assignedTo === child.id : false);
  });

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
      <StatusBar barStyle="dark-content" backgroundColor={colors.garden.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <MenuIcon color={colors.secondary.main} size={24} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>My Garden</Text>
          <Text style={styles.brandSubtitle}>NurtureBook</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <BellIcon color={colors.secondary.main} size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Family Filter */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {['All', 'Mom', 'Dad', 'Child 1', 'Child 2'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterChip,
                  selectedFilter === filter && styles.filterChipActive
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedFilter === filter && styles.filterChipTextActive
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Status Toggle */}
        <View style={styles.statusToggleContainer}>
          <TouchableOpacity
            style={[
              styles.statusToggle,
              selectedStatus === 'To Grow' && styles.statusToggleActive
            ]}
            onPress={() => setSelectedStatus('To Grow')}
          >
            <Text style={[
              styles.statusToggleText,
              selectedStatus === 'To Grow' && styles.statusToggleTextActive
            ]}>
              To Grow
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.statusToggle,
              selectedStatus === 'Bloomed' && styles.statusToggleActive
            ]}
            onPress={() => setSelectedStatus('Bloomed')}
          >
            <Text style={[
              styles.statusToggleText,
              selectedStatus === 'Bloomed' && styles.statusToggleTextActive
            ]}>
              Bloomed
            </Text>
          </TouchableOpacity>
        </View>

        {/* Chores List */}
        <View style={styles.choresContainer}>
          {filteredChores.length > 0 ? (
            filteredChores.map(chore => {
              const child = children.find(c => c.id === chore.assignedTo);
              const childInitial = child?.name.charAt(0) || 'C';
              const childColor = child?.name === 'Emma' ? colors.child.c1 : colors.child.c2;
              
              return (
                <Card key={chore.id} style={styles.choreCard}>
                  <View style={styles.choreContent}>
                    <View style={styles.choreIcon}>
                      <PlantIcon color={colors.secondary.main} size={20} />
                    </View>
                    
                    <View style={styles.choreInfo}>
                      <Text style={styles.choreTitle}>{chore.title}</Text>
                      <Text style={styles.choreDue}>
                        Due: {chore.dueDate ? formatDueDate(chore.dueDate) : 'Today'}
                      </Text>
                    </View>
                    
                    <View style={[styles.childAvatar, { backgroundColor: childColor }]}>
                      <Text style={styles.childAvatarText}>{childInitial}</Text>
                    </View>
                    
                    <View style={styles.chorePoints}>
                      <StarIcon color={colors.secondary.main} size={14} filled={true} />
                      <Text style={styles.pointsText}>{chore.points}</Text>
                    </View>
                  </View>
                </Card>
              );
            })
          ) : (
            <Card style={styles.emptyState}>
              <View style={styles.emptyStateIcon} />
              <Text style={styles.emptyStateText}>No tasks to {selectedStatus.toLowerCase()}</Text>
            </Card>
          )}
        </View>

        {/* Garden Progress */}
        <Text style={styles.sectionTitle}>Garden Progress</Text>
        <View style={styles.progressContainer}>
          {children.map((child, index) => {
            const childColor = child.name === 'Emma' ? colors.child.c1 : colors.child.c2;
            const childLabel = child.name === 'Emma' ? 'C1' : 'C2';
            const progress = Math.min(child.totalPoints / 200, 1); // Max 200 points
            
            return (
              <View key={child.id} style={styles.progressItem}>
                <View style={[styles.progressAvatar, { backgroundColor: childColor }]}>
                  <Text style={styles.progressAvatarText}>{childLabel}</Text>
                </View>
                <View style={styles.progressInfo}>
                  <Text style={styles.progressChildName}>{child.name}</Text>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressBarFill, 
                        { width: `${progress * 100}%` }
                      ]} 
                    />
                  </View>
                </View>
                <View style={styles.progressPoints}>
                  <StarIcon color={colors.secondary.main} size={12} filled={true} />
                  <Text style={styles.progressPointsText}>{child.totalPoints}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('AddChore')}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.garden.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    backgroundColor: colors.garden.background,
    minHeight: 60,
  },
  headerCenter: {
    alignItems: 'center',
  },
  menuButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  brandSubtitle: {
    fontSize: typography.fontSize.xs,
    color: colors.secondary.main,
    fontWeight: typography.fontWeight.medium,
  },
  notificationButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  filterContainer: {
    marginBottom: spacing.md,
  },
  filterScroll: {
    flexGrow: 0,
  },
  filterChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    minWidth: 60,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  filterChipActive: {
    backgroundColor: '#2196f3', // Exact blue from design
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  filterChipText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
  },
  filterChipTextActive: {
    color: colors.text.light,
  },
  statusToggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 25,
    padding: 4,
    marginBottom: spacing.lg,
  },
  statusToggle: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: 20,
  },
  statusToggleActive: {
    backgroundColor: colors.background.light,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusToggleText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.secondary,
  },
  statusToggleTextActive: {
    color: colors.text.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  choresContainer: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  choreCard: {
    backgroundColor: colors.background.light,
    borderRadius: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 2,
  },
  choreContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    minHeight: 72,
  },
  choreIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    backgroundColor: '#e8f5e8',
    borderRadius: 20,
  },

  choreInfo: {
    flex: 1,
  },
  choreTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  choreDue: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  childAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  childAvatarText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.light,
  },
  chorePoints: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3cd',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    gap: 4,
  },
  pointsText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: '#856404', // Dark yellow text
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
    backgroundColor: colors.background.light,
    borderRadius: 16,
  },
  emptyStateIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#E0E0E0',
    borderRadius: 24,
    marginBottom: spacing.md,
  },
  emptyStateText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
  },
  progressContainer: {
    gap: spacing.md,
    marginBottom: spacing['6xl'], // Space for FAB
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.light,
    borderRadius: 16,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  progressAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  progressAvatarText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.light,
  },
  progressInfo: {
    flex: 1,
  },
  progressChildName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border.light,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#ffc107', // Yellow progress bar
    borderRadius: 4,
  },
  progressPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  progressPointsText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  fab: {
    position: 'absolute',
    bottom: spacing['3xl'],
    right: spacing['2xl'],
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.action.blue,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  fabIcon: {
    fontSize: 24,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.light,
  },
});

export default ChoresListScreen;