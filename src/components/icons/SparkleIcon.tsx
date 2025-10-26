import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface SparkleIconProps {
  color?: string;
  size?: number;
}

const SparkleIcon: React.FC<SparkleIconProps> = ({ color = '#F4A5A5', size = 24 }) => {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        {/* Gemini-style sparkle star */}
        <Path
          d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
          fill={color}
        />
        <Path
          d="M18 6L18.5 8L20.5 8.5L18.5 9L18 11L17.5 9L15.5 8.5L17.5 8L18 6Z"
          fill={color}
          opacity={0.7}
        />
        <Path
          d="M6 16L6.5 17.5L8 18L6.5 18.5L6 20L5.5 18.5L4 18L5.5 17.5L6 16Z"
          fill={color}
          opacity={0.7}
        />
      </Svg>
    </View>
  );
};

export default SparkleIcon;
