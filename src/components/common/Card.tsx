/**
 * Reusable Card component
 * Consistent card styling across the app
 */

import React from 'react';
import {
  View,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { colors, borderRadius, shadows, spacing } from '../../theme';

interface CardProps extends TouchableOpacityProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof spacing;
  shadow?: keyof typeof shadows;
  backgroundColor?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 'lg',
  shadow = 'sm',
  backgroundColor = colors.background.card,
  ...touchableProps
}) => {
  const cardStyle: ViewStyle = {
    backgroundColor,
    borderRadius: borderRadius.lg,
    padding: spacing[padding],
    ...shadows[shadow],
    borderWidth: 1,
    borderColor: colors.border.light,
  };

  // If no onPress is provided, render as View instead of TouchableOpacity
  if (!touchableProps.onPress) {
    return (
      <View style={[cardStyle, style]}>
        {children}
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[cardStyle, style]}
      activeOpacity={0.8}
      {...touchableProps}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Card;
