
/* eslint-disable react-native/no-unused-styles */
import { usePathname, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../styles/theme';
import { Platform, SafeAreaView, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { isRTL } from '../../i18n.config';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useUserStore } from '../../contexts/store/UserStore';
import BottomNavMain from '@/components/bottomNavs/bottomNavMain';
import OnboardingPage from '@/components/screens/heyday/OnboardingPage';
import TestPage from './TestPage';
import HeyDayText from '@/components/general/low_level/Text/HeyDayText';


export default function HeydayIndex() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTheme();
  const styles = makeStyles(t);
  
  // Get user store state and actions
  const { 
    User, 
    onboardingCompleted, 
    authLoading,
    setUser,
    setOnboardingCompleted,
    setAuthLoading,
    setLoggedIn
  } = useUserStore();

  useEffect(() => {
    // Simulate auth state check with console logs instead of Firebase
    console.log('🔐 Simulating auth state check...');
    
    // Simulate a logged in user for testing
    const mockUser = { uid: 'mock-user-123', email: 'test@example.com' };
    console.log('👤 Mock user logged in:', mockUser.uid);
    
    setUser(mockUser);
    setLoggedIn(true);
    
    // Simulate checking onboarding status
    console.log('⏳ Checking onboarding status...');
    // For now, let's assume onboarding is not completed to test the flow
    setOnboardingCompleted(false);
    console.log('📝 Onboarding status: not completed');
    
    setAuthLoading(false);
    console.log('✅ Auth simulation complete');
  }, []);

  // Show loading screen while checking auth
  if (authLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#ffff', '#5852F2']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="white" />
          <HeyDayText style={styles.loadingText}>Loading...</HeyDayText>
        </View>
      </SafeAreaView>
    );
  }

  // Determine which component to render
  const renderContent = () => {
    if (!User) {
      // No user logged in - show onboarding
      console.log('👤 No user logged in - showing onboarding');
      return <OnboardingPage />;
    }
    
    if (!onboardingCompleted) {
      // User logged in but hasn't completed onboarding
      console.log('⏳ User logged in but onboarding not completed');
      return <OnboardingPage />;
    }
    
    // User logged in and onboarding completed - show main app
    console.log('🎉 User ready - showing main app');
    return <TestPage />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#ffff', '#5852F2']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.goBackContainer}>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <MaterialIcons name="settings" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {renderContent()}
        {/* <BottomNavMain /> */}
      </View>
    </SafeAreaView>
  );
}

const makeStyles = t =>
  StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      flex: 1,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: 'white',
      fontWeight: '500',
    },
    contentContainer: {
      flex: 1,
      position: 'relative',
      width: '100%',
    },
    goBackContainer: {
      alignItems: Platform.OS === 'web' ? (isRTL ? 'flex-end' : 'flex-start') : (isRTL ? 'flex-end' : 'flex-start'),
      padding: 20,
      paddingBottom: 0,
    },
  });
