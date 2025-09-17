import { REWARDED_UNIT_ID } from 'app/lib/ads/config';
import { useAdStore } from 'app/store/useAdStore';
import { useGameStore } from 'app/store/useGameStore';
import { IBooster } from 'app/types/IBooster';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, BackHandler } from 'react-native';
import {
  AdEventType,
  RewardedAd,
  RewardedAdEventType
} from 'react-native-google-mobile-ads';

export default function UseMagicHut() {
  const router = useRouter();

  const { increasePlayerHP, decreaseMana, increaseStep, mana } = useGameStore();
  const {
    magicHutPotion: { potionLimit, currentPotionUsed, increasePotionUsed }
  } = useAdStore();

  const [isLoaded, setLoaded] = useState(false);
  const [visibleAdPotion, setVisibleAdPotion] = useState(true);
  const [visibleAdConfirmationModal, setVisibleAdConfirmationModal] =
    useState(false);
  const [visibleAdDoneModal, setVisibleAdDoneModal] = useState(false);

  const rewardedRef = useRef<RewardedAd>(
    RewardedAd.createForAdRequest(REWARDED_UNIT_ID, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['games', 'puzzle', 'word']
    })
  );

  function onPressAdButton() {
    setVisibleAdConfirmationModal(true);
  }

  function onConfirmToWatchAd() {
    setVisibleAdConfirmationModal(false);
    showBlessingAd();
  }

  function onCancelToWatchAd() {
    setVisibleAdConfirmationModal(false);
  }

  function onCloseAdDoneModal() {
    setVisibleAdDoneModal(false);
  }

  useEffect(() => {
    const unsubLoaded = rewardedRef.current.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );

    const unsubError = rewardedRef.current.addAdEventListener(
      AdEventType.ERROR,
      (e: any) => {
        setLoaded(false);
      }
    );

    // First load
    rewardedRef.current.load();

    return () => {
      unsubLoaded();
      unsubError();
    };
  }, []);

  const showBlessingAd = useCallback(async () => {
    if (!isLoaded) {
      // Try to prepare next time and inform user
      rewardedRef.current.load();
      Alert.alert(
        'Ad not ready',
        'The Ad is being prepared. Try again in a few seconds.'
      );
      return false;
    }

    // One-time listeners for this specific show
    const rewardSub = rewardedRef.current.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => {
        try {
          increasePlayerHP(10);
          setVisibleAdPotion(false);
          increasePotionUsed();
          setVisibleAdDoneModal(true);
        } catch {}
      }
    );

    const errorSub = rewardedRef.current.addAdEventListener(
      AdEventType.ERROR,
      (e: any) => {
        console.log(e?.message ?? 'Failed to show ad');
      }
    );

    try {
      await rewardedRef.current.show();
    } catch (e: any) {
      // Cleanup even if show throws before CLOSED
      rewardSub();
      errorSub();
      Alert.alert('Ad unavailable', e?.message ?? 'Failed to show ad.');
      return false;
    }
  }, [potionLimit, currentPotionUsed, isLoaded]);

  useEffect(() => {
    if (visibleAdPotion) {
      if (potionLimit > currentPotionUsed) {
        setVisibleAdPotion(true);
      } else {
        setVisibleAdPotion(false);
      }
    }
  }, [potionLimit, currentPotionUsed, visibleAdPotion]);

  useEffect(() => {
    const backAction = () => {
      router.replace('/');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();
  }, [router]);

  const handleSelect = (booster?: IBooster) => {
    if (booster !== undefined) {
      // apply booster effect and decrease mana
      booster.action(useGameStore.getState());
      decreaseMana(booster.price);
    }

    increaseStep();
    router.replace('/choose_area');
  };

  return {
    actions: {
      handleSelect,
      onPressAdButton,
      onConfirmToWatchAd,
      onCancelToWatchAd,
      onCloseAdDoneModal
    },
    states: {
      mana,
      visibleAdPotion,
      visibleAdConfirmationModal,
      visibleAdDoneModal
    }
  };
}
