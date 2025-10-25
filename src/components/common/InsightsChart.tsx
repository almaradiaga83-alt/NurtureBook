/**
 * Insights Chart Component
 * Donut chart for timeline insights matching the design
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

const InsightsChart: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        {/* Outer ring - Orange */}
        <View style={styles.outerRing} />
        
        {/* Middle ring - Teal */}
        <View style={styles.middleRing} />
        
        {/* Inner ring - Green */}
        <View style={styles.innerRing} />
        
        {/* Center circle */}
        <View style={styles.centerCircle} />
        
        {/* Decorative dots */}
        <View style={[styles.dot, styles.dot1]} />
        <View style={[styles.dot, styles.dot2]} />
        <View style={[styles.dot, styles.dot3]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainer: {
    width: 120,
    height: 120,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ff9800', // Orange
    opacity: 0.8,
  },
  middleRing: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00bcd4', // Teal
    opacity: 0.9,
  },
  innerRing: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4caf50', // Green
  },
  centerCircle: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  dot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  dot1: {
    top: 20,
    right: 30,
  },
  dot2: {
    bottom: 25,
    left: 25,
  },
  dot3: {
    top: 45,
    left: 15,
  },
});

export default InsightsChart;