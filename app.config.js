// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: "Word Fight",
    slug: "word-fight",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/word_fight_logo.png",
    scheme: "wordfight",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      package: "com.germp24.wordfight",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/word_fight_logo.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      "expo-asset",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: "b6ea42f8-504b-4bfe-a956-cf26df2aefde",
      },
      supabaseURL: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    },
    owner: "germp24",
  },
};
