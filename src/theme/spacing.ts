/**
 * Spacing and layout system for NurtureBook app
 * Consistent padding, margins, and border radius values
 */

export const spacing = {
  // Spacing scale (based on 4px grid)
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
} as const;

export const borderRadius = {
  // Border radius values
  none: 0,
  sm: 4,
  md: 8,        // 0.5rem equivalent
  lg: 16,       // 1rem equivalent
  xl: 24,       // 1.5rem equivalent
  full: 9999,   // Fully rounded
} as const;

export const shadows = {
  // Shadow definitions
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;

export type SpacingTheme = typeof spacing;
export type BorderRadiusTheme = typeof borderRadius;
export type ShadowsTheme = typeof shadows;
