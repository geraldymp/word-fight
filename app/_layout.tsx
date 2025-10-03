import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';
import Purchases, { CustomerInfo } from 'react-native-purchases';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// fonts
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

// stores
import { usePremiumStore } from 'app/store/usePremiumStore';
import { useSubscriptionStore } from 'app/store/useSubscriptionStore';

// utils
import Colors from 'app/foundation/colors';
import { MusicPlayer } from 'app/utils/musicPlayer';
import { SfxPlayer } from 'app/utils/sfxPlayer';

export default function Layout() {
  const [ready, setReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
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
    async function init() {
      try {
        // 1. Fonts
        await new Promise((resolve, reject) => {
          if (fontsLoaded || fontError) resolve(true);
          // watch for font change
          const interval = setInterval(() => {
            if (fontsLoaded || fontError) {
              clearInterval(interval);
              resolve(true);
            }
          }, 1000);
        });

        // 2. Ads
        await mobileAds()
          .setRequestConfiguration({
            maxAdContentRating: MaxAdContentRating.G,
            tagForChildDirectedTreatment: false,
            tagForUnderAgeOfConsent: false
          })
          .then(() => mobileAds().initialize());

        // 3. RevenueCat
        if (!__DEV__) {
          Purchases.configure({ apiKey: 'goog_BEXkLJEyXiWjowRmFmAcZETYydM' });
          const info = await Purchases.getCustomerInfo();
          setFromCustomerInfo(info);
          loadSettings();

          Purchases.addCustomerInfoUpdateListener((info: CustomerInfo) => {
            setFromCustomerInfo(info);
            loadSettings();
          });
        }

        // all process done
        setTimeout(() => {
          setReady(true);
        }, 3000);
      } catch (err) {
        console.warn('Init error', err);
        setReady(true);
      }
    }

    init();
  }, [fontsLoaded, fontError]);

  if (!ready) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={[styles.container, styles.loader]}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.text}>Sharpening swords...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
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
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.borderBlack
  },
  text: {
    color: '#fff',
    marginTop: 12
  }
});
