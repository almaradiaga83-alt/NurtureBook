import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

interface PlantIconProps {
  color?: string;
  size?: number;
}

const PlantIcon: React.FC<PlantIconProps> = ({ color = '#F4A5A5', size = 24 }) => {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        {/* Stem */}
        <Path
          d="M12 22V12"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
        />
        {/* Left leaf */}
        <Path
          d="M12 12C12 12 8 10 6 8C4 6 4 4 4 4C4 4 6 4 8 6C10 8 12 12 12 12Z"
          fill={color}
          opacity={0.7}
        />
        {/* Right leaf */}
        <Path
          d="M12 12C12 12 16 10 18 8C20 6 20 4 20 4C20 4 18 4 16 6C14 8 12 12 12 12Z"
          fill={color}
        />
        {/* Soil */}
        <Path
          d="M6 22H18"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};

export default PlantIcon;
