import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import HeyDayText from './Text/HeyDayText';

const MoodOption = ({ img, label, onPress, isSelected }) => {
  return (
    <TouchableOpacity 
      style={[styles.container, isSelected && styles.selected]} 
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        {img}
      </View>
      <HeyDayText style={styles.label}>{label}</HeyDayText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    padding: 12,
  },
  selected: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E8',
  },
  imageContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
});

export default MoodOption;
