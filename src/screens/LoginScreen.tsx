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

  const { signIn } = useAuth();
  const { t } = useLocale();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { success, error: authError } = await signIn(email, password);
      if (success) {
        navigation.navigate('MainApp');
      } else {
        setError(authError || 'Invalid email or password');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleGuestLogin = async () => {
    // Demo guest login - just navigate to main app
    navigation.navigate('MainApp');
  };

  const handleForgotPassword = () => {
    // For demo purposes, just show an alert
    setError('Forgot password functionality not implemented in demo');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary.dark} />



      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with app branding */}
        <View style={styles.header}>
          <Text style={styles.brandName}>FamilyFlow</Text>
          <Text style={styles.demoLabel}>Demo Mode - Use any email/password</Text>
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
                variant="secondary"
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

            {/* Social login */}
            <Text style={styles.socialText}>Or continue with</Text>
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialIcon}>🍎</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialIcon}>📘</Text>
              </TouchableOpacity>
            </View>

            {/* Guest login */}
            <Button
              title="Continue as Guest"
              onPress={handleGuestLogin}
              variant="outline"
              size="large"
              style={styles.guestButton}
            />

            {/* Sign up link */}
            <TouchableOpacity onPress={handleSignUp} style={styles.signUpLink}>
              <Text style={styles.signUpLinkText}>
                Don't have an account? <Text style={styles.signUpLinkBold}>Sign Up</Text>
              </Text>
            </TouchableOpacity>

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

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },

  brandName: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.light,
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
    textAlign: 'center',
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  socialText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.onPrimary,
    textAlign: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    fontSize: 24,
  },
  guestButton: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },

  signUpLink: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  signUpLinkText: {
    fontSize: typography.fontSize.base,
    color: colors.text.onPrimary,
    opacity: 0.9,
  },
  signUpLinkBold: {
    fontWeight: typography.fontWeight.bold,
    color: colors.secondary.main,
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
