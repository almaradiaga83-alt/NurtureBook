import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const dimensions = {
  screenWidth,
  screenHeight,
  isSmallScreen: screenWidth < 375,
  isMediumScreen: screenWidth >= 375 && screenWidth < 414,
  isLargeScreen: screenWidth >= 414,
};

export const getResponsiveSize = (small: number, medium: number, large: number) => {
  if (dimensions.isSmallScreen) return small;
  if (dimensions.isMediumScreen) return medium;
  return large;
};

export const getResponsivePadding = () => {
  return getResponsiveSize(12, 16, 20);
};

export const getResponsiveFontSize = (baseSize: number) => {
  const scale = getResponsiveSize(0.9, 1, 1.1);
  return Math.round(baseSize * scale);
};