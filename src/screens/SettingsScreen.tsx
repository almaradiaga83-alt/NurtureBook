/**
 * Settings Screen
 * App settings and preferences
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
  Switch,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '../types';
import { colors, typography, spacing, borderRadius } from '../theme';
import Card from '../components/common/Card';
import { useAuth } from '../contexts/AuthContext';
import { useLocale } from '../contexts/LocaleContext';

type SettingsNavigationProp = StackNavigationProp<ProfileStackParamList, 'Settings'>;

interface Props {
  navigation: SettingsNavigationProp;
}

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { logout } = useAuth();
  const { t } = useLocale();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNotificationsToggle = (value: boolean) => {
    setNotificationsEnabled(value);
  };

  const handleAccount = () => {
    Alert.alert('Account', 'Account settings not implemented in demo');
  };

  const handleTheme = () => {
    Alert.alert('Theme', 'Theme settings not implemented in demo');
  };

  const handleAbout = () => {
    Alert.alert('About', 'NurtureBook v1.0.0\nA parenting companion app');
  };

  const handleHelpSupport = () => {
    Alert.alert('Help & Support', 'Support not implemented in demo');
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: logout },
      ]
    );
  };

  const settingsItems = [
    {
      id: 'notifications',
      icon: '🔔',
      title: t('settings.notifications'),
      type: 'toggle' as const,
      value: notificationsEnabled,
      onPress: handleNotificationsToggle,
    },
    {
      id: 'account',
      icon: '👤',
      title: t('settings.account'),
      type: 'navigate' as const,
      onPress: handleAccount,
    },
    {
      id: 'theme',
      icon: '🎨',
      title: t('settings.theme'),
      type: 'navigate' as const,
      onPress: handleTheme,
    },
    {
      id: 'about',
      icon: 'ℹ️',
      title: t('settings.about'),
      type: 'navigate' as const,
      onPress: handleAbout,
    },
    {
      id: 'help',
      icon: '❓',
      title: t('settings.helpSupport'),
      type: 'navigate' as const,
      onPress: handleHelpSupport,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.light} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('settings.title')}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Settings items */}
        <View style={styles.settingsContainer}>
          {settingsItems.map((item, _index) => (
            <Card key={item.id} style={styles.settingCard}>
              <TouchableOpacity
                style={styles.settingItem}
                onPress={() => item.type === 'navigate' ? item.onPress() : undefined}
                disabled={item.type === 'toggle'}
              >
                <View style={styles.settingLeft}>
                  <View style={styles.settingIcon}>
                    <Text style={styles.iconText}>{item.icon}</Text>
                  </View>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                </View>
                <View style={styles.settingRight}>
                  {item.type === 'toggle' ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onPress}
                      trackColor={{ false: colors.border.light, true: colors.primary.main }}
                      thumbColor={colors.background.card}
                    />
                  ) : (
                    <Text style={styles.chevronIcon}>›</Text>
                  )}
                </View>
              </TouchableOpacity>
            </Card>
          ))}
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Logout */}
        <Card style={styles.logoutCard}>
          <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
            <View style={styles.logoutLeft}>
              <View style={styles.logoutIcon}>
                <Text style={styles.logoutIconText}>🚪</Text>
              </View>
              <Text style={styles.logoutTitle}>{t('settings.logOut')}</Text>
            </View>
          </TouchableOpacity>
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
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  settingsContainer: {
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  settingCard: {
    backgroundColor: colors.background.card,
    minHeight: 56,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary.main,
    opacity: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  settingTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    color: colors.text.primary,
    flex: 1,
  },
  settingRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronIcon: {
    fontSize: 24,
    color: colors.text.muted,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: spacing.md,
  },
  logoutCard: {
    backgroundColor: colors.background.card,
    minHeight: 56,
    marginBottom: spacing['2xl'],
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  logoutLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    flex: 1,
  },
  logoutIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.secondary.main,
    opacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIconText: {
    fontSize: 20,
  },
  logoutTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    color: colors.status.error,
    flex: 1,
  },
});

export default SettingsScreen;
