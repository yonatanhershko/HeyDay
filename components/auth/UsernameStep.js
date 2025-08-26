import React from 'react';
import { View, StyleSheet, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useTheme } from '../../styles/theme';
import HeyDayText from '../general/low_level/Text/HeyDayText';
import i18n from '../../i18n.config';

export default function UsernameStep({ 
  username, 
  setUsername, 
  onSubmit, 
  isLoading, 
  error, 
  clearError 
}) {
  const t = useTheme();
  const styles = makeStyles(t);

  return (
    <View style={styles.stepContainer}>
      <View style={styles.headerContainer}>
        <HeyDayText style={styles.title}>
          {i18n.t('Login.usernameTitle', { defaultValue: 'Almost Done!' })}
        </HeyDayText>
        <HeyDayText style={styles.subtitle}>
          {i18n.t('Login.usernameSubtitle', { defaultValue: 'What should we call you?' })}
        </HeyDayText>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            error && styles.inputError
          ]}
          placeholder={i18n.t('Login.usernamePlaceholder', { defaultValue: 'Your name' })}
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          value={username}
          onChangeText={(text) => {
            // Allow letters, spaces, and common name characters, limit to 30 characters
            const cleanedText = text.replace(/[^a-zA-Z\u0590-\u05FF\s'-]/g, '');
            setUsername(cleanedText);
            if (error) clearError(); // Clear error when user starts typing
          }}
          maxLength={30}
          autoFocus
        />
        {error && (
          <HeyDayText style={styles.errorText}>
            {error}
          </HeyDayText>
        )}
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.primaryButton,
          pressed && { transform: [{ scale: 0.98 }] },
          isLoading && styles.disabledButton,
        ]}
        onPress={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <HeyDayText style={styles.primaryButtonText}>
            {i18n.t('Login.getStarted', { defaultValue: 'Get Started' })}
          </HeyDayText>
        )}
      </Pressable>
    </View>
  );
}

const makeStyles = t =>
  StyleSheet.create({
    stepContainer: {
      gap: 40,
    },
    headerContainer: {
      alignItems: 'center',
      gap: 12,
    },
    title: {
      color: t.colors.white,
      fontFamily: t.fontFamily.rubikBold,
      fontSize: t.fontSize.xxl,
      textAlign: 'center',
    },
    subtitle: {
      color: t.colors.white,
      fontFamily: t.fontFamily.rubikMedium,
      fontSize: t.fontSize.md,
      textAlign: 'center',
      opacity: 0.9,
    },
    inputContainer: {
      gap: 8,
    },
    input: {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 15,
      borderWidth: 1,
      color: t.colors.white,
      fontFamily: t.fontFamily.rubikMedium,
      fontSize: t.fontSize.md,
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    inputError: {
      borderColor: '#FF4444',
      borderWidth: 2,
      backgroundColor: 'rgba(255, 68, 68, 0.1)',
    },
    errorText: {
      color: '#FF4444',
      fontFamily: t.fontFamily.rubikMedium,
      fontSize: t.fontSize.sm,
      marginTop: 4,
      marginLeft: 4,
    },
    primaryButton: {
      alignItems: 'center',
      backgroundColor: t.colors.primaryAlt,
      borderBottomWidth: 4,
      borderColor: t.colors.greenBorder,
      borderLeftWidth: 2,
      borderRadius: 15,
      borderRightWidth: 2,
      borderTopWidth: 2,
      justifyContent: 'center',
      paddingVertical: 16,
    },
    disabledButton: {
      opacity: 0.7,
    },
    primaryButtonText: {
      color: t.colors.greenBorder,
      fontFamily: t.fontFamily.rubikBold,
      fontSize: t.fontSize.md,
    },
  });
