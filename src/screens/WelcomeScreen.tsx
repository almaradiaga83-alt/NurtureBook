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
import { useLocale } from '../contexts/LocaleContext';

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
        <Text style={styles.brandName}>NurtureBook</Text>
      </View>

      {/* Main content */}
      <View style={styles.main}>


        {/* Title and subtitle */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{t('welcome.title')}</Text>
          <Text style={styles.subtitle}>{t('welcome.subtitle')}</Text>
        </View>

        {/* Action buttons */}
        <View style={styles.buttonContainer}>
          <Button
            title={t('welcome.getStarted')}
            onPress={handleGetStarted}
            variant="secondary"
            size="large"
            style={styles.primaryButton}
          />
          <Button
            title={t('welcome.logIn')}
            onPress={handleLogIn}
            variant="outline"
            size="large"
            style={styles.secondaryButton}
          />
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
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
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
    lineHeight: typography.lineHeight.tight * typography.fontSize['4xl'],
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
    borderColor: colors.secondary.main,
  },

});

export default WelcomeScreen;
