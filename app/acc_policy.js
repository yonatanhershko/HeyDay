/* eslint-disable react-native/no-unused-styles */
import React from 'react';
import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import HeyDayText from '../components/general/low_level/Text/HeyDayText';
import i18n from '../i18n.config';
import { useTheme } from '../styles/theme';

/**
 * AccPolicy component that displays the accessibility policy content.
 * The content is hardcoded into Text components for display.
 */
const AccPolicy = () => {
  const router = useRouter();
  const t = useTheme();
  const styles = makeStyles(t);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.card}>
          <HeyDayText style={styles.title}>{i18n.t('AccPolicy.title')}</HeyDayText>
          <ScrollView style={styles.scrollView}>
            <HeyDayText style={styles.subtitle}>{i18n.t('AccPolicy.subtitle')}</HeyDayText>

            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text1')}
            </HeyDayText>

            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text2')}
            </HeyDayText>

            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text3')}
            </HeyDayText>

            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text4')}
            </HeyDayText>

            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text5')}
            </HeyDayText>

            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text6')}
            </HeyDayText>

            <HeyDayText style={styles.paragraph}>
              {i18n.t('AccPolicy.howToEnable')}
            </HeyDayText>

            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text7')}
            </HeyDayText>

            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text8')}
            </HeyDayText>

            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text9')}
            </HeyDayText>

            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text10')}
            </HeyDayText>

            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text11')}
            </HeyDayText>

            <HeyDayText style={styles.paragraph}>
              {i18n.t('AccPolicy.improvements')}
            </HeyDayText>

            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text12')}
            </HeyDayText>
            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text13')}
            </HeyDayText>
            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text14')}
            </HeyDayText>
            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text15')}
            </HeyDayText>
            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text16')}
            </HeyDayText>
            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text17')}
            </HeyDayText>
            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text18')}
            </HeyDayText>

            <HeyDayText style={styles.paragraph}>
              {i18n.t('AccPolicy.functionality')}
            </HeyDayText>

            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text19')}
            </HeyDayText>
            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text20')}
            </HeyDayText>
            <HeyDayText style={styles.text}>{i18n.t('AccPolicy.text21')}</HeyDayText>
            <HeyDayText style={styles.text}>{i18n.t('AccPolicy.text22')}</HeyDayText>
            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text23')}
            </HeyDayText>
            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text24')}
            </HeyDayText>
            <HeyDayText style={styles.text}>{i18n.t('AccPolicy.text25')}</HeyDayText>
            <HeyDayText style={styles.text}>{i18n.t('AccPolicy.text26')}</HeyDayText>
            <HeyDayText style={styles.text}>{i18n.t('AccPolicy.text27')}</HeyDayText>
            <HeyDayText style={styles.text}>{i18n.t('AccPolicy.text28')}</HeyDayText>
            <HeyDayText style={styles.text}>{i18n.t('AccPolicy.text29')}</HeyDayText>

            <HeyDayText style={styles.paragraph}>{i18n.t('AccPolicy.exceptions')}</HeyDayText>

            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text30')}
            </HeyDayText>

            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text31')}
            </HeyDayText>

            <HeyDayText style={styles.paragraph}>
              {i18n.t('AccPolicy.contact')}
            </HeyDayText>

            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text32')}
            </HeyDayText>

            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text33')}
            </HeyDayText>
            <HeyDayText style={styles.text}>{i18n.t('AccPolicy.text34')}</HeyDayText>
            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text35')}
            </HeyDayText>
            <HeyDayText style={styles.text}>{i18n.t('AccPolicy.text36')}</HeyDayText>
            <HeyDayText style={styles.text}>{i18n.t('AccPolicy.text37')}</HeyDayText>
            <HeyDayText style={styles.text}>{i18n.t('AccPolicy.text38')}</HeyDayText>
            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text39')}
            </HeyDayText>

            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.text40')}
            </HeyDayText>

            <HeyDayText style={styles.text}>{i18n.t('AccPolicy.contactCoordinator')}</HeyDayText>
            <HeyDayText style={styles.text}>{i18n.t('AccPolicy.coordinatorName')}</HeyDayText>
            <HeyDayText style={{ marginBottom: 10, alignSelf: 'flex-start' }}>
              0543333422
            </HeyDayText>
        

            <HeyDayText style={styles.text}>
              {i18n.t('AccPolicy.updatedDate')}
            </HeyDayText>
          </ScrollView>
          <View style={styles.buttonsContainer}>
            <Pressable
              style={styles.button}
              onPress={() => router.push('/')}
            >
              <HeyDayText style={styles.buttonText}>{i18n.t('AccPolicy.backToHome')}</HeyDayText>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};
const makeStyles = t =>
  StyleSheet.create({
    button: {
      alignSelf: 'center',
      backgroundColor: t.colors.primaryAlt,
      borderRadius: 5,
      marginTop: 20,
      padding: 10,
      paddingHorizontal: 14,
    },
    buttonText: {
      color: t.colors.secondary,
      fontFamily: t.fontFamily.rubikMedium,
      fontSize: t.fontSize.base,
    },
    buttonsContainer: {
      alignSelf: 'center',
      flexDirection: 'row',

    },
    cancelButton: {
      alignSelf: 'center',
      borderRadius: 5,
      marginTop: 20,
      padding: 10,
    },
    cancelButtonText: {
      color: t.colors.textPrimary,
      fontFamily: t.fontFamily.rubikRegular,
      fontSize: t.fontSize.base,
    },
    card: {
      backgroundColor: t.colors.white,
      borderColor: t.colors.border,
      borderRadius: 8,
      borderWidth: 1,
      elevation: 5,
      padding: 30,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      width: '100%',
    },
    container: {
      alignItems: 'center',
      backgroundColor: t.colors.greyExstraLight,
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    paragraph: {
      color: t.colors.textPrimary,
      fontFamily: t.fontFamily.rubikRegular,
      fontSize: t.fontSize.base,
      fontWeight: 'bold',
      marginBottom: 10,
      paddingHorizontal: 3,
    },
    scrollView: {
      maxHeight: 400,
    },
    subtitle: {
      color: t.colors.textPrimary,
      fontFamily: t.fontFamily.rubikBold,
      fontSize: t.fontSize.md,
      marginBottom: 10,
      paddingHorizontal: 3,
    },
    text: {
      color: t.colors.textPrimary,
      fontFamily: t.fontFamily.rubikRegular,
      marginBottom: 10,
      paddingHorizontal: 3,
    },
    title: {
      color: t.colors.textPrimary,
      fontFamily: t.fontFamily.rubikExstraBold,
      fontSize: t.fontSize.xl,
      marginBottom: 20,
      textAlign: 'center',
    },
  });

export default AccPolicy;
