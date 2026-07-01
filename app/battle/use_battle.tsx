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
import {
  getLowestHighscore,
  getLowestMonthlyHighscore,
  submitHighscore
} from 'app/lib/highscoreFunctions';
import { useHeroStore } from 'app/store/useHeroStore';
import { usePlayerStore } from 'app/store/usePlayerStore';
import { ILetter } from 'app/types/ILetter';
import { damageBreakdown } from 'app/utils/damageBreakdown';
import { generateRandomLettersWithVowels } from 'app/utils/generateLettersWithVowels';
import { generateSomeLettersWithVowels } from 'app/utils/generateSomeLetters';
import { getDamageFromUpgrades } from 'app/utils/getDamageFromUpgrades';
import { getDamageModifier } from 'app/utils/getDamageModifier';
import { getRandomInt } from 'app/utils/getRandomInt';
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
  cancelAnimation,
  Easing,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
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
  const setLowestHighScore = useGameStore(s => s.setLowestHighScore);
  const setLowestMonthlyHighScore = useGameStore(
    s => s.setLowestMonthlyHighScore
  );

  // --- Current Run Statistic ---
  const highestDamage = useGameStore(s => s.highestDamage);
  const setHighestDamage = useGameStore(s => s.setHighestDamage);
  const longestWordLength = useGameStore(s => s.longestWordLength);
  const setLongestWordLength = useGameStore(s => s.setLongestWordLength);
  const wordsUsed = useGameStore(s => s.wordsUsed);
  const increaseWordsUsed = useGameStore(s => s.increaseWordsUsed);
  const damageDealt = useGameStore(s => s.damageDealt);
  const increaseDamageDealt = useGameStore(s => s.increaseDamageDealt);

  // -- Shop Progress --
  const currentPotionUsed = useAdStore(
    state => state.magicHutPotion.currentPotionUsed
  );
  const purchasedItemIds = useMagicHutStore(state => state.purchasedItemIds);

  // -- Hero Icon --
  const selectedHeroId = useHeroStore(state => state.selectedHeroId);
  const selectedHero = HeroIcons.find(h => h.id === selectedHeroId);

  // -- Exp System --
  const addTempExp = usePlayerStore(state => state.addTempExp);
  const applyTempExp = usePlayerStore(state => state.applyTempExp);
  const tempBattleExp = usePlayerStore(state => state.tempBattleExp);
  const upgrades = usePlayerStore(state => state.upgrades);

  const playerShakeAnim = useSharedValue(0);
  const enemyShakeAnim = useSharedValue(0);
  const enemyAttackAnim = useSharedValue(0);
  const enemyIdleScale = useSharedValue(1);
  const enemyIdleY = useSharedValue(0);
  const wrongWordShakeAnim = useSharedValue(0);

  const enemyOpacity = useSharedValue(1);

  const projectionX = useSharedValue(0);
  const projectionY = useSharedValue(0);

  const playerWordRef = useRef<Text>(null);
  const enemyImageRef = useRef<View>(null);

  const [enemyMaxHp, setEnemyMaxHP] = useState(selectedEnemy.baseHp);
  const [letters, setLetters] = useState<ILetter[]>([]); // Letters in word builder
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]); // Indexes of selected letters
  const [showGameProgressModal, setShowGameProgressModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [damageEvents, setDamageEvents] = useState<
    { id: number; amount: number; type: 'player' | 'enemy' }[]
  >([]);
  const [enemyFlashActive, setEnemyFlashActive] = useState(false);
  const [showProjection, setShowProjection] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isReshuffling, setIsReshuffling] = useState(false);
  const [modalContent, setModalContent] = useState({
    modalText: '',
    showNextStageBtn: false,
    showNextAreaBtn: false,
    showHomeBtn: false
  });
  const [modalFinishedGame, setModalFinishedGame] = useState<boolean>(false);

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

  function triggerEnemyFlash() {
    setEnemyFlashActive(true);
    setTimeout(() => setEnemyFlashActive(false), 80);
  }

  function playerAttacked() {
    const enemyDamage = getRandomInt(
      selectedEnemy.minDmg,
      selectedEnemy.maxDmg,
      5
    );
    setDamageEvents(prev => [
      ...prev,
      { id: Date.now(), amount: enemyDamage, type: 'player' }
    ]);
    reducePlayerHP(enemyDamage);
    playSfx('playerHit');
    triggerQuickShake(playerShakeAnim);
    const currentPlayerHP = useGameStore.getState().playerHP;
    if (currentPlayerHP === 0) {
      onClearResume();
      setTimeout(() => {
        setModalFinishedGame(true);
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
    const dmgFromUpgrade = getDamageFromUpgrades(currentWord, upgrades);
    const totalDamage =
      baseDamage + lengthDamage + dmgModifier + dmgFromUpgrade;
    setShowProjection(false);
    reduceEnemyHP(totalDamage);
    playSfx('enemyHit');
    triggerEnemyFlash();
    triggerQuickShake(enemyShakeAnim);
    setDamageEvents(prev => [
      ...prev,
      { id: Date.now(), amount: totalDamage, type: 'enemy' }
    ]);

    // add value to current run statistic
    setHighestDamage(totalDamage);
    setLongestWordLength(currentWordWithValue.length);
    increaseWordsUsed();
    increaseDamageDealt(totalDamage);

    const currentEnemyHp = useGameStore.getState().enemyHP;

    // Enemy hit back if not beaten
    if (currentEnemyHp > 0) {
      setTimeout(() => {
        triggerEnemyAttack();
      }, 1200);
    } else {
      cancelAnimation(enemyIdleScale);
      cancelAnimation(enemyIdleY);
      enemyIdleScale.value = withTiming(1, { duration: 150 });
      enemyIdleY.value = withTiming(0, { duration: 150 });
      addTempExp(selectedEnemy.exp);
      if (stage === 3) {
        setModalContent({
          modalText: 'You clear the area!',
          showNextStageBtn: false,
          showNextAreaBtn: true,
          showHomeBtn: false
        });
        setTimeout(() => {
          setShowGameProgressModal(true);
        }, 2000);
      } else if (step === 7) {
        // Clear saved game and add a statistic of beating the boss
        onClearResume();
        setBossBeatenStatistic();
        setTimeout(() => {
          setModalFinishedGame(true);
        }, 2000);
      } else {
        setModalContent({
          modalText: 'You beat the enemy!',
          showNextStageBtn: true,
          showNextAreaBtn: false,
          showHomeBtn: false
        });
        setTimeout(() => {
          setShowGameProgressModal(true);
        }, 2000);
      }

      const manaGained = getRandomInt(
        selectedEnemy.minManaBounty,
        selectedEnemy.maxManaBounty
      );
      setTimeout(() => {
        playSfx('enemyBeaten');
        enemyOpacity.value = withTiming(0, { duration: 1500 });
        increaseMana(manaGained);
      }, 500);
    }
  }

  const enemyStyle = useAnimatedStyle(() => ({
    opacity: enemyOpacity.value,
    transform: [
      { translateX: enemyShakeAnim.value },
      { translateY: enemyAttackAnim.value + enemyIdleY.value },
      { scale: 1 * enemyIdleScale.value }
    ]
  }));

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

  const handleCancel = () => {
    setSelectedIndices([]);
  };

  const handleLetterPress = (index: number) => {
    if (!selectedIndices.includes(index)) {
      setSelectedIndices([...selectedIndices, index]);
    } else {
      setSelectedIndices([...selectedIndices.filter(id => id !== index)]);
    }
  };

  async function setHighScoreLowestValue() {
    const lowestHS: number = await getLowestHighscore();
    const lowestMonthlyHS: number = await getLowestMonthlyHighscore();
    setLowestHighScore(lowestHS);
    setLowestMonthlyHighScore(lowestMonthlyHS);
  }

  async function setHiScore(word: string, dmg: number) {
    const lowestHighscore = useGameStore.getState().lowestHighscore;
    const lowestMonthlyHighscore =
      useGameStore.getState().lowestMonthlyHighscore;
    if (dmg > lowestHighscore) {
      submitHighscore(word, dmg, 'all time');
    } else if (dmg > lowestMonthlyHighscore) {
      submitHighscore(word, dmg, 'monthly');
    }
  }

  const damageBreakdowns = useMemo(
    () => damageBreakdown(currentWordWithValue, damageModifier, upgrades),
    [currentWordWithValue, damageModifier, upgrades]
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
    const newLetters = generateSomeLettersWithVowels(letters, selectedIndices);
    setLetters(newLetters);
    setSelectedIndices([]);
  };

  useEffect(() => {
    startEnemyIdleAnimation();
    setLetters(generateRandomLettersWithVowels());
    triggerBattleTutorial();
  }, []);

  function onPressNextStage() {
    increaseStage();
    setEnemyHP(useGameStore.getState().selectedEnemy.baseHp);
    setEnemyMaxHP(useGameStore.getState().selectedEnemy.baseHp);
    setLetters(generateRandomLettersWithVowels());
    setSelectedIndices([]);
    setShowGameProgressModal(false);
    enemyOpacity.value = 1;
    startEnemyIdleAnimation();
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
        tempExp: tempBattleExp,
        currentPotionUsed: currentPotionUsed,
        purchasedItem: JSON.stringify(purchasedItemIds),
        statHighestDamage: highestDamage,
        statLongestWordLength: longestWordLength,
        statWordsUsed: wordsUsed,
        statDamageDealt: damageDealt
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

  const handleCloseModalFinishedGame = () => {
    applyTempExp();
    setModalFinishedGame(false);
    router.replace('/');
  };

  const disableReshuffle = useMemo(() => {
    if (isReshuffling) {
      return true;
    } else if (reshuffle === 0) {
      return true;
    }
    return false;
  }, [isReshuffling, reshuffle]);

  const disablePlayBtn = useMemo(() => {
    return !(isValidWord(currentWord) && currentWord.length >= 3);
  }, [currentWord]);

  function startEnemyIdleAnimation() {
    enemyIdleScale.value = withRepeat(
      withSequence(
        withTiming(1.02, { duration: 1200, easing: Easing.inOut(Easing.quad) }),
        withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      true
    );
    enemyIdleY.value = withRepeat(
      withSequence(
        withTiming(-3, { duration: 1200, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 1200, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      true
    );
  }

  async function triggerBattleTutorial() {
    const enabled = await getBattleTutorial();
    if (enabled) {
      setTimeout(() => {
        setShowTutorial(true);
      }, 350);
    }
  }

  useEffect(() => {
    if (isFocused) {
      playMusic('battle');
      setHighScoreLowestValue();
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
      handleCancel,
      handleSubmit,
      onCancelToHome,
      onCompleteFloatingDamage,
      onConfirmToHome,
      onPressBackToHome,
      onPressNextArea,
      onPressNextStage,
      onGiveUp,
      handleCloseTutorial,
      handleCloseModalFinishedGame
    },
    states: {
      areaDetail: area,
      stage,
      enemyStyle,
      enemyFlashActive,
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
      disableReshuffle,
      disablePlayBtn,
      damageModifier,
      selectedHero,
      modalFinishedGame,
      currentRunStatistic: {
        // same of props from FinishGameModal.tsx
        hpLeft: playerHP,
        manaLeft: mana,
        highestDamage,
        longestWordLength,
        wordsUsed,
        damageDealt
      }
    }
  };
}
