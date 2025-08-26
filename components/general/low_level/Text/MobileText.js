import React from 'react';
import { Text } from 'react-native';

const MobileText = props => {
  // Ensure props.style is a valid array of objects
  const resolvedStyle = Array.isArray(props.style)
    ? props.style.filter(style => style && typeof style === 'object') // Filter invalid entries
    : props.style && typeof props.style === 'object'
      ? [props.style] // Wrap single object in an array
      : []; // Default to an empty array for invalid/missing styles

  return (
    <Text
      {...props}
      maxFontSizeMultiplier={1.2}
      style={[
        { textAlign: 'left' }, // Default styles
        ...resolvedStyle, // Additional styles
      ]}
    >
      {props.children}
    </Text>
  );
};

export default MobileText;
