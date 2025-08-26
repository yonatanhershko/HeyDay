
/* eslint-disable react-native/no-unused-styles */
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { useTheme } from '../../styles/theme';
import TestPage from '../../components/screens/heyday/TestPage';
import { Platform, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { isRTL } from '../../i18n.config';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function HeydayIndex() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTheme()
  const styles = makeStyles(t);



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
        <TestPage />
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
