import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const BASE_WIDTH = 375; // iPhone 11-ish
const BASE_HEIGHT = 812;

// widths/heights, spacing horizontally (images, icons, buttons)
export function scale(size: number) {
  return (SCREEN_WIDTH / BASE_WIDTH) * size;
}

// padding, spacing vertically.
export function verticalScale(size: number) {
  return (SCREEN_HEIGHT / BASE_HEIGHT) * size;
}

// fonts & corner radius
export function moderateScale(size: number, factor: number = 0.5) {
  return size + (scale(size) - size) * factor;
}
