/* eslint-disable react-hooks/exhaustive-deps */
import { useIsFocused } from '@react-navigation/native';
import { useGameStore } from '@store/useGameStore';
import { useMusicStore } from '@store/useMusicStore';
import { useSfxStore } from '@store/useSFXStore';
import { calculateBaseLetterDamage } from '@utils/calculateDamage';
import { getBonusDamageFromLength } from '@utils/wordLengthDamageMap';
import { isValidWord } from '@utils/wordValidator';
import { isHighscoreFilled, submitHighscore } from 'app/lib/highscoreFunctions';
import { damageBreakdown } from 'app/utils/damageBreakdown';
import { generateRandomLettersWithVowels } from 'app/utils/generateLettersWithVowels';
import { generateSomeLettersWithVowels } from 'app/utils/generateSomeLetters';
import { getDamageModifier } from 'app/utils/getDamageModifier';
import { setBossBeatenStatistic } from 'app/utils/Statistic/setBossBeaten';
import { setWordsStatistic } from 'app/utils/Statistic/setWords';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { BackHandler } from 'react-native';
import {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from 'react-native-reanimated';

export default function UseBattle() {
  const router = useRouter();
  const isFocused = useIsFocused();

  const { playMusic, stopMusic } = useMusicStore();
  const { playSfx } = useSfxStore();
  const {
    selectedEnemy,
    setEnemyHP,
    journeyPath,
    stage,
    increaseStage,
    area,
    step,
    increaseStep,
    enemyHP,
    reduceEnemyHP,
    playerMaxHP,
    playerHP,
    reducePlayerHP,
    mana,
    increaseMana,
    lowestHighscore,
    highScoreFilled,
    setHighScoreFilled,
    maxReshuffle,
    reshuffle,
    setReshuffle,
    damageModifier
  } = useGameStore();
  const { name, image, baseHp, minDmg, maxDmg, minManaBounty, maxManaBounty } =
    selectedEnemy;

  const getRandomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const enemyDamage = useMemo(() => {
    return getRandomInt(minDmg, maxDmg);
  }, [minDmg, maxDmg]);

  const manaGained = useMemo(() => {
    return getRandomInt(minManaBounty, maxManaBounty);
  }, [minManaBounty, maxManaBounty]);

  const playerShakeAnim = useSharedValue(0);
  const enemyShakeAnim = useSharedValue(0);
  const wrongWordShakeAnim = useSharedValue(0);

  const enemyOpacity = useSharedValue(1);

  const [enemyMaxHp, setEnemyMaxHP] = useState(0);
  const [letters, setLetters] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<'invalid' | 'short' | null>(null);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [damageEvents, setDamageEvents] = useState<
    { id: number; amount: number; type: 'player' | 'enemy' }[]
  >([]);
  const [enemyView, setEnemyView] = useState<{ name: string; image: any }>({
    name: '',
    image: null
  });
  const [mapVisible, setMapVisible] = useState(false);

  // Shake when damage is done (for enemy or player)
  const triggerQuickShake = (animRef: SharedValue<number>) => {
    animRef.value = withSequence(
      withTiming(10, { duration: 50 }),
      withTiming(-10, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );
  };

  const enemyStyle = useAnimatedStyle(() => {
    return {
      opacity: enemyOpacity.value
    };
  });

  const handleReshuffle = () => {
    if (reshuffle > 0) {
      setLetters(generateRandomLettersWithVowels());
      setSelectedIndices([]);
      setReshuffle(reshuffle - 1);
    }
  };

  const handleRearrange = () => {
    setSelectedIndices([]);
    const shuffled = [...letters].sort(() => Math.random() - 0.5);
    setLetters(shuffled);
  };

  const currentWord = selectedIndices.map(i => letters[i]).join('');

  const handleLetterPress = (index: number) => {
    if (!selectedIndices.includes(index)) {
      setSelectedIndices([...selectedIndices, index]);
    } else {
      setSelectedIndices([...selectedIndices.filter(id => id !== index)]);
    }
  };

  async function setHiScore(word: string, dmg: number) {
    if (highScoreFilled) {
      if (dmg > lowestHighscore) {
        submitHighscore(word, dmg);
      }
    } else {
      submitHighscore(word, dmg);
      const hiscoreFilled = await isHighscoreFilled();
      setHighScoreFilled(hiscoreFilled);
    }
  }

  const enemyHitBack = () => {
    // using getState to get most updated value
    const currentEnemyHp = useGameStore.getState().enemyHP;
    if (currentEnemyHp > 0) {
      setTimeout(() => {
        setDamageEvents(prev => [
          ...prev,
          { id: Date.now(), amount: enemyDamage, type: 'player' }
        ]);
        reducePlayerHP(enemyDamage);
        playSfx('playerHit');
        triggerQuickShake(playerShakeAnim);
      }, 1200);
    }
  };

  const damageBreakdowns = useMemo(
    () => damageBreakdown(currentWord, damageModifier),
    [currentWord, damageModifier]
  );

  const handleSubmit = () => {
    if (isValidWord(currentWord) && currentWord.length > 3) {
      const damage =
        calculateBaseLetterDamage(currentWord) +
        getBonusDamageFromLength(currentWord);
      const dmgModifier = getDamageModifier(currentWord, damageModifier);
      setDamageEvents(prev => [
        ...prev,
        { id: Date.now(), amount: damage + dmgModifier, type: 'enemy' }
      ]);

      reduceEnemyHP(damage + dmgModifier);
      playSfx('enemyHit');
      triggerQuickShake(enemyShakeAnim);

      // Submit highscore to supabase if in top 20
      setHiScore(currentWord, damage);

      // Replace used letters
      const newLetters = generateSomeLettersWithVowels(
        letters,
        selectedIndices
      );
      setLetters(newLetters);

      setWordsStatistic(currentWord, damage);

      enemyHitBack();
    } else {
      if (currentWord.length <= 3) {
        setFeedback('short');
        triggerQuickShake(wrongWordShakeAnim);
      } else if (!isValidWord(currentWord)) {
        setFeedback('invalid');
        triggerQuickShake(wrongWordShakeAnim);
      }
    }

    setSelectedIndices([]);
    setTimeout(() => setFeedback(null), 2000); // hide feedback after 2
  };

  useEffect(() => {
    if (enemyHP === 0) {
      setTimeout(() => {
        playSfx('enemyBeaten');
        enemyOpacity.value = withTiming(0, { duration: 1500 });
        increaseMana(manaGained);
      }, 500);
      setTimeout(() => {
        setShowGameOverModal(true);
      }, 3000);
    } else if (playerHP === 0) {
      setTimeout(() => {
        setShowGameOverModal(true);
      }, 1500);
    }
  }, [enemyHP, playerHP]);

  // for analytic total boss beaten
  useEffect(() => {
    if (enemyHP === 0 && step === 7) {
      setBossBeatenStatistic();
    }
  }, [enemyHP, step]);

  useEffect(() => {
    setLetters(generateRandomLettersWithVowels());
  }, []);

  useEffect(() => {
    // On mount or stage up, set enemy HP
    setEnemyHP(baseHp);
    setEnemyMaxHP(baseHp);
    setEnemyView({ name, image });
    // Give 1 reshuffle at Stage 1 and not Magic Hut
    if (reshuffle < maxReshuffle && stage === 1 && step % 2 !== 0) {
      setReshuffle(reshuffle + 1);
    }
  }, [stage, step]);

  const modalContent: {
    modalText: string;
    showNextStageBtn: boolean;
    showNextAreaBtn: boolean;
  } = useMemo(() => {
    if (enemyHP === 0 && step === 7) {
      return {
        modalText: 'Congratulations, you beat the game!',
        showNextStageBtn: false,
        showNextAreaBtn: false
      };
    } else if (enemyHP === 0 && stage === 3) {
      return {
        modalText: 'You beat the area!',
        showNextStageBtn: false,
        showNextAreaBtn: true
      };
    } else if (enemyHP === 0) {
      return {
        modalText: 'You win the fight!',
        showNextStageBtn: true,
        showNextAreaBtn: false
      };
    } else {
      return {
        modalText: 'You lose!',
        showNextStageBtn: false,
        showNextAreaBtn: false
      };
    }
  }, [step, stage, enemyHP]);

  function onPressNextStage() {
    increaseStage();
    setLetters(generateRandomLettersWithVowels());
    setSelectedIndices([]);
    setFeedback(null);
    setShowGameOverModal(false);
    enemyOpacity.value = 1;
  }

  function onPressNextArea() {
    increaseStep();
    setShowGameOverModal(false);
    router.replace('/choose_area');
  }

  function onPressBackToHome() {
    setShowGameOverModal(false);
    router.replace('/');
  }

  function onConfirm() {
    router.replace('/');
  }

  function onCancel() {
    setShowConfirmModal(false);
  }

  function onCloseMap() {
    setMapVisible(false);
  }

  // TODO: define proper type
  function onCompleteFloatingDamage(event: any) {
    setDamageEvents(prev => prev.filter(e => e.id !== event.id));
  }

  function onGiveUp() {
    setShowConfirmModal(true);
  }

  useEffect(() => {
    if (isFocused) {
      playMusic('battle');
    }
    return () => {
      stopMusic();
    };
  }, [isFocused]);

  useEffect(() => {
    const backAction = () => {
      setShowConfirmModal(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [router]);

  return {
    actions: {
      handleLetterPress,
      handleRearrange,
      handleReshuffle,
      handleSubmit,
      onCancel,
      onCloseMap,
      onCompleteFloatingDamage,
      onConfirm,
      onPressBackToHome,
      onPressNextArea,
      onPressNextStage,
      onGiveUp
    },
    states: {
      areaDetail: area,
      stage,
      enemyView,
      enemyStyle,
      enemyShakeAnim,
      enemyHP,
      enemyMaxHp,
      enemyMinDmg: minDmg,
      enemyMaxDmg: maxDmg,
      enemyMinManaBounty: minManaBounty,
      enemyMaxManaBounty: maxManaBounty,
      playerShakeAnim,
      playerMaxHP,
      playerHP,
      mana,
      currentWord,
      letters,
      selectedIndices,
      wrongWordShakeAnim,
      feedback,
      showGameOverModal,
      modalContent,
      showConfirmModal,
      mapVisible,
      journeyPath,
      damageEvents,
      maxReshuffle,
      reshuffleCount: reshuffle,
      getDmgBreakdown: damageBreakdowns
    }
  };
}
