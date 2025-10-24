/**
 * Reusable Input component
 * Consistent input styling across the app
 */

import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, typography, borderRadius, spacing } from '../../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  labelStyle,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getInputStyle = (): TextStyle => {
    return {
      borderWidth: 2,
      borderColor: error ? colors.status.error : isFocused ? colors.primary.main : colors.border.light,
      borderRadius: borderRadius.lg,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      backgroundColor: colors.background.card,
      fontSize: typography.fontSize.base,
      fontFamily: typography.fontFamily.primary,
      color: colors.text.primary,
      minHeight: 48,
      ...shadows.sm,
    };
  };

  const getLabelStyle = (): TextStyle => {
    return {
      fontSize: typography.fontSize.base,
      fontFamily: typography.fontFamily.primary,
      fontWeight: typography.fontWeight.semibold,
      color: colors.text.primary,
      marginBottom: spacing.sm,
    };
  };

  const getErrorStyle = (): TextStyle => {
    return {
      fontSize: typography.fontSize.sm,
      fontFamily: typography.fontFamily.primary,
      color: colors.status.error,
      marginTop: spacing.xs,
    };
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[getLabelStyle(), labelStyle]}>{label}</Text>
      )}
      <TextInput
        style={[getInputStyle(), inputStyle]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={colors.text.muted}
        {...textInputProps}
      />
      {error && (
        <Text style={getErrorStyle()}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
});

export default Input;
