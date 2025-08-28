/* eslint-disable react-native/no-unused-styles */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../styles/theme.js';
// import { useUserStore } from '../../../contexts/store/UserStore.js';
// import i18n from '../../../i18n.config.js';
import HeyDayText from '../../components/general/low_level/Text/HeyDayText.js';

export default function TestPage () {
  const router = useRouter();
  // const name = useUserStore(state => state.userInfo?.first_name);

  const t = useTheme();
  const styles = makeStyles(t);

  return (
    <View>
      <HeyDayText>greadft page </HeyDayText>
    </View>
  );
}

const makeStyles = t =>
  StyleSheet.create({
   
  });
