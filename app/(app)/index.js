/* eslint-disable react-native/no-unused-styles */
import { usePathname, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../styles/theme';
import { Platform, SafeAreaView, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { isRTL } from '../../i18n.config';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useUserStore } from '../../contexts/store/UserStore';
// import BottomNavMain from '@/components/bottomNavs/bottomNavMain';
import OnboardingPage from '@/components/screens/heyday/OnboardingPage';
import MoodCheckerPage from './MoodCheckerPage';
import HeyDayText from '@/components/general/low_level/Text/HeyDayText';


export default function HeydayIndex() {
  const router = useRouter();
  // const pathname = usePathname();
  const t = useTheme();
  const styles = makeStyles(t);
  
  // Get user store state and actions
  const { 
    User, 
    onboardingCompleted, 
    authLoading,
    setAuthLoading,
  } = useUserStore();

  useEffect(() => {
    // Initialize auth loading state to false when app starts
    setAuthLoading(false);
  }, []);

  // Show loading screen while checking auth
  if (authLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
        colors={['#F8FAFC', '#F8FAFC']}
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
    // If onboarding is completed (from AsyncStorage), skip directly to TestPage
    if (onboardingCompleted) {
      return <MoodCheckerPage />;
    }
    
    if (!User) {
      // No user logged in - show onboarding
      return <OnboardingPage />;
    }
    
    // User logged in but hasn't completed onboarding
    return <OnboardingPage />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        // colors={['#ffff', '#5852F2']}
        colors={['#F8FAFC', '#F8FAFC']}
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
      fontFamily: t.fontFamily.rubikMedium,
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
