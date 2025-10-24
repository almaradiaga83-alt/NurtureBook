/**
 * Color palette for NurtureBook app
 * Based on the design mock-ups with dark green pastel primary and pastel pink secondary
 */

export const colors = {
  // Primary colors - Dark Green Pastel variants
  primary: {
    main: '#3b5249',      // Main dark green pastel
    light: '#4C8577',      // Lighter variant
    lighter: '#6B8E23',    // Even lighter variant
    dark: '#2a3b3d',       // Darker variant
  },
  
  // Secondary colors - Pastel Pink variants
  secondary: {
    main: '#f4c2c2',       // Main pastel pink
    light: '#FFC0CB',      // Lighter variant
    lighter: '#F7D9D9',    // Even lighter variant
    dark: '#F3C6C6',       // Darker variant
  },
  
  // Background colors
  background: {
    light: '#f6f7f8',      // Light background
    dark: '#101c22',       // Dark background
    card: '#ffffff',       // Card background
    cardDark: '#1a2e22',   // Dark card background
    secondary: '#edf2f4',   // Secondary background
  },
  
  // Text colors
  text: {
    primary: '#111618',    // Primary text color
    secondary: '#333333',  // Secondary text color
    light: '#ffffff',      // Light text
    muted: '#666666',      // Muted text
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
    light: '#e0e0e0',      // Light border
    dark: '#333333',       // Dark border
  },
  
  // Shadow colors
  shadow: 'rgba(0, 0, 0, 0.1)',
} as const;

export type ColorTheme = typeof colors;

// Make color values more flexible for theme switching
export type FlexibleColorTheme = {
  [K in keyof ColorTheme]: {
    [P in keyof ColorTheme[K]]: string;
  };
};
