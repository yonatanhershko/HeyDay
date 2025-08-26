import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import HeyDayText from './Text/HeyDayText';
import config from '../../../config.json';

const AppVersion = () => {
  const { version } = Constants.expoConfig;
  return (
    <View style={styles.container}>
      <HeyDayText style={styles.text}>{version || 'N/A'} {config.env === 'dev' ||
        config.env === 'test' || config.env === 'test-edu' ? ` ${config.env}` : ''}</HeyDayText>
    </View>
  );

  //   return (
  //     <View style={styles.container}>
  //       {extra?.buildEnv === 'dev' ? (
  //         <>
  //           <HeyDayText style={styles.text}>Version: {version || 'N/A'}</HeyDayText>
  //           <HeyDayText style={styles.text}>Build Date: {extra?.buildDate || 'N/A'}</HeyDayText>
  //         </>
  //       ) : (
  //         <HeyDayText style={styles.text}>Version: {version || 'N/A'}</HeyDayText>
  //       )}
  //     </View>
  //   );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    bottom: 10,
    position: 'absolute',
    width: '100%',
  },
  text: {
    color: 'gray',
    fontSize: 12,
  },
});

export default AppVersion;
