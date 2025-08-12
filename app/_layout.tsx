// app/_layout.tsx
import { ArchitectsDaughter_400Regular, useFonts } from '@expo-google-fonts/architects-daughter';
import { Candal_400Regular } from '@expo-google-fonts/candal';
import { Cinzel_400Regular } from '@expo-google-fonts/cinzel';
import { GoblinOne_400Regular } from '@expo-google-fonts/goblin-one';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Layout() {
  const [loaded, error] = useFonts({
    ArchitectsDaughter_400Regular,
    Candal_400Regular,
    Cinzel_400Regular,
    GoblinOne_400Regular
  });

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
