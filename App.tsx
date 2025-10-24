/**
 * Main App component
 * Root component with all providers and navigation
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { JournalProvider } from './src/contexts/JournalContext';
import { ChoresProvider } from './src/contexts/ChoresContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { LocaleProvider } from './src/contexts/LocaleContext';
import { colors } from './src/theme';

const App: React.FC = () => {
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