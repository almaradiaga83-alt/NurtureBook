# NurtureBook - Parenting Companion App

A cross-platform mobile application built with React Native and TypeScript, designed to help parents manage their family's daily activities, track moods, and organize chores with a rewarding points system.

## Features

### 🏠 **Parent Journals**
- Create and manage daily journal entries
- Track moods with emoji selection (calm, happy, tired, sad, excited)
- Interactive timeline view with chronological entries
- AI-powered insights based on mood patterns (mock implementation)

### 👨‍👩‍👧‍👦 **Family Organizer**
- Garden-themed chores management system
- Points-based reward system for children
- Progress tracking with visual progress bars
- Family member profiles and assignments

### 🌍 **Localization**
- English and Spanish language support
- Dynamic language switching
- Comprehensive translation coverage

### 🎨 **Modern UI/UX**
- Minimalist, clean design with dark green pastel primary colors
- Pastel pink secondary accents
- Light/dark theme support
- Responsive and accessible interface

## Screens

1. **Welcome Screen** - App introduction with feature highlights
2. **Login/Signup Screen** - Authentication with guest mode for demo
3. **Journal Dashboard** - Main timeline view with entries and insights
4. **New Journal Entry** - Create entries with mood selection
5. **AI Insights** - AI-generated insights based on journal patterns
6. **Chores List** - Garden-themed family task management
7. **Child Profile** - Individual child dashboard with points
8. **Parent Profile** - Parent settings and profile management
9. **Settings** - App preferences and configuration

## Tech Stack

- **React Native** 0.82.1 with TypeScript
- **React Navigation** for navigation (Stack + Bottom Tabs)
- **AsyncStorage** for local data persistence
- **React Context** for state management
- **Vector Icons** for UI icons
- **Custom Theme System** with design tokens

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Button, Card, Input, etc.
│   ├── journal/        # Journal-specific components
│   └── chores/         # Chores-specific components
├── contexts/           # React Context providers
├── navigation/         # Navigation configuration
├── screens/           # All screen components
├── services/          # Mock data and utilities
├── theme/             # Design system and tokens
├── types/             # TypeScript type definitions
└── utils/             # Helper functions
```

## Setup Instructions

### Prerequisites
- Node.js (v20.18.1 or higher)
- React Native CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd NurtureBook
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup for Testing:**

   **Option A: Expo Go (Easiest - Recommended)**
   ```bash
   ./setup-expo.sh
   # Then install Expo Go app on your iPhone
   ```
   
   **Option B: iOS Native (macOS only)**
   ```bash
   ./setup-ios.sh
   # Or manually:
   # 1. Install Xcode from App Store
   # 2. sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
   # 3. sudo xcodebuild -license accept
   # 4. sudo gem install cocoapods
   # 5. cd ios && pod install && cd ..
   ```
   
   **Test your setup:**
   ```bash
   ./test-setup.sh
   ```

4. **Run the app:**

   **Option A: Expo Go (Recommended for testing)**
   ```bash
   # Install Expo Go app on your iPhone from App Store
   npm run expo
   # Scan QR code with iPhone camera or Expo Go app
   ```
   
   **Option B: Native iOS/Android**
   ```bash
   # iOS (requires Xcode setup)
   npm run ios
   
   # Android (requires Android Studio setup)
   npm run android
   ```

## Testing Guide

### Demo Mode Testing

1. **Launch the app** and you'll see the Welcome screen
2. **Tap "Continue as Guest"** to enter demo mode with pre-populated data
3. **Explore the features:**

   **Journal Features:**
   - View the timeline with sample entries
   - Tap "+" to add a new journal entry
   - Select a mood and write about your day
   - Navigate to AI Insights to see mock insights

   **Family Features:**
   - Switch to Family tab to see the garden-themed chores
   - Complete chores by tapping the plant icons
   - View child profiles to see points and progress
   - Filter chores by family member

   **Profile Features:**
   - Switch to Profile tab
   - Edit parent profile information
   - Change language between English and Spanish
   - Access settings for app preferences

### Sample Data

The app comes pre-loaded with:
- 1 parent profile (Alex Doe)
- 2 children (Alex Johnson, age 8; Sarah Johnson, age 6)
- 5 sample journal entries with different moods
- 5 sample chores assigned to different children
- 3 AI insights for demonstration

## Architecture Overview

### State Management
- **AuthContext**: User authentication and session management
- **JournalContext**: Journal entries CRUD operations
- **ChoresContext**: Chores and children management with points system
- **ThemeContext**: Light/dark theme switching
- **LocaleContext**: Language switching and translations

### Data Persistence
- All data stored locally using AsyncStorage
- Mock data service provides demo content
- No external API calls or database connections

### Navigation Structure
```
Root Stack Navigator
├── Welcome Screen
├── Login Screen
└── Main App (Tab Navigator)
    ├── Journal Tab (Stack)
    │   ├── Journal Dashboard
    │   ├── New Journal Entry
    │   └── AI Insights
    ├── Family Tab (Stack)
    │   ├── Chores List
    │   └── Child Profile
    └── Profile Tab (Stack)
        ├── Parent Profile
        └── Settings
```

## Future Supabase Integration

The app is designed with future backend integration in mind:

- **Storage Service**: Currently uses AsyncStorage, ready to be replaced with Supabase client
- **Authentication**: Mock auth system can be replaced with Supabase Auth
- **Data Models**: TypeScript interfaces are designed to match Supabase schema
- **Context Providers**: Can be updated to use Supabase real-time subscriptions

### Integration Points
- `src/services/storage.ts` - Replace with Supabase client calls
- `src/contexts/AuthContext.tsx` - Integrate Supabase Auth
- `src/services/aiInsights.ts` - Connect to AI service API
- Mock data in `src/services/mockData.ts` - Replace with database queries

## Code Quality Standards

- **TypeScript Strict Mode**: All components and functions are fully typed
- **Extensive Comments**: Every component, function, and complex logic is documented
- **Component Separation**: UI components are modular and reusable
- **Service Layer**: All data operations are abstracted into service files
- **Error Handling**: Comprehensive error handling throughout the app

## Dependencies

### Core Dependencies
- `@react-navigation/native` - Navigation framework
- `@react-navigation/stack` - Stack navigation
- `@react-navigation/bottom-tabs` - Tab navigation
- `@react-native-async-storage/async-storage` - Local storage
- `react-native-vector-icons` - Icon library
- `react-native-svg` - SVG support

### Development Dependencies
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting

## Contributing

1. Follow the established code structure and naming conventions
2. Add comprehensive comments for new features
3. Ensure all new components are properly typed
4. Test thoroughly on both iOS and Android platforms
5. Update documentation for any new features

## License

This project is created for demonstration purposes. Please ensure proper licensing for production use.

---

**Note**: This is a demo application using mock data only. All features are functional but do not connect to external services. The app demonstrates a complete React Native application with modern architecture and best practices.