/* eslint-disable react-native/no-unused-styles */
import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import HeyDayText from '../../components/general/low_level/Text/HeyDayText';
import i18n, { isRTL } from '../../i18n.config';
import { useTheme } from '../../styles/theme';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

/**
 * Policy component that displays terms and privacy policy content
 * with placeholder text that matches the app's design.
 */
export default function Policy() {
  const router = useRouter();
  const t = useTheme();
  const styles = makeStyles(t);
  
  const handleGoBack = () => {
    router.back();
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        // colors={['#746FF4', '#5852F2']}
        colors={['#F8FAFC', '#F8FAFC']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <MaterialIcons name={isRTL ? "arrow-forward" : "arrow-back"} size={24} color="white" />
        </TouchableOpacity>
        <HeyDayText style={styles.title}>Terms & Privacy Policy</HeyDayText>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.contentContainer}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <HeyDayText style={styles.sectionTitle}>Terms of Service</HeyDayText>
            <HeyDayText style={styles.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur
              euismod, nisi velit ultricies nisi, vel consectetur euismod nisi velit ultricies nisi.
            </HeyDayText>
            
            <HeyDayText style={styles.paragraph}>
              Nullam euismod, nisi vel consectetur euismod, nisi velit ultricies nisi, vel consectetur
              euismod nisi velit ultricies nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </HeyDayText>
            
            <HeyDayText style={styles.bulletTitle}>1. Acceptance of Terms</HeyDayText>
            <HeyDayText style={styles.bulletText}>
              • By accessing or using our application, you agree to these terms.
            </HeyDayText>
            <HeyDayText style={styles.bulletText}>
              • If you do not agree with any part of these terms, you may not use our application.
            </HeyDayText>
            
            <HeyDayText style={styles.bulletTitle}>2. User Accounts</HeyDayText>
            <HeyDayText style={styles.bulletText}>
              • You are responsible for maintaining the confidentiality of your account.
            </HeyDayText>
            <HeyDayText style={styles.bulletText}>
              • You are responsible for all activities under your account.
            </HeyDayText>
          </View>
          
          <View style={styles.section}>
            <HeyDayText style={styles.sectionTitle}>Privacy Policy</HeyDayText>
            <HeyDayText style={styles.paragraph}>
              Nullam euismod, nisi vel consectetur euismod, nisi velit ultricies nisi, vel consectetur
              euismod nisi velit ultricies nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </HeyDayText>
            
            <HeyDayText style={styles.bulletTitle}>1. Information We Collect</HeyDayText>
            <HeyDayText style={styles.bulletText}>
              • Personal Information: Name, email address, phone number.
            </HeyDayText>
            <HeyDayText style={styles.bulletText}>
              • Usage Information: How you use our application.
            </HeyDayText>
            
            <HeyDayText style={styles.bulletTitle}>2. How We Use Your Information</HeyDayText>
            <HeyDayText style={styles.bulletText}>
              • To provide and maintain our service.
            </HeyDayText>
            <HeyDayText style={styles.bulletText}>
              • To notify you about changes to our service.
            </HeyDayText>
            <HeyDayText style={styles.bulletText}>
              • To provide customer support.
            </HeyDayText>
          </View>
          
          <View style={styles.section}>
            <HeyDayText style={styles.sectionTitle}>Data Security</HeyDayText>
            <HeyDayText style={styles.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur
              euismod, nisi velit ultricies nisi, vel consectetur euismod nisi velit ultricies nisi.
            </HeyDayText>
            <HeyDayText style={styles.paragraph}>
              Nullam euismod, nisi vel consectetur euismod, nisi velit ultricies nisi, vel consectetur
              euismod nisi velit ultricies nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </HeyDayText>
          </View>
          
          <View style={styles.section}>
            <HeyDayText style={styles.sectionTitle}>Contact Us</HeyDayText>
            <HeyDayText style={styles.paragraph}>
              If you have any questions about these terms or privacy policy, please contact us at:
            </HeyDayText>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const makeStyles = (t) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    header: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: 'white',
      fontSize: 20,
      fontFamily: t.fontFamily.rubikMedium,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 20,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 30,
    },
    section: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 10,
      padding: 16,
      marginBottom: 16,
    },
    sectionTitle: {
      color: 'white',
      fontSize: 18,
      fontFamily: t.fontFamily.rubikMedium,
      marginBottom: 12,
    },
    paragraph: {
      color: 'white',
      fontSize: 16,
      fontFamily: t.fontFamily.rubikRegular,
      marginBottom: 12,
      lineHeight: 24,
    },
    bulletTitle: {
      color: 'white',
      fontSize: 16,
      fontFamily: t.fontFamily.rubikMedium,
      marginTop: 12,
      marginBottom: 8,
    },
    bulletText: {
      color: 'white',
      fontSize: 16,
      fontFamily: t.fontFamily.rubikRegular,
      marginBottom: 4,
      paddingLeft: 10,
      lineHeight: 24,
    },
    contactInfo: {
      color: 'white',
      fontSize: 16,
      fontFamily: t.fontFamily.rubikMedium,
      marginTop: 6,
      textAlign: 'center',
    },
  });
