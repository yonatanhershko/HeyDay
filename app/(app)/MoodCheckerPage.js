/* eslint-disable react-native/no-unused-styles */
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../styles/theme.js';
import { useUserStore } from '../../contexts/store/UserStore.js';
import { useMoodStore } from '../../contexts/store/MoodStore.js';
import HeyDayText from '../../components/general/low_level/Text/HeyDayText.js';
import MoodOption from '../../components/general/low_level/MoodOption.js';

const MOOD_OPTIONS = [
  { id: '1', label: 'Awful', emoji: '😢' },
  { id: '2', label: 'Bad', emoji: '😟' },
  { id: '3', label: 'Okay', emoji: '😐' },
  { id: '4', label: 'Good', emoji: '😊' },
  { id: '5', label: 'Amazing', emoji: '😍' },
];

export default function MoodCheckerPage() {
  const router = useRouter();
  const t = useTheme();
  const styles = makeStyles(t);
  
  const { userInfo } = useUserStore();
  const { 
    selectedMood, 
    moodNote, 
    isSubmitting,
    setSelectedMood, 
    setMoodNote, 
    submitMoodEntry,
    resetForm
  } = useMoodStore();

  const handleMoodSelect = (moodId) => {
    setSelectedMood(moodId);
  };

  const handleSave = async () => {
    if (!selectedMood) {
      Alert.alert('Please select a mood', 'Choose how you\'re feeling before saving.');
      return;
    }

    if (!userInfo?.userId) {
      Alert.alert('Error', 'User not found. Please try again.');
      return;
    }

    try {
      await submitMoodEntry(userInfo.userId);
      Alert.alert('Success!', 'Your mood has been saved.', [
        { text: 'OK', onPress: () => resetForm() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save mood. Please try again.');
    }
  };

  const renderMoodOption = (mood) => (
    <MoodOption
      key={mood.id}
      img={<HeyDayText style={styles.emoji}>{mood.emoji}</HeyDayText>}
      label={mood.label}
      onPress={() => handleMoodSelect(mood.id)}
      isSelected={selectedMood === mood.id}
    />
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <MaterialIcons name="close" size={24} color="#333" />
        </TouchableOpacity>
        <HeyDayText style={styles.title}>How are you feeling?</HeyDayText>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Mood Options Grid */}
        <View style={styles.moodGrid}>
          <View style={styles.moodRow}>
            {renderMoodOption(MOOD_OPTIONS[0])}
            {renderMoodOption(MOOD_OPTIONS[1])}
          </View>
          <View style={styles.moodRow}>
            {renderMoodOption(MOOD_OPTIONS[2])}
            {renderMoodOption(MOOD_OPTIONS[3])}
          </View>
          <View style={styles.moodRowCenter}>
            {renderMoodOption(MOOD_OPTIONS[4])}
          </View>
        </View>

        {/* Text Input */}
        <View style={styles.noteSection}>
          <TextInput
            style={styles.textInput}
            placeholder="What's on your mind?"
            placeholderTextColor="#999"
            value={moodNote}
            onChangeText={setMoodNote}
            multiline
            maxLength={200}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          style={[styles.saveButton, (!selectedMood || isSubmitting) && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!selectedMood || isSubmitting}
        >
          <HeyDayText style={styles.saveButtonText}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </HeyDayText>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const makeStyles = t =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 20,
    },
    closeButton: {
      marginRight: 15,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: '#333',
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
    moodGrid: {
      alignItems: 'center',
      marginBottom: 40,
    },
    moodRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 16,
    },
    moodRowCenter: {
      alignItems: 'center',
    },
    emoji: {
      fontSize: 40,
    },
    noteSection: {
      marginBottom: 40,
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#E5E5E5',
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      minHeight: 100,
      textAlignVertical: 'top',
      backgroundColor: '#FAFAFA',
    },
    saveButton: {
      backgroundColor: '#4CAF50',
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      marginBottom: 40,
    },
    saveButtonDisabled: {
      backgroundColor: '#CCCCCC',
    },
    saveButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
  });
