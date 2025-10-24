/**
 * Add Chore Screen
 * Allows parents to create new chores for their children
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FamilyStackParamList } from '../types';
import { colors, typography, spacing } from '../theme';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useChores } from '../contexts/ChoresContext';
import { useLocale } from '../contexts/LocaleContext';

type AddChoreNavigationProp = StackNavigationProp<FamilyStackParamList, 'AddChore'>;

interface Props {
  navigation: AddChoreNavigationProp;
}

const AddChoreScreen: React.FC<Props> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [selectedChild, setSelectedChild] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { children, addChore } = useChores();
  const { t } = useLocale();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    const pointsNum = parseInt(points, 10);
    if (!points || isNaN(pointsNum) || pointsNum < 1 || pointsNum > 100) {
      newErrors.points = 'Please enter valid points (1-100)';
    }

    if (!selectedChild) {
      newErrors.child = 'Please select a child';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddChore = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await addChore(title.trim(), parseInt(points, 10), selectedChild);
      
      Alert.alert(
        'Success!',
        'Chore has been created successfully.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      setErrors({ general: 'Failed to create chore. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary.main} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Chore</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.subtitle}>
            Create a new chore and assign it to one of your children.
          </Text>

          <View style={styles.form}>
            <Input
              label="Chore Title"
              value={title}
              onChangeText={setTitle}
              placeholder="e.g., Clean your room"
              autoCapitalize="sentences"
              error={errors.title}
            />

            <Input
              label="Description (Optional)"
              value={description}
              onChangeText={setDescription}
              placeholder="Add any additional details..."
              autoCapitalize="sentences"
              multiline
              numberOfLines={3}
            />

            <Input
              label="Points"
              value={points}
              onChangeText={setPoints}
              placeholder="How many points is this worth?"
              keyboardType="numeric"
              error={errors.points}
            />

            {/* Child Selection */}
            <View style={styles.childSelection}>
              <Text style={styles.childSelectionLabel}>Assign to:</Text>
              {children.length > 0 ? (
                <View style={styles.childrenList}>
                  {children.map((child) => (
                    <TouchableOpacity
                      key={child.id}
                      style={[
                        styles.childOption,
                        selectedChild === child.id && styles.childOptionSelected
                      ]}
                      onPress={() => setSelectedChild(child.id)}
                    >
                      <View style={styles.childAvatar}>
                        <Text style={styles.childAvatarText}>
                          {child.name.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                      <Text style={[
                        styles.childName,
                        selectedChild === child.id && styles.childNameSelected
                      ]}>
                        {child.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <Text style={styles.noChildrenText}>
                  No children added yet. Add a child first to create chores.
                </Text>
              )}
              {errors.child && (
                <Text style={styles.fieldError}>{errors.child}</Text>
              )}
            </View>

            {errors.general && (
              <Text style={styles.errorText}>{errors.general}</Text>
            )}

            <Button
              title="Create Chore"
              onPress={handleAddChore}
              variant="primary"
              size="large"
              loading={isLoading}
              disabled={children.length === 0}
              style={styles.addButton}
            />
          </View>
        </View>
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
    backgroundColor: colors.primary.main,
  },
  cancelButton: {
    paddingVertical: spacing.sm,
  },
  cancelText: {
    fontSize: typography.fontSize.base,
    color: colors.text.onPrimary,
  },
  headerTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.onPrimary,
  },
  headerSpacer: {
    width: 60,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  content: {
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    marginBottom: spacing.xl,
  },
  form: {
    gap: spacing.lg,
  },
  childSelection: {
    marginVertical: spacing.md,
  },
  childSelectionLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  childrenList: {
    gap: spacing.md,
  },
  childOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border.light,
    backgroundColor: colors.background.card,
  },
  childOptionSelected: {
    borderColor: colors.primary.main,
    backgroundColor: colors.primary.main + '10',
  },
  childAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.secondary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  childAvatarText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.onSecondary,
  },
  childName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
  },
  childNameSelected: {
    color: colors.primary.main,
    fontWeight: typography.fontWeight.bold,
  },
  noChildrenText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
    padding: spacing.lg,
  },
  fieldError: {
    fontSize: typography.fontSize.sm,
    color: colors.status.error,
    marginTop: spacing.xs,
  },
  errorText: {
    fontSize: typography.fontSize.sm,
    color: colors.status.error,
    textAlign: 'center',
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    padding: spacing.md,
    borderRadius: 8,
  },
  addButton: {
    marginTop: spacing.lg,
  },
});

export default AddChoreScreen;