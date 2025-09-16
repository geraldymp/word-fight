// lib/ads/config.ts
import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

// Replace with your real Rewarded Ad Unit IDs when ready
const REAL_ANDROID = process.env.ADMOB_APPID;
const REAL_IOS = process.env.ADMOB_APPID;

export const REWARDED_UNIT_ID = __DEV__
  ? TestIds.REWARDED
  : Platform.select({
      android: REAL_ANDROID,
      ios: REAL_IOS,
      default: REAL_ANDROID
    })!;
