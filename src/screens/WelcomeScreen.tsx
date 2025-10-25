/**
 * Welcome Screen
 * First screen users see when opening the app
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { colors, typography, spacing } from '../theme';
import Button from '../components/common/Button';
import FamilyIllustration from '../components/common/FamilyIllustration';
import { useLocale } from '../contexts/LocaleContext';
import JournalIcon from '../components/icons/JournalIcon';
import CalendarIcon from '../components/icons/CalendarIcon';
import CheckIcon from '../components/icons/CheckIcon';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useLocale();

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  const handleLogIn = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary.main} />
      
      {/* Header with app branding */}
      <View style={styles.header}>
        <Text style={styles.brandName}>ParentApp</Text>
        <Text style={styles.demoLabel}>Demo Mode</Text>
      </View>

      {/* Main content */}
      <View style={styles.main}>
        {/* Family illustration card */}
        <View style={styles.illustrationCard}>
          <FamilyIllustration />
        </View>

        {/* Title and subtitle */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Simplify Your{'\n'}Parenting Journey</Text>
          <Text style={styles.subtitle}>The all-in-one app for your family's{'\n'}memories and daily schedule.</Text>
        </View>

        {/* Action buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            onPress={handleGetStarted}
            variant="secondary"
            size="large"
            style={styles.primaryButton}
          />
          <Button
            title="Log In"
            onPress={handleLogIn}
            variant="outline"
            size="large"
            style={styles.secondaryButton}
          />
        </View>

        {/* Feature preview */}
        <View style={styles.featurePreview}>
          <View style={styles.featureItem}>
            <JournalIcon color={colors.text.onPrimary} size={28} />
            <Text style={styles.featureLabel}>Journaling</Text>
          </View>
          <View style={styles.featureItem}>
            <CalendarIcon color={colors.text.onPrimary} size={28} />
            <Text style={styles.featureLabel}>Calendar</Text>
          </View>
          <View style={styles.featureItem}>
            <CheckIcon color={colors.text.onPrimary} size={28} />
            <Text style={styles.featureLabel}>To-Do Lists</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.main,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  brandName: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.onPrimary,
    fontFamily: typography.fontFamily.display,
  },
  demoLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.secondary.main,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    marginTop: spacing.sm,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  illustrationCard: {
    width: 280,
    height: 280,
    backgroundColor: colors.background.cream,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing['2xl'],
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  textContainer: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontSize: 28, // Larger, bolder title
    fontWeight: '800', // Extra bold
    color: colors.text.onPrimary,
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: spacing.md,
    fontFamily: typography.fontFamily.display,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    color: colors.text.onPrimary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.normal * typography.fontSize.base,
    opacity: 0.9,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 480,
    gap: spacing.md,
    marginBottom: spacing['2xl'],
  },
  primaryButton: {
    backgroundColor: colors.secondary.main,
  },
  secondaryButton: {
    borderColor: colors.text.onPrimary,
    backgroundColor: 'transparent',
  },
  featurePreview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 300,
    marginTop: spacing['2xl'],
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
    gap: spacing.xs,
  },
  featureLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.onPrimary,
    textAlign: 'center',
  },
});

export default WelcomeScreen;
