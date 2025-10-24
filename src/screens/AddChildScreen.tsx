/**
 * Add Child Screen
 * Allows parents to add new children to their account
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

type AddChildNavigationProp = StackNavigationProp<FamilyStackParamList, 'AddChild'>;

interface Props {
  navigation: AddChildNavigationProp;
}

const AddChildScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { addChild } = useChores();
  const { t } = useLocale();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    const ageNum = parseInt(age, 10);
    if (!age || isNaN(ageNum) || ageNum < 1 || ageNum > 18) {
      newErrors.age = 'Please enter a valid age (1-18)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddChild = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await addChild(name.trim(), parseInt(age, 10));
      
      Alert.alert(
        'Success!',
        `${name} has been added to your family.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      setErrors({ general: 'Failed to add child. Please try again.' });
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
        <Text style={styles.headerTitle}>Add Child</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.subtitle}>
            Add a new child to your family to start tracking their chores and progress.
          </Text>

          <View style={styles.form}>
            <Input
              label="Child's Name"
              value={name}
              onChangeText={setName}
              placeholder="Enter child's name"
              autoCapitalize="words"
              error={errors.name}
            />

            <Input
              label="Age"
              value={age}
              onChangeText={setAge}
              placeholder="Enter age"
              keyboardType="numeric"
              error={errors.age}
            />

            {errors.general && (
              <Text style={styles.errorText}>{errors.general}</Text>
            )}

            <Button
              title="Add Child"
              onPress={handleAddChild}
              variant="primary"
              size="large"
              loading={isLoading}
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

export default AddChildScreen;