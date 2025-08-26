/* eslint-disable react-native/no-unused-styles */
import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '../styles/theme';
import { useUserStore } from '../contexts/store/UserStore';
import UsernameStep from '../components/auth/UsernameStep';

const STEPS = {
  USERNAME: 'username',
};

export default function LoginPage() {
  const router = useRouter();
  const t = useTheme();
  const styles = makeStyles(t);

  const { loginUser } = useUserStore();

  // Animation setup
  const slideAnim = useRef(new Animated.Value(300)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the animation when component mounts
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [slideAnim, opacityAnim]);

  // Reset auth flow when component mounts
  useEffect(() => {
    resetAuthFlow();
  }, [resetAuthFlow]);

  // Handle phone submission
  const onPhoneSubmit = async () => {
    clearError();
    const success = await handlePhoneSubmit();
    if (!success && error) {
      Alert.alert('Error', error);
    }
  };

  // Handle OTP submission
  const onOTPSubmit = async () => {
    clearError();
    const result = await handleOTPSubmit();
    if (result?.success) {
      if (result.isExistingUser) {
        // Existing user - login successful
        loginUser({
          first_name: 'User', // This would come from your API in real implementation
        });
        Alert.alert('Welcome back!', 'Login successful', [
          { text: 'OK', onPress: () => router.push('/') }
        ]);
      }
      // For new users, the store will handle moving to username step
    } else if (error) {
      Alert.alert('Error', error);
    }
  };

  // Handle username submission
  const onUsernameSubmit = async () => {
    clearError();
    const success = await handleUsernameSubmit();
    if (success) {
      loginUser({
        first_name: username,
      });
      Alert.alert('Welcome!', 'Account created successfully', [
        { text: 'OK', onPress: () => router.push('/') }
      ]);
    } else if (error) {
      Alert.alert('Error', error);
    }
  };

  const renderUsernameStep = () => (
    <UsernameStep
      username={username}
      setUsername={setUsername}
      onSubmit={onUsernameSubmit}
      isLoading={isLoading}
      error={error}
      clearError={clearError}
    />
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case STEPS.USERNAME:
        return renderUsernameStep();
      default:
        return renderUsernameStep();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#746FF4', '#5852F2']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={styles.backButtonContainer}>
        <Pressable onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </Pressable>
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Animated.View
          style={[
            styles.contentContainer,
            {
              transform: [{ translateY: slideAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          {renderCurrentStep()}
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const makeStyles = t =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    backButtonContainer: {
      padding: 20,
      paddingBottom: 0,
    },
    keyboardContainer: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 30,
    },
  });
