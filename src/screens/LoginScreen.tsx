/**
 * Login/Signup Screen
 * Handles authentication with guest mode option
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
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { colors, typography, spacing } from '../theme';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useAuth } from '../contexts/AuthContext';
import { useLocale } from '../contexts/LocaleContext';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, loginAsGuest } = useAuth();
  const { t } = useLocale();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        navigation.navigate('MainApp');
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    // For demo purposes, just show an alert
    setError('Sign up functionality not implemented in demo');
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      await loginAsGuest();
      navigation.navigate('MainApp');
    } catch {
      setError('Guest login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // For demo purposes, just show an alert
    setError('Forgot password functionality not implemented in demo');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary.dark} />
      
      {/* Background image with overlay */}
      <View style={styles.backgroundContainer}>
        <View style={styles.backgroundImage} />
        <View style={styles.overlay} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with app branding */}
        <View style={styles.header}>
          <View style={styles.brandContainer}>
            <Text style={styles.brandIcon}>👶</Text>
            <Text style={styles.brandName}>FamilyFlow</Text>
          </View>
        </View>

        {/* Main content */}
        <View style={styles.content}>
          <Text style={styles.title}>{t('login.title')}</Text>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label={t('login.email')}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Input
              label={t('login.password')}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              autoCapitalize="none"
            />

            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : null}

            <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>{t('login.forgotPassword')}</Text>
            </TouchableOpacity>

            {/* Action buttons */}
            <View style={styles.buttonContainer}>
              <Button
                title={t('login.logIn')}
                onPress={handleLogin}
                variant="primary"
                size="large"
                loading={isLoading}
                style={styles.loginButton}
              />
              <Button
                title={t('login.signUp')}
                onPress={handleSignUp}
                variant="outline"
                size="large"
                style={styles.signUpButton}
              />
            </View>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>{t('login.continueWith')}</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social login buttons */}
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialIcon}>G</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialIcon}>f</Text>
              </TouchableOpacity>
            </View>

            {/* Guest login */}
            <Button
              title={t('login.continueAsGuest')}
              onPress={handleGuestLogin}
              variant="outline"
              size="large"
              style={styles.guestButton}
            />

            {/* Terms */}
            <Text style={styles.termsText}>
              {t('login.terms')}{' '}
              <Text style={styles.termsLink}>{t('login.termsLink')}</Text>{' '}
              and{' '}
              <Text style={styles.termsLink}>{t('login.privacyLink')}</Text>.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.dark,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: colors.primary.dark,
    opacity: 0.1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary.dark,
    opacity: 0.8,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  brandIcon: {
    fontSize: 40,
    color: colors.secondary.main,
  },
  brandName: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.light,
    fontFamily: typography.fontFamily.display,
  },
  content: {
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.light,
    textAlign: 'center',
    marginBottom: spacing['2xl'],
    fontFamily: typography.fontFamily.display,
  },
  form: {
    gap: spacing.lg,
  },
  errorText: {
    fontSize: typography.fontSize.sm,
    color: colors.status.error,
    textAlign: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.secondary.main,
  },
  buttonContainer: {
    gap: spacing.lg,
    marginTop: spacing.lg,
  },
  loginButton: {
    backgroundColor: colors.secondary.main,
  },
  signUpButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.text.muted,
  },
  dividerText: {
    fontSize: typography.fontSize.base,
    color: colors.text.muted,
    paddingHorizontal: spacing.lg,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  socialIcon: {
    fontSize: 24,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  guestButton: {
    borderColor: colors.text.muted,
    marginTop: spacing.lg,
  },
  termsText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.muted,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  termsLink: {
    color: colors.secondary.main,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
