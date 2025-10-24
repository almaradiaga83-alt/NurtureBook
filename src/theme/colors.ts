/**
 * Color palette for NurtureBook app
 * Based on the design mock-ups with dark green pastel primary and pastel pink secondary
 */

export const colors = {
  // Primary colors - Dark Green Pastel variants
  primary: {
    main: '#2d4a3a',      // Darker green for better contrast
    light: '#4a6b5a',     // Lighter variant
    lighter: '#6b8e7a',   // Even lighter variant
    dark: '#1a2e22',      // Darker variant
  },
  
  // Secondary colors - Pastel Pink variants
  secondary: {
    main: '#e8a5a5',      // Slightly darker pink for better contrast
    light: '#f2c2c2',     // Lighter variant
    lighter: '#f7d9d9',   // Even lighter variant
    dark: '#d48888',      // Darker variant
  },
  
  // Background colors
  background: {
    light: '#ffffff',     // Pure white for better contrast
    dark: '#0f1419',      // Darker background
    card: '#ffffff',      // Card background
    cardDark: '#1a2e22',  // Dark card background
    secondary: '#f8f9fa', // Light gray secondary background
    surface: '#fafbfc',   // Surface color for elevated elements
  },
  
  // Text colors - Improved contrast
  text: {
    primary: '#1a1a1a',   // Darker primary text for better readability
    secondary: '#4a4a4a', // Darker secondary text
    light: '#ffffff',     // Light text
    muted: '#6b7280',     // Better muted text color
    onPrimary: '#ffffff', // Text on primary color backgrounds
    onSecondary: '#1a1a1a', // Text on secondary color backgrounds
  },
  
  // Mood colors for journal entries
  mood: {
    happy: '#86e3ce',      // Happy mood - light green
    calm: '#d0f0c0',       // Calm mood - light green
    excited: '#ffe4b3',    // Excited mood - yellow
    sad: '#ffb3ba',        // Sad mood - pink
    tired: '#cddafd',      // Tired mood - blue
  },
  
  // Status colors
  status: {
    success: '#4CAF50',    // Success green
    warning: '#FF9800',    // Warning orange
    error: '#F44336',      // Error red
    info: '#2196F3',       // Info blue
  },
  
  // Border colors
  border: {
    light: '#e5e7eb',     // Light border with better contrast
    medium: '#d1d5db',    // Medium border
    dark: '#374151',      // Dark border
  },
  
  // Shadow colors
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.25)',
  
  // Interactive states
  interactive: {
    hover: 'rgba(45, 74, 58, 0.08)',     // Hover state
    pressed: 'rgba(45, 74, 58, 0.12)',   // Pressed state
    focus: 'rgba(45, 74, 58, 0.16)',     // Focus state
    disabled: 'rgba(107, 114, 128, 0.3)', // Disabled state
  },
} as const;

export type ColorTheme = typeof colors;

// Make color values more flexible for theme switching
export type FlexibleColorTheme = {
  [K in keyof ColorTheme]: {
    [P in keyof ColorTheme[K]]: string;
  };
};
