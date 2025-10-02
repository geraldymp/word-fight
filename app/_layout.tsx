// app/_layout.tsx
import {
  ArchitectsDaughter_400Regular,
  useFonts
} from '@expo-google-fonts/architects-daughter';
import { Candal_400Regular } from '@expo-google-fonts/candal';
import { Chilanka_400Regular } from '@expo-google-fonts/chilanka';
import { Cinzel_400Regular } from '@expo-google-fonts/cinzel';
import { DaysOne_400Regular } from '@expo-google-fonts/days-one';
import { GoblinOne_400Regular } from '@expo-google-fonts/goblin-one';
import {
  SourGummy_400Regular,
  SourGummy_800ExtraBold
} from '@expo-google-fonts/sour-gummy';
import { usePremiumStore } from 'app/store/usePremiumStore';
import { useSubscriptionStore } from 'app/store/useSubscriptionStore';
import { MusicPlayer } from 'app/utils/musicPlayer';
import { SfxPlayer } from 'app/utils/sfxPlayer';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';
import Purchases, { CustomerInfo } from 'react-native-purchases';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded, error] = useFonts({
    ArchitectsDaughter_400Regular,
    Candal_400Regular,
    Cinzel_400Regular,
    GoblinOne_400Regular,
    SourGummy_400Regular,
    SourGummy_800ExtraBold,
    DaysOne_400Regular,
    Chilanka_400Regular
  });

  const setFromCustomerInfo = useSubscriptionStore(s => s.setFromCustomerInfo);
  const loadSettings = usePremiumStore(s => s.loadSettings);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // initiate Ads
  useEffect(() => {
    mobileAds()
      .setRequestConfiguration({
        maxAdContentRating: MaxAdContentRating.G,
        tagForChildDirectedTreatment: false,
        tagForUnderAgeOfConsent: false
      })
      .then(() => mobileAds().initialize());
  }, []);

  useEffect(() => {
    if (__DEV__) {
      console.log('Skipping RevenueCat in development mode');
      return;
    }

    Purchases.configure({ apiKey: 'goog_BEXkLJEyXiWjowRmFmAcZETYydM' });

    // Initial fetch
    Purchases.getCustomerInfo().then(info => {
      setFromCustomerInfo(info);
      loadSettings();
    });

    // Listen for changes
    const listener = (info: CustomerInfo) => {
      setFromCustomerInfo(info);
      loadSettings();
    };

    Purchases.addCustomerInfoUpdateListener(listener);

    return () => {
      Purchases.removeCustomerInfoUpdateListener(listener);
    };
  }, []);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Stack screenOptions={{ headerShown: false }} />
        <MusicPlayer />
        <SfxPlayer />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
