import { resumeGame } from '@store/savedGame/onResumingGame';
import { onLoadGame } from '@store/savedGame/useSavedGame';
import { useAdStore } from '@store/useAdStore';
import { useGameStore } from '@store/useGameStore';
import { useMagicHutStore } from '@store/useMagicHutStore';
import { getRandomInt } from '@utils/getRandomInt';
import { LoadingTexts, Tips } from 'app/constants/loadingText';
import {
  getLowestHighscore,
  getLowestMonthlyHighscore
} from 'app/lib/highscoreFunctions';
import { usePlayerStore } from 'app/store/usePlayerStore';
import { getBonusHPFromUpgrades } from 'app/utils/getHPFromUpgrades';
import { getManaFromUpgrades } from 'app/utils/getManaFromUpgrades';
import { getRandomText } from 'app/utils/getRandomFromArrayOfText';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, BackHandler } from 'react-native';

export default function UseLoading() {
  const router = useRouter();
  const resetGame = useGameStore(state => state.resetGame);
  const resetPotionUsed = useAdStore(
    state => state.magicHutPotion.resetPotionUsed
  );
  const resetPurchasedItems = useMagicHutStore(
    state => state.resetPurchasedItems
  );

  const setPlayerMaxHP = useGameStore(s => s.setPlayerMaxHP);
  const upgrades = usePlayerStore(s => s.upgrades);
  const setPlayerHP = useGameStore(s => s.setPlayerHP);
  const setMana = useGameStore(s => s.setMana);
  const resetRunStatistic = useGameStore(s => s.resetRunStatistic);

  const setLowestHighScore = useGameStore(s => s.setLowestHighScore);
  const setLowestMonthlyHighScore = useGameStore(
    s => s.setLowestMonthlyHighScore
  );

  const resetTempExp = usePlayerStore(s => s.resetTempExp);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const randomizedTime = getRandomInt(1500, 4000);

  const [loadingText, setLoadingText] = useState('');
  const [tipText, setTipText] = useState('');

  async function setHighScoreLowestValue() {
    const lowestHS: number = await getLowestHighscore();
    const lowestMonthlyHS: number = await getLowestMonthlyHighscore();
    setLowestHighScore(lowestHS);
    setLowestMonthlyHighScore(lowestMonthlyHS);
  }

  const playerMaxHPUpgraded = useMemo(() => {
    const bonusHpFromUpgrades = getBonusHPFromUpgrades(upgrades);
    return 500 + bonusHpFromUpgrades;
  }, [upgrades]);

  const playerManaUpgraded = useMemo(() => {
    const bonusManaFromUpgrades = getManaFromUpgrades(upgrades);
    return 0 + bonusManaFromUpgrades;
  }, [upgrades]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true
        })
      ])
    ).start();
    setHighScoreLowestValue();
    setLoadingText(getRandomText(LoadingTexts));
    setTipText(getRandomText(Tips));
  }, []);

  useEffect(() => {
    const checkSave = async () => {
      await new Promise(resolve => setTimeout(resolve, randomizedTime));
      const savedGame = await onLoadGame();
      if (savedGame) {
        // set battle store to last saved then enter battle screen
        await resumeGame(savedGame);
        router.replace('/battle');
      } else {
        // reset all progress, set playerHP then enter choose area screen
        resetGame();
        resetPotionUsed();
        resetPurchasedItems();
        setPlayerMaxHP(playerMaxHPUpgraded);
        setPlayerHP(playerMaxHPUpgraded);
        setMana(playerManaUpgraded);
        resetRunStatistic();
        resetTempExp();
        router.replace('/choose_area');
      }
    };
    checkSave();
  }, [router]);

  useEffect(() => {
    const backAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();
  }, [router]);

  return {
    states: {
      fadeAnim,
      loadingText,
      tipText
    }
  };
}
