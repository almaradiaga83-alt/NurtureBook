/**
 * New Journal Entry Screen
 * Create and save new journal entries with mood selection
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { JournalStackParamList, MoodType } from '../types';
import { colors, typography, spacing } from '../theme';
import Button from '../components/common/Button';
import { useJournal } from '../contexts/JournalContext';
import { useLocale } from '../contexts/LocaleContext';
import { moodEmojis } from '../constants/moods';

type NewJournalEntryNavigationProp = StackNavigationProp<JournalStackParamList, 'NewJournalEntry'>;

interface Props {
  navigation: NewJournalEntryNavigationProp;
}

const NewJournalEntryScreen: React.FC<Props> = ({ navigation }) => {
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<MoodType>('happy');
  const [isSaving, setIsSaving] = useState(false);

  const { addEntry } = useJournal();
  const { t } = useLocale();

  const moods: MoodType[] = ['calm', 'happy', 'tired', 'sad', 'excited'];

  const handleSave = async () => {
    if (!content.trim()) {
      return;
    }

    setIsSaving(true);
    try {
      await addEntry(content.trim(), selectedMood);
      navigation.goBack();
    } catch (error) {
      console.error('Error saving journal entry:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).toUpperCase();
  };

  const formatTime = () => {
    const now = new Date();
    const weekday = now.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
    const time = now.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).toUpperCase();
    return `${weekday}, ${time}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background.light} />
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{formatDate()}</Text>
            <Text style={styles.timeText}>{formatTime()}</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        {/* Main content */}
        <View style={styles.content}>
          <TextInput
            style={styles.textInput}
            value={content}
            onChangeText={setContent}
            placeholder={t('entry.writeAboutDay')}
            placeholderTextColor={colors.text.muted}
            multiline
            textAlignVertical="top"
            autoFocus
          />
        </View>

        {/* Mood selector */}
        <View style={styles.moodContainer}>
          <View style={styles.moodSelector}>
            {moods.map((mood) => (
              <TouchableOpacity
                key={mood}
                style={[
                  styles.moodButton,
                  selectedMood === mood && styles.moodButtonSelected
                ]}
                onPress={() => setSelectedMood(mood)}
              >
                <Text style={styles.moodEmoji}>{moodEmojis[mood]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Footer with save button */}
        <View style={styles.footer}>
          <Button
            title={t('entry.saveEntry')}
            onPress={handleSave}
            variant="primary"
            size="large"
            loading={isSaving}
            disabled={!content.trim()}
            style={styles.saveButton}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 20,
    color: colors.text.muted,
  },
  dateContainer: {
    alignItems: 'center',
  },
  dateText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.secondary,
    fontFamily: typography.fontFamily.serif,
  },
  timeText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.muted,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  textInput: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.primary,
    color: colors.text.primary,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    textAlignVertical: 'top',
  },
  moodContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  moodSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  moodButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  moodButtonSelected: {
    backgroundColor: colors.secondary.main,
    borderWidth: 4,
    borderColor: colors.secondary.light,
  },
  moodEmoji: {
    fontSize: 32,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    backgroundColor: colors.background.light,
  },
  saveButton: {
    backgroundColor: colors.primary.main,
    borderRadius: 25,
  },
});

export default NewJournalEntryScreen;
