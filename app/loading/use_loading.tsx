import { loadingTexts, tips } from '@constants/loading_text';
import { useGameStore } from '@store/useGameStore';
import { getRandomInt } from '@utils/getRandomInt';
import { getLowestHighscore } from 'app/lib/highscoreFunctions';
import { useAdStore } from 'app/store/useAdStore';
import { useHighscoreStore } from 'app/store/useHighscoreStore';
import { getRandomText } from 'app/utils/getRandomFromArrayOfText';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

export default function UseLoading() {
  const router = useRouter();
  const { setLowestHighscore } = useHighscoreStore();
  const resetGame = useGameStore(state => state.resetGame);
  const resetPotionUsed = useAdStore(
    state => state.magicHutPotion.resetPotionUsed
  );
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const randomizedTime = getRandomInt(1500, 4000);

  const [loadingText, setLoadingText] = useState('');
  const [tipText, setTipText] = useState('');

  async function setHighscoreLowerLimit() {
    const lowestHS = await getLowestHighscore();
    setLowestHighscore(lowestHS);
  }

  useEffect(() => {
    setHighscoreLowerLimit();
    setLoadingText(getRandomText(loadingTexts));
    setTipText(getRandomText(tips));
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        })
      ])
    ).start();

    const timeout = setTimeout(() => {
      resetGame();
      resetPotionUsed();
      router.replace('/choose_area'); // Replace with your actual game screen route
    }, randomizedTime);

    return () => clearTimeout(timeout);
  }, [fadeAnim, resetGame, router, randomizedTime]); // dep from Copilot

  return {
    states: {
      fadeAnim,
      loadingText,
      tipText
    }
  };
}
