import { boosters } from 'app/constants/boosters';
import { HutDialog } from 'app/constants/hutDialog';
import { KeyValues } from 'app/constants/keyValues';
import { REWARDED_UNIT_ID } from 'app/lib/ads/config';
import { useAdStore } from 'app/store/useAdStore';
import { useGameStore } from 'app/store/useGameStore';
import { useMagicHutStore } from 'app/store/useMagicHutStore';
import { useSubscriptionStore } from 'app/store/useSubscriptionStore';
import { IBooster } from 'app/types/IBooster';
import { getRandomText } from 'app/utils/getRandomFromArrayOfText';
import {
  getMagicHutTutorial,
  setMagicHutTutorial
} from 'app/utils/tutorialManager';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, BackHandler } from 'react-native';
import {
  AdEventType,
  RewardedAd,
  RewardedAdEventType
} from 'react-native-google-mobile-ads';

function getRandomPowerups(list: IBooster[], amount: number = 4) {
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, amount);
}

const { ad } = KeyValues;

export default function UseMagicHut() {
  const router = useRouter();

  const { increasePlayerHP, decreaseMana, increaseStep, mana } = useGameStore();
  const {
    magicHutPotion: { potionLimit, currentPotionUsed, increasePotionUsed }
  } = useAdStore();
  const { purchasedItemIds, addPurchasedItemId } = useMagicHutStore();
  const { isPremium } = useSubscriptionStore();

  const filteredBooster = boosters.filter(
    booster => !purchasedItemIds.includes(booster.id)
  );

  const [magicianText, setMagicianText] = useState('');

  const [randomizedItems, setRandomizedItems] = useState<IBooster[]>(
    getRandomPowerups(filteredBooster)
  );
  const [selectedItem, setSelectedItem] = useState<IBooster>();
  const [isLoaded, setLoaded] = useState(false);

  const [visibleAdPotion, setVisibleAdPotion] = useState(true);
  const [visibleAdConfirmationModal, setVisibleAdConfirmationModal] =
    useState(false);
  const [visibleAdDoneModal, setVisibleAdDoneModal] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const [totalReload, setTotalReload] = useState(2);

  async function handleCloseTutorial() {
    setShowTutorial(false);
    await setMagicHutTutorial(false);
  }

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
          increasePlayerHP(ad.restoreHp);
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

  useEffect(() => {
    setMagicianText(getRandomText(HutDialog));
  }, []);

  const onConfirmShopping = () => {
    if (selectedItem !== undefined) {
      // apply booster effect and decrease mana
      selectedItem.action(useGameStore.getState());
      addPurchasedItemId(selectedItem.id);
      decreaseMana(selectedItem.price);
    }

    increaseStep();
    router.replace('/choose_area');
  };

  function onClickItem(item: IBooster) {
    if (item.id === selectedItem?.id) {
      setSelectedItem(undefined);
    } else {
      setSelectedItem(item);
    }
  }

  const confirmButtonTitle = useMemo(() => {
    if (selectedItem === undefined) {
      return 'Skip Ahead';
    } else {
      return 'Buy & Resume';
    }
  }, [selectedItem]);

  const isReloadVisible: boolean = useMemo(() => {
    if (!isPremium) {
      return false;
    } else if (totalReload > 0) {
      return true;
    } else {
      return false;
    }
  }, [totalReload, isPremium]);

  function onRefreshItems() {
    setRandomizedItems(getRandomPowerups(filteredBooster));
    setTotalReload(prev => prev - 1);
  }

  useEffect(() => {
    (async () => {
      const enabled = await getMagicHutTutorial();
      if (enabled) {
        setTimeout(() => {
          setShowTutorial(true);
        }, 350);
      }
    })();
  }, []);

  return {
    actions: {
      onPressAdButton,
      onConfirmToWatchAd,
      onCancelToWatchAd,
      onCloseAdDoneModal,
      onClickItem,
      onConfirmShopping,
      onRefreshItems,
      handleCloseTutorial
    },
    states: {
      magicianText,
      mana,
      visibleAdPotion,
      visibleAdConfirmationModal,
      visibleAdDoneModal,
      randomizedItems,
      selectedItem,
      confirmButtonTitle,
      isReloadVisible,
      showTutorial
    }
  };
}
