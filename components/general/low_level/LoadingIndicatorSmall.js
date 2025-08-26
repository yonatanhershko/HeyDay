/* eslint-disable react-native/no-unused-styles */
// LoadingIndicator.js
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../../../styles/theme';

export default function LoadingIndicator () {
  const t = useTheme();
  const styles = makeStyles(t);
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator
        size="small"
        color={t.colors.primaryAlt}
      />
    </View>
  );
}

const makeStyles = t =>
  StyleSheet.create({
    loadingContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
  });
