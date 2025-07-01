// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: 'Word Fight',
    slug: 'word-fight',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/word_fight_logo.png',
    scheme: 'wordfight',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.germp24.wordfight"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/word_fight_logo.png',
        backgroundColor: '#ffffff'
      },
      edgeToEdgeEnabled: true,
      package: 'com.germp24.wordfight'
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png'
    },
    plugins: [
      'expo-router',
      'expo-audio',
      'expo-asset',
      [
        'expo-splash-screen',
        {
          backgroundColor: '#4287f5',
          image: './assets/word_fight_logo.png',
          dark: {
            image: './assets/word_fight_logo.png',
            backgroundColor: '#4287f5'
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
    runtimeVersion: {
      policy: '1.0.0'
    },
    updates: {
      url: 'https://u.expo.dev/b6ea42f8-504b-4bfe-a956-cf26df2aefde'
    },
    owner: 'germp24'
  }
};
