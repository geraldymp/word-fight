// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: 'Word Fight',
    slug: 'word-fight',
    version: '1.0.21',
    orientation: 'portrait',
    icon: './assets/word_fight_logo.png',
    scheme: 'wordfight',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.germp24.wordfight'
    },
    android: {
      versionCode: 21,
      package: 'com.germp24.wordfight',
      adaptiveIcon: {
        foregroundImage: './assets/word_fight_logo.png',
        backgroundColor: '#ffffff'
      },
      edgeToEdgeEnabled: true,
      blockedPermissions: ['android.permission.RECORD_AUDIO'],
      permissions: ['com.android.vending.BILLING']
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png'
    },
    plugins: [
      'expo-router',
      'expo-asset',
      'expo-web-browser',
      [
        'expo-splash-screen',
        {
          backgroundColor: '#AC1E23',
          image: './assets/word_fight_logo.png',
          dark: {
            image: './assets/word_fight_logo.png',
            backgroundColor: '#AC1E23'
          },
          imageWidth: 200
        }
      ],
      [
        'expo-font',
        {
          fonts: [
            './assets/fonts/SpaceMono-Regular.ttf',
            './assets/fonts/KnightWarrior.otf',
            './assets/fonts/MightySouly.ttf',
            './assets/fonts/TechnoRaceItalic.otf'
          ]
        }
      ],
      [
        'expo-build-properties',
        {
          android: {
            compileSdkVersion: 35,
            targetSdkVersion: 35,
            minSdkVersion: 24
          }
        }
      ],
      [
        'react-native-google-mobile-ads',
        {
          androidAppId: process.env.ADMOB_APPID,
          iosAppId: process.env.ADMOB_APPID
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {},
      eas: {
        projectId: 'b6ea42f8-504b-4bfe-a956-cf26df2aefde'
      },
      test_letters: process.env.TEST_LETTERS,
      supabaseURL: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    },
    runtimeVersion: '1.0.0',
    updates: {
      url: 'https://u.expo.dev/b6ea42f8-504b-4bfe-a956-cf26df2aefde'
    },
    owner: 'germp24'
  }
};
