import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface CheckIconProps {
  color?: string;
  size?: number;
}

const CheckIcon: React.FC<CheckIconProps> = ({ color = '#4CAF50', size = 24 }) => {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M20 6L9 17L4 12"
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default CheckIcon;
