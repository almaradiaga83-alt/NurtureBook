/**
 * Typography system for NurtureBook app
 * Based on Inter font family with defined sizes and weights
 */

export const typography = {
  // Font families
  fontFamily: {
    primary: 'Inter',
    display: 'Inter',
    serif: 'Playfair Display', // For special headings
  },
  
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 22,
    '3xl': 24,
    '4xl': 32,
  },
  
  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
  
  // Letter spacing
  letterSpacing: {
    tight: '-0.015em',
    normal: '0',
    wide: '0.015em',
  },
} as const;

export type TypographyTheme = typeof typography;
