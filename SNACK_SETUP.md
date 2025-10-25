# Expo Snack Setup Guide

## Quick Setup for Testing the Redesigned UI

### Step 1: Create New Snack
1. Go to https://snack.expo.dev
2. Create a new Snack
3. Choose "React Native" template

### Step 2: Copy Essential Files

#### 1. Replace App.js with:
```javascript
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { JournalProvider } from './src/contexts/JournalContext';
import { ChoresProvider } from './src/contexts/ChoresContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { LocaleProvider } from './src/contexts/LocaleContext';
import { colors } from './src/theme';

const App = () => {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AuthProvider>
          <JournalProvider>
            <ChoresProvider>
              <StatusBar style="light" backgroundColor={colors.primary.main} />
              <AppNavigator />
            </ChoresProvider>
          </JournalProvider>
        </AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
};

export default App;
```

#### 2. Create folder structure:
```
src/
├── theme/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── index.ts
├── components/common/
│   ├── Button.tsx
│   └── Card.tsx
├── screens/
│   ├── WelcomeScreen.tsx
│   ├── LoginScreen.tsx
│   ├── ChoresListScreen.tsx
│   └── JournalDashboardScreen.tsx
├── contexts/
│   ├── AuthContext.tsx
│   ├── LocaleContext.tsx
│   ├── ThemeContext.tsx
│   ├── JournalContext.tsx
│   └── ChoresContext.tsx
├── navigation/
│   └── AppNavigator.tsx
├── types/
│   └── index.ts
└── config/
    └── supabase.ts
```

#### 3. Copy files in this order:
1. **Theme files first** (colors.ts, typography.ts, spacing.ts, index.ts)
2. **Types** (index.ts)
3. **Config** (supabase.ts)
4. **Components** (Button.tsx, Card.tsx)
5. **Contexts** (all context files)
6. **Navigation** (AppNavigator.tsx)
7. **Screens** (start with WelcomeScreen.tsx)

### Step 3: Install Dependencies

In the Snack, add these dependencies:
```json
{
  "@expo/vector-icons": "^15.0.3",
  "@react-navigation/native": "^7.1.18",
  "@react-navigation/stack": "^7.5.0",
  "@react-navigation/bottom-tabs": "^7.5.0",
  "@supabase/supabase-js": "^2.76.1",
  "expo-constants": "^18.0.10",
  "react-native-safe-area-context": "^5.6.1",
  "react-native-screens": "^4.16.0"
}
```

### Step 4: Test Key Screens

Focus on testing these redesigned screens:
1. **Welcome Screen** - "ParentApp" branding with illustration card
2. **Login Screen** - "FamilyFlow" with social login buttons
3. **My Garden** - Mint green background with filter tabs
4. **Interactive Timeline** - Calendar navigation with insights

### Troubleshooting

If you encounter import errors:
1. **Remove unused imports** temporarily
2. **Comment out complex features** like Supabase calls
3. **Use mock data** for testing UI only
4. **Focus on one screen at a time**

### Alternative: Simplified Demo

If full setup is complex, create a single-screen demo:
1. Copy just the WelcomeScreen.tsx
2. Copy theme files
3. Copy Button and Card components
4. Create a simple App.js that just renders WelcomeScreen

This will let you see the redesigned UI immediately!