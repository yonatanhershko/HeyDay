/* eslint-disable react-native/no-unused-styles */
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../../styles/theme';

export default function LoadingIndicator ({ style }) {
  const t = useTheme();
  const styles = makeStyles(t);
  return (
    <View style={[styles.loadingContainer, style]}>
      <ActivityIndicator
        size="large"
        color={t.colors.primaryAlt}
      />
    </View>
  );
}

const makeStyles = t =>
  StyleSheet.create({
    loadingContainer: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      marginTop: 20,
    },
  });
