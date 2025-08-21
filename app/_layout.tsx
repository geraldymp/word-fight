// app/_layout.tsx
import {
  ArchitectsDaughter_400Regular,
  useFonts
} from '@expo-google-fonts/architects-daughter';
import { Candal_400Regular } from '@expo-google-fonts/candal';
import { Cinzel_400Regular } from '@expo-google-fonts/cinzel';
import { GoblinOne_400Regular } from '@expo-google-fonts/goblin-one';
import {
  SourGummy_400Regular,
  SourGummy_800ExtraBold
} from '@expo-google-fonts/sour-gummy';
import { useSettingsStore } from 'app/store/useSettingStore';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded, error] = useFonts({
    ArchitectsDaughter_400Regular,
    Candal_400Regular,
    Cinzel_400Regular,
    GoblinOne_400Regular,
    SourGummy_400Regular,
    SourGummy_800ExtraBold
  });

  const { loadSettings } = useSettingsStore();

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    loadSettings();
  }, []);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
