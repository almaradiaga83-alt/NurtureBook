/**
 * Navigation configuration for NurtureBook app
 * Stack and Tab navigation setup
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import screens (will be created)
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import JournalDashboardScreen from '../screens/JournalDashboardScreen';
import NewJournalEntryScreen from '../screens/NewJournalEntryScreen';
import AIInsightsScreen from '../screens/AIInsightsScreen';
import ChoresListScreen from '../screens/ChoresListScreen';
import ChildProfileScreen from '../screens/ChildProfileScreen';
import ParentProfileScreen from '../screens/ParentProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Import types
import {
  RootStackParamList,
  MainTabParamList,
  JournalStackParamList,
  FamilyStackParamList,
  ProfileStackParamList,
} from '../types';

// Create navigators
const RootStack = createStackNavigator<RootStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const JournalStack = createStackNavigator<JournalStackParamList>();
const FamilyStack = createStackNavigator<FamilyStackParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();

// Journal Stack Navigator
const JournalStackNavigator = () => {
  return (
    <JournalStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6a9987', // Light green pastel background
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <JournalStack.Screen
        name="JournalDashboard"
        component={JournalDashboardScreen}
        options={{ title: 'Interactive Timeline' }}
      />
      <JournalStack.Screen
        name="NewJournalEntry"
        component={NewJournalEntryScreen}
        options={{ title: 'New Entry' }}
      />
      <JournalStack.Screen
        name="AIInsights"
        component={AIInsightsScreen}
        options={{ title: 'Weekly Insights' }}
      />
    </JournalStack.Navigator>
  );
};

// Family Stack Navigator
const FamilyStackNavigator = () => {
  return (
    <FamilyStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6a9987', // Light green pastel background
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <FamilyStack.Screen
        name="ChoresList"
        component={ChoresListScreen}
        options={{ title: 'My Garden' }}
      />
      <FamilyStack.Screen
        name="ChildProfile"
        component={ChildProfileScreen}
        options={{ title: 'Dashboard' }}
      />
    </FamilyStack.Navigator>
  );
};

// Profile Stack Navigator
const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6a9987', // Light green pastel background
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <ProfileStack.Screen
        name="ParentProfile"
        component={ParentProfileScreen}
        options={{ title: 'Parenting Dashboard' }}
      />
      <ProfileStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </ProfileStack.Navigator>
  );
};

// Main Tab Navigator
const getTabBarIcon = (routeName: string, color: string, size: number) => {
  let iconName: string;

  if (routeName === 'Journal') {
    iconName = 'edit_calendar';
  } else if (routeName === 'Family') {
    iconName = 'checklist';
  } else if (routeName === 'Profile') {
    iconName = 'person';
  } else {
    iconName = 'help';
  }

  return <Icon name={iconName} size={size} color={color} />;
};

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => getTabBarIcon(route.name, color, size),
        tabBarActiveTintColor: '#3b5249', // Dark green pastel
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e0e0e0',
        },
        headerShown: false,
      })}
    >
      <MainTab.Screen name="Journal" component={JournalStackNavigator} />
      <MainTab.Screen name="Family" component={FamilyStackNavigator} />
      <MainTab.Screen name="Profile" component={ProfileStackNavigator} />
    </MainTab.Navigator>
  );
};

// Root Stack Navigator
const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="Welcome" component={WelcomeScreen} />
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="MainApp" component={MainTabNavigator} />
    </RootStack.Navigator>
  );
};

// Main Navigation Container
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
