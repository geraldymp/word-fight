import { Audio } from 'expo-av';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';
import Purchases, { CustomerInfo } from 'react-native-purchases';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
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
import { DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { GoblinOne_400Regular } from '@expo-google-fonts/goblin-one';
import {
  SourGummy_400Regular,
  SourGummy_800ExtraBold
} from '@expo-google-fonts/sour-gummy';

// stores
import { usePremiumStore } from '@store/usePremiumStore';
import { useSubscriptionStore } from '@store/useSubscriptionStore';

// utils
import Colors from 'app/foundation/colors';
import { MusicPlayer } from 'app/utils/musicPlayer';
import { SfxPlayer } from 'app/utils/sfxPlayer';
import { verticalScale } from 'app/utils/sizeScaling';

export default function Layout() {
  const progress = useSharedValue(0);

  const [ready, setReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    ArchitectsDaughter_400Regular,
    Candal_400Regular,
    Cinzel_400Regular,
    GoblinOne_400Regular,
    SourGummy_400Regular,
    SourGummy_800ExtraBold,
    DaysOne_400Regular,
    Chilanka_400Regular,
    DMSans_500Medium,
    DMSans_700Bold
  });

  const setFromCustomerInfo = useSubscriptionStore(s => s.setFromCustomerInfo);
  const loadSettings = usePremiumStore(s => s.loadSettings);

  useEffect(() => {
    async function init() {
      try {
        const minLoadingTime = new Promise(resolve =>
          setTimeout(resolve, 1500)
        );
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false
        });

        const initWorkPromise = (async () => {
          // a. Ads
          await mobileAds()
            .setRequestConfiguration({
              maxAdContentRating: MaxAdContentRating.G,
              tagForChildDirectedTreatment: false,
              tagForUnderAgeOfConsent: false
            })
            .then(() => mobileAds().initialize());

          // b. RevenueCat
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
          // Return something to satisfy the structure of Promise.all, though not strictly needed
          return 'Init work complete';
        })();
        await Promise.all([initWorkPromise, minLoadingTime]);
        setReady(true);
      } catch (err) {
        console.warn('Init error', err);
        setReady(true);
      }
    }

    init();
  }, []);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: 1000, // quicker than setReady timeout
      easing: Easing.bounce
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      progress.value,
      [0, 1],
      [0, 360 * 3] // spin 3 times
    );

    const scale = interpolate(progress.value, [0, 1], [0, 1]);

    return {
      transform: [{ rotate: `${rotate}deg` }, { scale }]
    };
  });

  if (!ready) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={[styles.container, styles.loader]}>
          <Animated.Image
            source={require('@assets/geyo_studio_logo.png')}
            style={[
              { width: verticalScale(200), height: verticalScale(200) },
              animatedStyle
            ]}
            resizeMode="contain"
          />
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
    backgroundColor: Colors.shallowBlue
  },
  text: {
    color: '#fff',
    marginTop: 12
  }
});
