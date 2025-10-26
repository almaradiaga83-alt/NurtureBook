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
  Image,
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
          <Image 
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.brandName}>NurtureBook</Text>
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
                <View style={styles.appleIcon}>
                  <Text style={styles.appleIconText}></Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <View style={styles.facebookIcon}>
                  <Text style={styles.facebookIconText}>f</Text>
                </View>
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
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
  },
  logo: {
    width: 32,
    height: 32,
  },
  brandName: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.secondary.main,
    fontFamily: typography.fontFamily.display,
  },
  content: {
    maxWidth: 360,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: spacing.md,
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
  appleIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#000000',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appleIconText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: typography.fontWeight.bold,
  },
  facebookIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#1877f2',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookIconText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: typography.fontWeight.bold,
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
