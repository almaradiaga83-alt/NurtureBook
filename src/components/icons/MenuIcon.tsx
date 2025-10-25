import React from 'react';
import { View, StyleSheet } from 'react-native';

interface MenuIconProps {
  color?: string;
  size?: number;
}

const MenuIcon: React.FC<MenuIconProps> = ({ color = '#F4A5A5', size = 24 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.line, { backgroundColor: color, width: size * 0.83 }]} />
      <View style={[styles.line, { backgroundColor: color, width: size * 0.83 }]} />
      <View style={[styles.line, { backgroundColor: color, width: size * 0.83 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  line: {
    height: 2,
    borderRadius: 1,
  },
});

export default MenuIcon;
