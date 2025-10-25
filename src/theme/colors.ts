/**
 * Color palette for NurtureBook app
 * Based on the design mock-ups with dark green pastel primary and pastel pink secondary
 */

export const colors = {
  // Primary colors - Deep Green from designs
  primary: {
    main: '#2d4a3a',      // Deep forest green from designs
    light: '#4a6b5a',     // Lighter variant
    lighter: '#6b8e7a',   // Even lighter variant
    dark: '#1a2e22',      // Darker variant
  },
  
  // Secondary colors - Coral Pink from designs
  secondary: {
    main: '#f4a5a5',      // Coral pink from designs
    light: '#f8c2c2',     // Lighter variant
    lighter: '#fce8e8',   // Even lighter variant
    dark: '#e88888',      // Darker variant
  },
  
  // Garden/Mint colors for My Garden screen
  garden: {
    background: '#e8f5e8', // Light mint green background
    light: '#f0f9f0',      // Very light mint
    accent: '#c8e6c9',     // Mint accent
  },
  
  // Background colors
  background: {
    light: '#ffffff',     // Pure white for better contrast
    dark: '#0f1419',      // Darker background
    card: '#ffffff',      // Card background
    cardDark: '#1a2e22',  // Dark card background
    secondary: '#f8f9fa', // Light gray secondary background
    surface: '#fafbfc',   // Surface color for elevated elements
    cream: '#f5f1e8',     // Cream background for illustrations
    insight: '#fce8e8',   // Pink background for insight cards
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
  
  // Child avatar colors
  child: {
    c1: '#f4a5a5',        // Pink for Child 1
    c2: '#b19cd9',        // Purple for Child 2
    dad: '#87ceeb',       // Blue for Dad
    mom: '#f4a5a5',       // Pink for Mom
  },
  
  // Action colors
  action: {
    blue: '#2196f3',      // Blue FAB
    green: '#4caf50',     // Green buttons
    red: '#f44336',       // Red/coral for logout
  },
} as const;

export type ColorTheme = typeof colors;

// Make color values more flexible for theme switching
export type FlexibleColorTheme = {
  [K in keyof ColorTheme]: {
    [P in keyof ColorTheme[K]]: string;
  };
};
