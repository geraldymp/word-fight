/* eslint-disable react-hooks/exhaustive-deps */
import { useIsFocused } from '@react-navigation/native';
import { onClearResume, onSaveGame } from '@store/savedGame/useSavedGame';
import { useAdStore } from '@store/useAdStore';
import { useGameStore } from '@store/useGameStore';
import { useMagicHutStore } from '@store/useMagicHutStore';
import { useMusicStore } from '@store/useMusicStore';
import { usePremiumStore } from '@store/usePremiumStore';
import { useSfxStore } from '@store/useSFXStore';
import { getBonusDamageFromLength } from '@utils/wordLengthDamageMap';
import { isValidWord } from '@utils/wordValidator';
import { HeroIcons } from 'app/constants/heroIcons';
import { isHighscoreFilled, submitHighscore } from 'app/lib/highscoreFunctions';
import { useHeroStore } from 'app/store/useHeroStore';
import { ILetter } from 'app/types/ILetter';
import { damageBreakdown } from 'app/utils/damageBreakdown';
import { generateRandomLettersWithVowels } from 'app/utils/generateLettersWithVowels';
import { generateSomeLettersWithVowels } from 'app/utils/generateSomeLetters';
import { getDamageModifier } from 'app/utils/getDamageModifier';
import { setBossBeatenStatistic } from 'app/utils/Statistic/setBossBeaten';
import { setWordsStatistic } from 'app/utils/Statistic/setWords';
import {
  getBattleTutorial,
  setBattleTutorial
} from 'app/utils/tutorialManager';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BackHandler, Text, View } from 'react-native';
import {
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from 'react-native-reanimated';

// FLOW OF SETTIMEOUT USAGE AND ANIMATION DURATION
//
// DR = DURATION
// DL = DELAY
//
// START: SUBMIT => PROJECTION LAUNCHED (350 DR) => ENEMY SHOOK (50 DR) => (A / B)
//
// A (ENEMY HAVE HP) ATTACK BACK (1200 DL) => ENEMY ATTACK ANIMATION (200 DR) => (C / D)
// B (ENEMY NO HP) REMOVE ENEMY IMAGE, GET MANA (500 DL) => SHOW PROGRESS MODAL (2500 DL)
//
// C (PLAYER HAVE HP) PLAYER SHOOK (50 DR) => DONE
// D (PLAYER NO HP) SHOW PROGRESS MODAL (1500 DL) => DONE

export default function UseBattle() {
  const router = useRouter();
  const isFocused = useIsFocused();

  const showDamageBreakdown = usePremiumStore(s => s.showDamageBreakdown);
  const showNumberedTiles = usePremiumStore(s => s.showNumberedTiles);

  const { playMusic, stopMusic } = useMusicStore();
  const { playSfx } = useSfxStore();

  // --- Enemy ---
  const selectedEnemies = useGameStore(s => s.selectedEnemies);
  const selectedEnemy = useGameStore(s => s.selectedEnemy);
  const enemyHP = useGameStore(s => s.enemyHP);
  const setEnemyHP = useGameStore(s => s.setEnemyHP);
  const reduceEnemyHP = useGameStore(s => s.reduceEnemyHP);

  // --- Player ---
  const playerHP = useGameStore(s => s.playerHP);
  const playerMaxHP = useGameStore(s => s.playerMaxHP);
  const reducePlayerHP = useGameStore(s => s.reducePlayerHP);
  const damageModifier = useGameStore(s => s.damageModifier);

  // --- Stage / Progress ---
  const stage = useGameStore(s => s.stage);
  const increaseStage = useGameStore(s => s.increaseStage);
  const area = useGameStore(s => s.area);
  const step = useGameStore(s => s.step);
  const increaseStep = useGameStore(s => s.increaseStep);

  // --- Mana ---
  const mana = useGameStore(s => s.mana);
  const increaseMana = useGameStore(s => s.increaseMana);

  // --- Reshuffle ---
  const reshuffle = useGameStore(s => s.reshuffle);
  const setReshuffle = useGameStore(s => s.setReshuffle);
  const maxReshuffle = useGameStore(s => s.maxReshuffle);

  // --- Highscore / Meta ---
  const lowestHighscore = useGameStore(s => s.lowestHighscore);
  const highScoreFilled = useGameStore(s => s.highScoreFilled);
  const setHighScoreFilled = useGameStore(s => s.setHighScoreFilled);

  // -- Shop Progress --
  const currentPotionUsed = useAdStore(
    state => state.magicHutPotion.currentPotionUsed
  );
  const purchasedItemIds = useMagicHutStore(state => state.purchasedItemIds);

  // -- Hero Icon --
  const selectedHeroId = useHeroStore(state => state.selectedHeroId);

  const selectedHero = HeroIcons.find(h => h.id === selectedHeroId);

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

  const projectionX = useSharedValue(0);
  const projectionY = useSharedValue(0);

  const playerWordRef = useRef<Text>(null);
  const enemyImageRef = useRef<View>(null);

  const [enemyMaxHp, setEnemyMaxHP] = useState(selectedEnemy.baseHp);
  const [letters, setLetters] = useState<ILetter[]>([]); // Letters in word builder
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]); // Indexes of selected letters
  const [feedback, setFeedback] = useState<'invalid' | 'short' | null>(null);
  const [showGameProgressModal, setShowGameProgressModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [damageEvents, setDamageEvents] = useState<
    { id: number; amount: number; type: 'player' | 'enemy' }[]
  >([]);
  const [showProjection, setShowProjection] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isReshuffling, setIsReshuffling] = useState(false);

  // filtered from letters, this only get the word (no value)
  const currentWord: string = selectedIndices
    .map(i => letters[i].letter)
    .join('');
  // array of created word, with each letter value
  const currentWordWithValue: ILetter[] = selectedIndices.map(i => letters[i]);

  // Shake when damage is done (for enemy, player and word builder)
  const triggerQuickShake = (animRef: SharedValue<number>) => {
    animRef.value = withSequence(
      withTiming(10, { duration: 50 }),
      withTiming(-10, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );
  };

  // Move back, lunge forward, attack the player, then back to initial position
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
    if (playerHP === 0) {
      setTimeout(() => {
        setShowGameProgressModal(true);
      }, 1500);
    }
  }

  function enemyAttacked() {
    const baseDamage = selectedIndices.reduce(
      (sum, i) => sum + letters[i].value,
      0
    );
    const lengthDamage = getBonusDamageFromLength(currentWordWithValue);
    const dmgModifier = getDamageModifier(currentWord, damageModifier);
    const totalDamage = baseDamage + lengthDamage + dmgModifier;
    setShowProjection(false);
    reduceEnemyHP(totalDamage);
    playSfx('enemyHit');
    triggerQuickShake(enemyShakeAnim);
    setDamageEvents(prev => [
      ...prev,
      { id: Date.now(), amount: totalDamage, type: 'enemy' }
    ]);

    const currentEnemyHp = useGameStore.getState().enemyHP;

    // Enemy hit back if not beaten
    if (currentEnemyHp > 0) {
      setTimeout(() => {
        triggerEnemyAttack();
      }, 1200);
    } else {
      // Enemy beaten
      setTimeout(() => {
        playSfx('enemyBeaten');
        enemyOpacity.value = withTiming(0, { duration: 1500 });
        increaseMana(manaGained);
      }, 500);
      setTimeout(() => {
        setShowGameProgressModal(true);
      }, 2500);
    }
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
      setIsReshuffling(true);
      setTimeout(() => {
        setLetters(generateRandomLettersWithVowels());
        setSelectedIndices([]);
        setReshuffle(reshuffle - 1);
        setIsReshuffling(false);
      }, 1250);
    }
  };

  const handleRearrange = () => {
    setSelectedIndices([]);
    const shuffled = [...letters].sort(() => Math.random() - 0.5);
    setLetters(shuffled);
  };

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

  const damageBreakdowns = useMemo(
    () => damageBreakdown(currentWordWithValue, damageModifier),
    [currentWordWithValue, damageModifier]
  );

  const projectionStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: projectionX.value },
        { translateY: projectionY.value }
      ]
    };
  });

  function launchProjection() {
    if (!playerWordRef.current || !enemyImageRef.current) return;

    // Set starting point for animation, selected word position
    // 50 is half of the projection image H and W (if size change, this MUST changed as well)
    // Reduce the point to make sure it hit the middle part of all images
    playerWordRef.current.measure((x, y, width, height, pageX, pageY) => {
      const startX = pageX + width / 2 - 50;
      const startY = pageY + height / 2 - 50;

      // Set ending point for animation, enemy position
      enemyImageRef?.current?.measure((ex, ey, ew, eh, ePageX, ePageY) => {
        const targetX = ePageX + ew / 2 - 50;
        const targetY = ePageY + eh / 2 - 50;

        // reset position + show
        runOnJS(setShowProjection)(true);
        projectionX.value = startX;
        projectionY.value = startY;

        // animate toward enemy
        projectionX.value = withTiming(targetX, { duration: 350 });
        projectionY.value = withTiming(targetY, { duration: 350 }, () => {
          runOnJS(enemyAttacked)();
        });
      });
    });
  }

  const handleSubmit = () => {
    if (isValidWord(currentWord) && currentWord.length >= 3) {
      const baseDamage = selectedIndices.reduce(
        (sum, i) => sum + letters[i].value,
        0
      );
      const lengthDamage = getBonusDamageFromLength(currentWordWithValue);
      const nonModifiedDamage = baseDamage + lengthDamage;

      launchProjection();

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

  // for analytic total boss beaten
  useEffect(() => {
    if (enemyHP === 0 && step === 7) {
      onClearResume();
      setBossBeatenStatistic();
    }
  }, [enemyHP, step]);

  // generate random letters when the game start (called once)
  useEffect(() => {
    setLetters(generateRandomLettersWithVowels());
  }, []);

  const modalContent: {
    modalText: string;
    showNextStageBtn: boolean;
    showNextAreaBtn: boolean;
    showHomeBtn: boolean;
  } = useMemo(() => {
    if (enemyHP === 0 && step === 7) {
      return {
        modalText: 'Congratulations, you beat the game!',
        showNextStageBtn: false,
        showNextAreaBtn: false,
        showHomeBtn: true
      };
    } else if (enemyHP === 0 && stage === 3) {
      return {
        modalText: 'You clear the area!',
        showNextStageBtn: false,
        showNextAreaBtn: true,
        showHomeBtn: false
      };
    } else if (enemyHP === 0) {
      return {
        modalText: 'You beat the enemy!',
        showNextStageBtn: true,
        showNextAreaBtn: false,
        showHomeBtn: false
      };
    } else {
      return {
        modalText: 'You lose!',
        showNextStageBtn: false,
        showNextAreaBtn: false,
        showHomeBtn: true
      };
    }
  }, [step, stage, enemyHP]);

  function onPressNextStage() {
    increaseStage();
    setEnemyHP(useGameStore.getState().selectedEnemy.baseHp);
    setEnemyMaxHP(useGameStore.getState().selectedEnemy.baseHp);
    setLetters(generateRandomLettersWithVowels());
    setSelectedIndices([]);
    setFeedback(null);
    setShowGameProgressModal(false);
    enemyOpacity.value = 1;
  }

  function onPressNextArea() {
    increaseStep();
    if (reshuffle < maxReshuffle) {
      setReshuffle(reshuffle + 1);
    }
    setShowGameProgressModal(false);
    router.replace('/choose_area');
  }

  function onPressBackToHome() {
    setShowGameProgressModal(false);
    router.replace('/');
  }

  async function onConfirmToHome() {
    if (!(step === 1 && stage === 1)) {
      await onSaveGame({
        enemyHP: enemyHP,
        playerMaxHP: playerMaxHP,
        playerHP: playerHP,
        mana: mana,
        step: step,
        area: JSON.stringify(area),
        stage: stage,
        selectedEnemy: JSON.stringify(selectedEnemy),
        selectedEnemies: JSON.stringify(selectedEnemies),
        maxReshuffle: maxReshuffle,
        reshuffle: reshuffle,
        damageModifier: JSON.stringify(damageModifier),
        currentPotionUsed: currentPotionUsed,
        purchasedItem: JSON.stringify(purchasedItemIds)
      });
    }
    router.replace('/');
  }

  function onCancelToHome() {
    setShowConfirmModal(false);
  }

  // TODO: define proper type
  function onCompleteFloatingDamage(event: any) {
    setDamageEvents(prev => prev.filter(e => e.id !== event.id));
  }

  function onGiveUp() {
    setShowConfirmModal(true);
  }

  const handleCloseTutorial = async () => {
    setShowTutorial(false);
    await setBattleTutorial(false); // disable after shown once
  };

  useEffect(() => {
    (async () => {
      const enabled = await getBattleTutorial();
      if (enabled) {
        setTimeout(() => {
          setShowTutorial(true);
        }, 350);
      }
    })();
  }, []);

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
      onCancelToHome,
      onCompleteFloatingDamage,
      onConfirmToHome,
      onPressBackToHome,
      onPressNextArea,
      onPressNextStage,
      onGiveUp,
      handleCloseTutorial
    },
    states: {
      areaDetail: area,
      stage,
      enemyStyle,
      enemyImageRef,
      enemyShakeAnim,
      enemyAttackAnim,
      enemyId: selectedEnemy.id,
      enemyName: selectedEnemy.name,
      enemyHP,
      enemyMaxHp,
      enemyMinDmg: selectedEnemy.minDmg,
      enemyMaxDmg: selectedEnemy.maxDmg,
      enemyMinManaBounty: selectedEnemy.minManaBounty,
      enemyMaxManaBounty: selectedEnemy.maxManaBounty,
      showProjection,
      projectionStyle,
      playerWordRef,
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
      getDmgBreakdown: damageBreakdowns,
      showTutorial,
      showDamageBreakdown,
      showNumberedTiles,
      isReshuffling,
      damageModifier,
      selectedHero
    }
  };
}
