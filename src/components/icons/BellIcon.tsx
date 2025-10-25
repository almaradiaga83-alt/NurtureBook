import React from 'react';
import { View, StyleSheet } from 'react-native';

interface BellIconProps {
  color?: string;
  size?: number;
}

const BellIcon: React.FC<BellIconProps> = ({ color = '#F4A5A5', size = 24 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.bellTop, { 
        width: size * 0.75, 
        height: size * 0.75,
        borderColor: color,
        borderTopLeftRadius: size * 0.375,
        borderTopRightRadius: size * 0.375,
      }]} />
      <View style={[styles.bellBottom, { 
        width: size * 0.9, 
        height: size * 0.15,
        backgroundColor: color,
      }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bellTop: {
    borderWidth: 2,
    borderBottomWidth: 0,
  },
  bellBottom: {
    borderRadius: 2,
  },
});

export default BellIcon;
