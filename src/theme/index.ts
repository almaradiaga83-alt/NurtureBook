/**
 * Main theme configuration combining all design tokens
 */

import { colors } from './colors';
import { typography, TypographyTheme } from './typography';
import { spacing, borderRadius, shadows, SpacingTheme, BorderRadiusTheme, ShadowsTheme } from './spacing';

export interface Theme {
  colors: any; // Simplified for now
  typography: TypographyTheme;
  spacing: SpacingTheme;
  borderRadius: BorderRadiusTheme;
  shadows: ShadowsTheme;
}

export const theme: Theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
};

// Export individual theme modules for easier imports
export { colors, typography, spacing, borderRadius, shadows };

// Light theme (default)
export const lightTheme: Theme = {
  ...theme,
  colors: {
    ...colors,
    background: {
      ...colors.background,
      // Light theme uses light backgrounds
    },
    text: {
      ...colors.text,
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
  },
};

// Dark theme
export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...colors,
    background: {
      ...colors.background,
      light: colors.background.dark,
      dark: colors.background.light,
      card: colors.background.cardDark,
      cardDark: colors.background.card,
    },
    text: {
      ...colors.text,
      primary: colors.text.light,
      secondary: colors.text.light,
    },
  },
};

export default theme;
