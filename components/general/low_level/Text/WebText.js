import React from 'react';
import { Text as RNText } from 'react-native';
import { isRTL } from '../../../../i18n.config';

const WebText = props => {
  return <RNText dir={isRTL ? 'rtl' : 'ltr'} {...props}  />;
};

export default WebText;
