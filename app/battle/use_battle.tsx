/* eslint-disable react-hooks/exhaustive-deps */
import { useIsFocused } from '@react-navigation/native';
import { onClearResume, onSaveGame } from '@store/savedGame/useSavedGame';
import { useAdStore } from '@store/useAdStore';
import { useGameStore } from '@store/useGameStore';
import { useMagicHutStore } from '@store/useMagicHutStore';
import { useMusicStore } from '@store/useMusicStore';
import { usePremiumStore } from '@store/usePremiumStore';
import { SfxKey, useSfxStore } from '@store/useSFXStore';
import { getBonusDamageFromLength } from '@utils/wordLengthDamageMap';
import { isValidWord } from '@utils/wordValidator';
import { HeroIcons } from 'app/constants/heroIcons';
import {
  BUBBLE_ELIGIBLE_TIERS,
  WordEffectConfig,
  WordEffectTiers
} from 'app/constants/wordEffectTier';
import Colors from 'app/foundation/colors';
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
  interpolateColor,
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

const { NORMAL, GOOD, GREAT, AMAZING, NOTHING } = WordEffectTiers;
const PROJECTILE_BASE_SIZE = 100;
const tierToSfxKey: Record<string, SfxKey> = {
  NORMAL: 'windHit',
  GOOD: 'iceHit',
  GREAT: 'earthHit',
  AMAZING: 'flameHit'
};

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
  const wordPulse = useSharedValue(1);
  const wordShake = useSharedValue(0);
  const wordConvergeScale = useSharedValue(1);
  const wordConvergeRotate = useSharedValue(0);
  const wordConvergeColor = useSharedValue(0);

  const enemyOpacity = useSharedValue(1);

  const projectionX = useSharedValue(0);
  const projectionY = useSharedValue(0);

  const playerWordRef = useRef<Text>(null);
  const enemyImageRef = useRef<View>(null);

  const windProjectileImage = require('@assets/icons/projection/wind_projectile.png');
  const earthProjectileImage = require('@assets/icons/projection/earth_projectile.png');
  const iceProjectileImage = require('@assets/icons/projection/ice_projectile.png');
  const fireProjectileImage = require('@assets/icons/projection/flame_projectile.png');

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
  const [activeProjectileSize, setActiveProjectileSize] =
    useState(PROJECTILE_BASE_SIZE);
  const [activeProjectileSource, setActiveProjectileSource] =
    useState(windProjectileImage);

  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [bubbleTier, setBubbleTier] = useState(NOTHING);
  const justSubmittedRef = useRef(false);
  const bubbleHideTimer = useRef<ReturnType<typeof setTimeout>>(0);

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

  const wordEffectTier = useMemo(() => {
    if (isValidWord(currentWord)) {
      if (selectedIndices.length >= 8) return AMAZING;
      if (selectedIndices.length >= 7) return GREAT;
      if (selectedIndices.length >= 6) return GOOD;
      if (selectedIndices.length >= 3) return NORMAL;
      return NOTHING;
    }
    return NOTHING;
  }, [selectedIndices, currentWord]);

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
        playMusic('game_over');
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

    const sfxKey = tierToSfxKey[wordEffectTier] ?? 'enemyHitNormal';
    playSfx(sfxKey);

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
      // for mini-boss / clearing the area
      if (step < 7 && stage === 5) {
        setModalContent({
          modalText: 'You clear the area!',
          showNextStageBtn: false,
          showNextAreaBtn: true,
          showHomeBtn: false
        });
        setTimeout(() => {
          setShowGameProgressModal(true);
        }, 2000);
      } else if (step === 7 && stage === 3) {
        // Clear saved game and add a statistic of beating the boss
        onClearResume();
        setBossBeatenStatistic();
        setTimeout(() => {
          playMusic('victory');
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

  const wordPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: wordPulse.value }, { translateX: wordShake.value }]
  }));

  const wordConvergeStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: wordConvergeScale.value }
      // TODO: hide rotation for now, but can be used for future animation
      // { rotate: `${wordConvergeRotate.value}deg` }
    ],
    color: interpolateColor(
      wordConvergeColor.value,
      [0, 1],
      [Colors.accent, Colors.danger]
    )
  }));

  // TODO: update to suitable animation for each tier, currently all tiers have the similar animation
  function triggerWordConverge(onDone: () => void) {
    switch (wordEffectTier) {
      case AMAZING:
        wordConvergeScale.value = withTiming(0.05, {
          duration: 1000,
          easing: Easing.in(Easing.back(8))
        });
        wordConvergeRotate.value = withTiming(1080, {
          duration: 1000,
          easing: Easing.linear
        });
        wordConvergeColor.value = withTiming(1, { duration: 800 }, finished => {
          if (finished) {
            runOnJS(onDone)();
            wordConvergeScale.value = 1;
            wordConvergeRotate.value = 0;
            wordConvergeColor.value = 0;
          }
        });
        break;
      case GREAT:
        wordConvergeScale.value = withTiming(0.05, {
          duration: 1000,
          easing: Easing.in(Easing.back(5))
        });
        wordConvergeRotate.value = withTiming(1080, {
          duration: 1000,
          easing: Easing.linear
        });
        wordConvergeColor.value = withTiming(1, { duration: 800 }, finished => {
          if (finished) {
            runOnJS(onDone)();
            wordConvergeScale.value = 1;
            wordConvergeRotate.value = 0;
            wordConvergeColor.value = 0;
          }
        });
        break;
      case GOOD:
        wordConvergeScale.value = withTiming(0.05, {
          duration: 1000,
          easing: Easing.in(Easing.back(2))
        });
        wordConvergeRotate.value = withTiming(1080, {
          duration: 1000,
          easing: Easing.linear
        });
        wordConvergeColor.value = withTiming(1, { duration: 800 }, finished => {
          if (finished) {
            runOnJS(onDone)();
            wordConvergeScale.value = 1;
            wordConvergeRotate.value = 0;
            wordConvergeColor.value = 0;
          }
        });
        break;
      case NORMAL:
        runOnJS(onDone)();
    }
  }

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

  function launchProjection(
    projectileSize = PROJECTILE_BASE_SIZE,
    projectileSource = windProjectileImage
  ) {
    if (!playerWordRef.current || !enemyImageRef.current) return;
    const halfSize = projectileSize / 2;

    playerWordRef.current.measure((_x, _y, width, height, pageX, pageY) => {
      const startX = pageX + width / 2 - halfSize;
      const startY = pageY + height / 2 - halfSize;

      // Set ending point for animation, enemy position
      enemyImageRef?.current?.measure((_ex, _ey, ew, eh, ePageX, ePageY) => {
        const targetX = ePageX + ew / 2 - halfSize;
        const targetY = ePageY + eh / 2 - halfSize;

        // reset position + show
        setActiveProjectileSize(projectileSize);
        setActiveProjectileSource(projectileSource);
        runOnJS(setShowProjection)(true);
        projectionX.value = startX;
        projectionY.value = startY;

        // animate toward enemy
        projectionX.value = withTiming(targetX, { duration: 500 });
        projectionY.value = withTiming(targetY, { duration: 500 }, () => {
          runOnJS(enemyAttacked)();
        });
      });
    });
  }

  const projectileAttribute = useMemo(() => {
    let projectileSize = PROJECTILE_BASE_SIZE;
    let projectileSource = windProjectileImage;
    switch (wordEffectTier) {
      case AMAZING:
        projectileSize = PROJECTILE_BASE_SIZE + 30;
        projectileSource = fireProjectileImage;
        break;
      case GREAT:
        projectileSize = PROJECTILE_BASE_SIZE + 20;
        projectileSource = earthProjectileImage;
        break;
      case GOOD:
        projectileSize = PROJECTILE_BASE_SIZE + 10;
        projectileSource = iceProjectileImage;
        break;
      default:
        projectileSize = PROJECTILE_BASE_SIZE;
        projectileSource = windProjectileImage;
    }

    return {
      size: projectileSize,
      source: projectileSource
    };
  }, [wordEffectTier]);

  // Reacts to letter selection changes (not to submit-triggered resets)
  useEffect(() => {
    if (justSubmittedRef.current) return; // submit flow controls visibility itself

    if (BUBBLE_ELIGIBLE_TIERS.includes(wordEffectTier)) {
      setBubbleTier(wordEffectTier);
      setBubbleVisible(true);
    } else {
      setBubbleVisible(false);
    }
  }, [wordEffectTier]);

  const handleSubmit = () => {
    cancelAnimation(wordPulse);
    cancelAnimation(wordShake);
    wordPulse.value = 1;
    wordShake.value = 0;

    // capture tier before letters reset wipe it out
    const tierAtSubmit = wordEffectTier;
    if (BUBBLE_ELIGIBLE_TIERS.includes(tierAtSubmit)) {
      justSubmittedRef.current = true;
      setBubbleTier(tierAtSubmit);
      setBubbleVisible(true);

      if (bubbleHideTimer.current) clearTimeout(bubbleHideTimer.current);
      bubbleHideTimer.current = setTimeout(() => {
        setBubbleVisible(false);
        justSubmittedRef.current = false;
      }, 1300); // linger duration after submit
    }

    const baseDamage = selectedIndices.reduce(
      (sum, i) => sum + letters[i].value,
      0
    );
    const lengthDamage = getBonusDamageFromLength(currentWordWithValue);
    const nonModifiedDamage = baseDamage + lengthDamage;

    // Submit highscore to supabase if in top 20
    setHiScore(currentWord, nonModifiedDamage);
    // Update submitted word to statistic
    setWordsStatistic(currentWord, nonModifiedDamage);

    const finishSubmit = () => {
      launchProjection(projectileAttribute.size, projectileAttribute.source);

      const newLetters = generateSomeLettersWithVowels(
        letters,
        selectedIndices
      );
      setLetters(newLetters);
      setSelectedIndices([]);
    };

    triggerWordConverge(finishSubmit);
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

  useEffect(() => {
    cancelAnimation(wordPulse);
    cancelAnimation(wordShake);

    const config = WordEffectConfig[wordEffectTier];

    wordPulse.value = withRepeat(
      withSequence(
        withTiming(config.scaleTarget, {
          duration: config.duration,
          easing: Easing.inOut(Easing.quad)
        }),
        withTiming(1, {
          duration: config.duration,
          easing: Easing.inOut(Easing.quad)
        })
      ),
      -1,
      true
    );

    // TODO: Hide shake for now
    // if (
    //   wordEffectTier === AMAZING ||
    //   wordEffectTier === GREAT ||
    //   wordEffectTier === GOOD
    // ) {
    //   wordShake.value = withRepeat(
    //     withSequence(
    //       withTiming(6, { duration: 60 }),
    //       withTiming(-6, { duration: 60 }),
    //       withTiming(4, { duration: 50 }),
    //       withTiming(-4, { duration: 50 }),
    //       withTiming(0, { duration: 40 }),
    //       withTiming(0, { duration: 200 })
    //     ),
    //     -1,
    //     false
    //   );
    // } else {
    //   wordShake.value = withTiming(0, { duration: 100 });
    // }
  }, [wordEffectTier]);

  async function triggerBattleTutorial() {
    const enabled = await getBattleTutorial();
    if (enabled) {
      setTimeout(() => {
        setShowTutorial(true);
      }, 350);
    }
  }

  // for boss or miniboss stage
  const isBossStage = useMemo(() => {
    if (step !== 7) {
      if (stage === 5) {
        return true;
      }
    } else if (step === 7) {
      if (stage === 2) {
        return true;
      }
    }
    return false;
  }, [step, stage]);

  useEffect(() => {
    return () => {
      if (bubbleHideTimer.current) clearTimeout(bubbleHideTimer.current);
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      if (isBossStage) {
        playMusic('boss');
      } else {
        playMusic('battle');
      }
      setHighScoreLowestValue();
    }
    return () => {
      stopMusic();
    };
  }, [isFocused, isBossStage]);

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
      wordPulseStyle,
      wordEffectTier,
      wordConvergeStyle,
      activeProjectileSize,
      activeProjectileSource,
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
      bubbleVisible,
      bubbleTier,
      isBossStage,
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
