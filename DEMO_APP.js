/**
 * Simplified Demo App for Expo Snack
 * Shows the redesigned Welcome Screen
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// Simplified theme with exact colors from design
const colors = {
  primary: { main: '#2d4a3a' },
  secondary: { main: '#f4a5a5' },
  background: { cream: '#f4f0e6' }, // Exact cream from design
  text: { onPrimary: '#ffffff' },
  shadow: 'rgba(0, 0, 0, 0.1)',
};

const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, '2xl': 48 };
const typography = {
  fontSize: { sm: 14, base: 16, lg: 18, '3xl': 24, '4xl': 32 },
  fontWeight: { normal: '400', medium: '500', bold: '700' },
};

// Simplified Button Component
const Button = ({ title, onPress, variant = 'primary', style }) => {
  const buttonStyle = [
    styles.button,
    variant === 'primary' ? styles.primaryButton : styles.outlineButton,
    style,
  ];
  
  const textStyle = [
    styles.buttonText,
    variant === 'primary' ? styles.primaryButtonText : styles.outlineButtonText,
  ];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

// Main Demo App
const DemoApp = () => {
  const handleGetStarted = () => {
    alert('Get Started pressed! 🎉');
  };

  const handleLogIn = () => {
    alert('Log In pressed! 🔐');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary.main} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brandName}>ParentApp</Text>
        <Text style={styles.demoLabel}>Demo Mode</Text>
      </View>

      {/* Main content */}
      <View style={styles.main}>
        {/* Family illustration card */}
        <View style={styles.illustrationCard}>
          <View style={styles.familyIllustration}>
            <Text style={styles.familyEmoji}>👨‍👩‍👧‍👦</Text>
          </View>
        </View>

        {/* Title and subtitle */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Simplify Your{'\n'}Parenting Journey</Text>
          <Text style={styles.subtitle}>
            The all-in-one app for your family's{'\n'}memories and daily schedule.
          </Text>
        </View>

        {/* Action buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            onPress={handleGetStarted}
            variant="primary"
            style={styles.primaryButtonStyle}
          />
          <Button
            title="Log In"
            onPress={handleLogIn}
            variant="outline"
            style={styles.secondaryButtonStyle}
          />
        </View>

        {/* Feature preview */}
        <View style={styles.featurePreview}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📝</Text>
            <Text style={styles.featureLabel}>Journaling</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📅</Text>
            <Text style={styles.featureLabel}>Calendar</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✅</Text>
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
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  brandName: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.onPrimary,
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
  familyIllustration: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  familyEmoji: {
    fontSize: 120,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.onPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    color: colors.text.onPrimary,
    textAlign: 'center',
    opacity: 0.9,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 480,
    gap: spacing.md,
    marginBottom: spacing['2xl'],
  },
  button: {
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing.lg,
    minHeight: 56,
  },
  primaryButton: {
    backgroundColor: colors.secondary.main,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.text.onPrimary,
  },
  buttonText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    textAlign: 'center',
  },
  primaryButtonText: {
    color: colors.text.onPrimary,
  },
  outlineButtonText: {
    color: colors.text.onPrimary,
  },
  primaryButtonStyle: {
    backgroundColor: colors.secondary.main,
  },
  secondaryButtonStyle: {
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
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  featureLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.onPrimary,
    textAlign: 'center',
  },
});

export default DemoApp;