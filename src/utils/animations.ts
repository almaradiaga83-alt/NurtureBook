/**
 * Animation utilities for smooth UI interactions
 */

import { Animated, Easing } from 'react-native';

export const animations = {
  // Timing configurations
  timing: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  
  // Easing functions
  easing: {
    ease: Easing.ease,
    easeIn: Easing.in(Easing.ease),
    easeOut: Easing.out(Easing.ease),
    easeInOut: Easing.inOut(Easing.ease),
    spring: Easing.elastic(1),
  },
  
  // Common animation presets
  fadeIn: (animatedValue: Animated.Value, duration = 300) => {
    return Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      easing: Easing.ease,
      useNativeDriver: true,
    });
  },
  
  fadeOut: (animatedValue: Animated.Value, duration = 300) => {
    return Animated.timing(animatedValue, {
      toValue: 0,
      duration,
      easing: Easing.ease,
      useNativeDriver: true,
    });
  },
  
  slideUp: (animatedValue: Animated.Value, duration = 300) => {
    return Animated.timing(animatedValue, {
      toValue: 0,
      duration,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    });
  },
  
  slideDown: (animatedValue: Animated.Value, toValue = 100, duration = 300) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    });
  },
  
  scale: (animatedValue: Animated.Value, toValue = 1, duration = 200) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    });
  },
  
  spring: (animatedValue: Animated.Value, toValue = 1) => {
    return Animated.spring(animatedValue, {
      toValue,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    });
  },
};

