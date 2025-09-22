/* eslint-disable react-hooks/exhaustive-deps */
import { useIsFocused } from '@react-navigation/native';
import { useGameStore } from '@store/useGameStore';
import { useMusicStore } from '@store/useMusicStore';
import { useSfxStore } from '@store/useSFXStore';
import { getBonusDamageFromLength } from '@utils/wordLengthDamageMap';
import { isValidWord } from '@utils/wordValidator';
import { isHighscoreFilled, submitHighscore } from 'app/lib/highscoreFunctions';
import { ILetter } from 'app/types/ILetter';
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
  runOnJS,
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

  const getRandomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const enemyDamage = useMemo(() => {
    return getRandomInt(selectedEnemy.minDmg, selectedEnemy.maxDmg);
  }, [selectedEnemy.minDmg, selectedEnemy.maxDmg]);

  const manaGained = useMemo(() => {
    return getRandomInt(
      selectedEnemy.minManaBounty,
      selectedEnemy.maxManaBounty
    );
  }, [selectedEnemy.minManaBounty, selectedEnemy.maxManaBounty]);

  const playerShakeAnim = useSharedValue(0);
  const enemyShakeAnim = useSharedValue(0);
  const enemyAttackAnim = useSharedValue(0);
  const wrongWordShakeAnim = useSharedValue(0);

  const enemyOpacity = useSharedValue(1);

  const [enemyMaxHp, setEnemyMaxHP] = useState(0);
  const [letters, setLetters] = useState<ILetter[]>([]); // Letters in word builder
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]); // Indexes of selected letters
  const [feedback, setFeedback] = useState<'invalid' | 'short' | null>(null);
  const [showGameProgressModal, setShowGameProgressModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [damageEvents, setDamageEvents] = useState<
    { id: number; amount: number; type: 'player' | 'enemy' }[]
  >([]);

  // Shake when damage is done (for enemy, player and word builder)
  const triggerQuickShake = (animRef: SharedValue<number>) => {
    animRef.value = withSequence(
      withTiming(10, { duration: 50 }),
      withTiming(-10, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );
  };

  const triggerEnemyAttack = () => {
    enemyAttackAnim.value = withSequence(
      withTiming(-25, { duration: 100 }), // anticipation (move up/back)
      withTiming(50, { duration: 200 }, () => {
        // impact moment → player shakes
        runOnJS(playerAttacked)();
      }),
      withTiming(0, { duration: 150 })
    );
  };

  function playerAttacked() {
    setDamageEvents(prev => [
      ...prev,
      { id: Date.now(), amount: enemyDamage, type: 'player' }
    ]);
    reducePlayerHP(enemyDamage);
    playSfx('playerHit');
    triggerQuickShake(playerShakeAnim);
  }

  const enemyStyle = useAnimatedStyle(() => {
    return {
      opacity: enemyOpacity.value,
      transform: [
        { translateX: enemyShakeAnim.value }, // shake when hit
        { translateY: enemyAttackAnim.value } // vertical attack
      ]
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

  const currentWord = selectedIndices.map(i => letters[i].letter).join('');

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
        triggerEnemyAttack();
      }, 1200);
    }
  };

  const damageBreakdowns = useMemo(
    () => damageBreakdown(currentWord, damageModifier),
    [currentWord, damageModifier]
  );

  const handleSubmit = () => {
    if (isValidWord(currentWord) && currentWord.length >= 3) {
      const baseDamage = selectedIndices.reduce(
        (sum, i) => sum + letters[i].value,
        0
      );
      const lengthDamage = getBonusDamageFromLength(currentWord);
      const dmgModifier = getDamageModifier(currentWord, damageModifier);

      const nonModifiedDamage = baseDamage + lengthDamage;
      const totalDamage = baseDamage + lengthDamage + dmgModifier;
      setDamageEvents(prev => [
        ...prev,
        { id: Date.now(), amount: totalDamage, type: 'enemy' }
      ]);

      reduceEnemyHP(totalDamage);
      playSfx('enemyHit');
      triggerQuickShake(enemyShakeAnim);

      // Submit highscore to supabase if in top 20
      setHiScore(currentWord, nonModifiedDamage);
      // Update submitted word to statistic
      setWordsStatistic(currentWord, nonModifiedDamage);

      // Replace used letters
      const newLetters = generateSomeLettersWithVowels(
        letters,
        selectedIndices
      );
      setLetters(newLetters);

      enemyHitBack();
    } else {
      if (currentWord.length < 3) {
        setFeedback('short');
        triggerQuickShake(wrongWordShakeAnim);
      } else if (!isValidWord(currentWord)) {
        setFeedback('invalid');
        triggerQuickShake(wrongWordShakeAnim);
      }
      setTimeout(() => setFeedback(null), 2000); // hide feedback after 2
    }
    setSelectedIndices([]);
  };

  // Enemy beaten
  useEffect(() => {
    if (enemyHP === 0) {
      setTimeout(() => {
        playSfx('enemyBeaten');
        enemyOpacity.value = withTiming(0, { duration: 1500 });
        increaseMana(manaGained);
      }, 500);
      setTimeout(() => {
        setShowGameProgressModal(true);
      }, 3000);
    }
  }, [enemyHP]);

  // Player beaten
  useEffect(() => {
    if (playerHP === 0) {
      setTimeout(() => {
        setShowGameProgressModal(true);
      }, 1500);
    }
  }, [playerHP]);

  // for analytic total boss beaten
  useEffect(() => {
    if (enemyHP === 0 && step === 7) {
      setBossBeatenStatistic();
    }
  }, [enemyHP, step]);

  // generate random letters when the game start (called once)
  useEffect(() => {
    setLetters(generateRandomLettersWithVowels());
  }, []);

  useEffect(() => {
    // When game start or stage up, set enemy HP
    setEnemyHP(selectedEnemy.baseHp);
    setEnemyMaxHP(selectedEnemy.baseHp);

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
        modalText: 'You clear the area!',
        showNextStageBtn: false,
        showNextAreaBtn: true
      };
    } else if (enemyHP === 0) {
      return {
        modalText: 'You beat the enemy!',
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
    setShowGameProgressModal(false);
    enemyOpacity.value = 1;
  }

  function onPressNextArea() {
    increaseStep();
    setShowGameProgressModal(false);
    router.replace('/choose_area');
  }

  function onPressBackToHome() {
    setShowGameProgressModal(false);
    router.replace('/');
  }

  function onConfirm() {
    router.replace('/');
  }

  function onCancel() {
    setShowConfirmModal(false);
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
      enemyStyle,
      enemyShakeAnim,
      enemyAttackAnim,
      enemyName: selectedEnemy.name,
      enemyImage: selectedEnemy.image,
      enemyHP,
      enemyMaxHp,
      enemyMinDmg: selectedEnemy.minDmg,
      enemyMaxDmg: selectedEnemy.maxDmg,
      enemyMinManaBounty: selectedEnemy.minManaBounty,
      enemyMaxManaBounty: selectedEnemy.maxManaBounty,
      playerShakeAnim,
      playerMaxHP,
      playerHP,
      mana,
      currentWord,
      letters,
      selectedIndices,
      wrongWordShakeAnim,
      feedback,
      showGameProgressModal,
      modalContent,
      showConfirmModal,
      damageEvents,
      maxReshuffle,
      reshuffleCount: reshuffle,
      getDmgBreakdown: damageBreakdowns
    }
  };
}
