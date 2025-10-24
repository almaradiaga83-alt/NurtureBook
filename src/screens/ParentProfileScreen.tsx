/**
 * Parent Profile Screen
 * Parent dashboard with profile management and language settings
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
  TextInput,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '../types';
import { colors, typography, spacing, borderRadius } from '../theme';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';
import { useLocale } from '../contexts/LocaleContext';
import { SupportedLanguage } from '../types';

type ParentProfileNavigationProp = StackNavigationProp<ProfileStackParamList, 'ParentProfile'>;

interface Props {
  navigation: ParentProfileNavigationProp;
}

const ParentProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  const { language, changeLanguage, t } = useLocale();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setEditedName(user?.name || '');
    }
  };

  const handleSave = async () => {
    if (editedName.trim() && user) {
      await updateUser({ name: editedName.trim() });
      setIsEditing(false);
    }
  };

  const handleLanguageChange = async (newLanguage: SupportedLanguage) => {
    await changeLanguage(newLanguage);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>User not found</Text>
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
        <Text style={styles.headerTitle}>{t('profile.dashboard')}</Text>
        <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
          <Text style={styles.editText}>{t('profile.edit')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
        </View>

        {/* Profile information */}
        <View style={styles.infoSection}>
          {/* Name field */}
          <Card style={styles.infoCard}>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Text style={styles.iconText}>👤</Text>
              </View>
              <Text style={styles.infoLabel}>{t('profile.name')}</Text>
            </View>
            {isEditing ? (
              <View style={styles.editInputContainer}>
                <TextInput
                  style={styles.editInput}
                  value={editedName}
                  onChangeText={setEditedName}
                  placeholder="Enter your name"
                />
              </View>
            ) : (
              <Text style={styles.infoValue}>{user.name}</Text>
            )}
          </Card>

          {/* Language field */}
          <Card style={styles.infoCard}>
            <View style={styles.infoItem}>
              <View style={styles.infoIcon}>
                <Text style={styles.iconText}>🌐</Text>
              </View>
              <Text style={styles.infoLabel}>{t('profile.language')}</Text>
            </View>
            <View style={styles.languageSelector}>
              <TouchableOpacity
                style={[
                  styles.languageButton,
                  language === 'en' && styles.languageButtonActive
                ]}
                onPress={() => handleLanguageChange('en')}
              >
                <Text style={[
                  styles.languageButtonText,
                  language === 'en' && styles.languageButtonTextActive
                ]}>
                  English
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.languageButton,
                  language === 'es' && styles.languageButtonActive
                ]}
                onPress={() => handleLanguageChange('es')}
              >
                <Text style={[
                  styles.languageButtonText,
                  language === 'es' && styles.languageButtonTextActive
                ]}>
                  Spanish
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>

        {/* Save button */}
        {isEditing && (
          <View style={styles.saveButtonContainer}>
            <Button
              title={t('profile.saveChanges')}
              onPress={handleSave}
              variant="primary"
              size="large"
              style={styles.saveButton}
            />
          </View>
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
  editButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.main,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing['2xl'],
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.light,
  },
  userName: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    textAlign: 'center',
  },
  infoSection: {
    gap: spacing.lg,
  },
  infoCard: {
    backgroundColor: colors.background.card,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary.main,
    opacity: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  infoLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    flex: 1,
  },
  infoValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginLeft: 56, // Align with icon + gap
  },
  editInputContainer: {
    marginLeft: 56, // Align with icon + gap
  },
  editInput: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary.main,
    paddingVertical: spacing.xs,
  },
  languageSelector: {
    flexDirection: 'row',
    backgroundColor: colors.border.light,
    borderRadius: borderRadius.lg,
    padding: 4,
    marginLeft: 56, // Align with icon + gap
  },
  languageButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.md,
  },
  languageButtonActive: {
    backgroundColor: colors.secondary.main,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  languageButtonText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
  },
  languageButtonTextActive: {
    color: colors.text.light,
  },
  saveButtonContainer: {
    marginTop: spacing['2xl'],
    marginBottom: spacing['2xl'],
  },
  saveButton: {
    backgroundColor: colors.primary.main,
  },
  errorText: {
    fontSize: typography.fontSize.lg,
    color: colors.status.error,
    textAlign: 'center',
    marginTop: spacing['2xl'],
  },
});

export default ParentProfileScreen;
