import React from 'react';
import { Platform } from 'react-native';
import WebText from './WebText.js';
import MobileText from './MobileText.js';

const HeyDayText = props => {
  if (Platform.OS === 'web') {
    return <WebText {...props} />;
  } else {
    return <MobileText {...props} />;
  }
};

export default HeyDayText;
