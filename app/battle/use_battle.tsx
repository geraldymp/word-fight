/* eslint-disable react-hooks/exhaustive-deps */
import { useGameStore } from '@store/useGameStore';
import { useSettingsStore } from '@store/useSettingStore';
import { calculateBaseLetterDamage } from '@utils/calculateDamage';
import { generateRandomLetters } from '@utils/generateLetters';
import { getBonusDamageFromLength } from '@utils/wordLengthDamageMap';
import { isValidWord } from '@utils/wordValidator';
import { isHighscoreFilled, submitHighscore } from 'app/lib/highscoreFunctions';
import { damageBreakdown } from 'app/utils/damageBreakdown';
import { getDamageModifier } from 'app/utils/getDamageModifier';
import { setStats } from 'app/utils/Statistic/setStatistic';
import { useAudioPlayer } from 'expo-audio';
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

const enemyHit = require('@assets/sounds/enemy_hit.mp3');
const enemyBeaten = require('@assets/sounds/enemy_beaten.mp3');
const playerHit = require('@assets/sounds/player_hit.mp3');
const battleBgMusic = require('@assets/sounds/battle_screen.mp3');

export default function UseBattle() {
  const router = useRouter();

  const {
    selectedEnemy,
    setEnemyHP,
    journeyPath,
    stage,
    increaseStage,
    step,
    increaseStep,
    enemyHP,
    reduceEnemyHP,
    playerHP,
    reducePlayerHP,
    lowestHighscore,
    highScoreFilled,
    setHighScoreFilled,
    maxReshuffle,
    reshuffle,
    setReshuffle,
    damageModifier
  } = useGameStore();
  const { name, image, baseHp, minDmg, maxDmg } = selectedEnemy;
  const enemyHitSound = useAudioPlayer(enemyHit);
  const playerHitSound = useAudioPlayer(playerHit);
  const enemyBeatenSound = useAudioPlayer(enemyBeaten);

  const {
    muteMusic,
    loadSettings,
    currentSrc,
    shouldPlay,
    setAudio,
    play,
    stop
  } = useSettingsStore();
  const bgMusic = useAudioPlayer(battleBgMusic);

  const getRandomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const enemyDamage = getRandomInt(minDmg, maxDmg);
  const playerShakeAnim = useSharedValue(0);
  const enemyShakeAnim = useSharedValue(0);
  const wrongWordShakeAnim = useSharedValue(0);

  const enemyRotation = useSharedValue(0);
  const enemyScale = useSharedValue(1);
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

  const currentStage = useMemo(() => {
    return `Stage ${step === 6 ? '' : stage}`;
  }, [step, stage]);

  const currentArea = useMemo(() => {
    if (step === 1) {
      return 'Area 1';
    } else if (step === 2) {
      return 'Area 2';
    } else if (step === 4) {
      return 'Area 3';
    }
    return 'Final Boss';
  }, [step]);

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
      transform: [
        { rotate: `${enemyRotation.value}deg` },
        { scale: enemyScale.value }
      ],
      opacity: enemyOpacity.value
    };
  });

  const handleReshuffle = () => {
    if (reshuffle > 0) {
      setLetters(generateRandomLetters());
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

  const handleClear = () => {
    setSelectedIndices([]);
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
    const currentEnemyHp = useGameStore.getState().enemyHP;
    if (currentEnemyHp > 0) {
      setTimeout(() => {
        setDamageEvents(prev => [
          ...prev,
          { id: Date.now(), amount: enemyDamage, type: 'player' }
        ]);
        reducePlayerHP(enemyDamage);
        playerHitSound.seekTo(0);
        playerHitSound.play();
        triggerQuickShake(playerShakeAnim);
      }, 1200);
    }
  };

  const damageBreakdowns = damageBreakdown(currentWord, damageModifier);

  const handleSubmit = () => {
    if (currentWord.length === 0) return;

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
      enemyHitSound.seekTo(0);
      enemyHitSound.play();
      triggerQuickShake(enemyShakeAnim);

      // Submit highscore to supabase if in top 20
      setHiScore(currentWord, damage);

      // Replace used letters
      const newLetters = [...letters];
      selectedIndices.forEach(i => {
        newLetters[i] = generateRandomLetters(1)[0];
      });
      setLetters(newLetters);

      setStats(currentWord, damage);

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
        enemyBeatenSound.seekTo(0);
        enemyBeatenSound.play();
        enemyRotation.value = withTiming(720, { duration: 1000 });
        enemyScale.value = withTiming(0, { duration: 1000 });
        enemyOpacity.value = withTiming(0, { duration: 1000 });
      }, 500);
      setTimeout(() => {
        setShowGameOverModal(true);
      }, 3000);
    } else if (playerHP === 0) {
      setTimeout(() => {
        stop();
        setShowGameOverModal(true);
      }, 1500);
    }
  }, [enemyHP, playerHP]);

  useEffect(() => {
    setLetters(generateRandomLetters());
  }, []);

  useEffect(() => {
    // On mount or stage up, set enemy HP
    setEnemyHP(baseHp);
    setEnemyMaxHP(baseHp);
    setEnemyView({ name, image });
    if (reshuffle < maxReshuffle && stage > 1) {
      setReshuffle(reshuffle + 1);
    }
  }, [stage]);

  const modalContent: {
    modalText: string;
    showNextStageBtn: boolean;
    showNextAreaBtn: boolean;
  } = useMemo(() => {
    if (enemyHP === 0 && step === 6) {
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
    setLetters(generateRandomLetters());
    setSelectedIndices([]);
    setFeedback(null);
    setShowGameOverModal(false);
    enemyRotation.value = 1;
    enemyScale.value = 1;
    enemyOpacity.value = 1;
  }

  function onPressNextArea() {
    increaseStep();
    setShowGameOverModal(false);
    router.replace('/choose_area');
  }

  function onPressBackToHome() {
    setShowGameOverModal(false);
    stop();
    router.replace('/');
  }

  function onConfirm() {
    router.replace('/');
  }

  function onCancel() {
    setShowConfirmModal(false);
    play();
  }

  function onCloseMap() {
    setMapVisible(false);
  }

  // TODO: define proper type
  function onCompleteFloatingDamage(event: any) {
    setDamageEvents(prev => prev.filter(e => e.id !== event.id));
  }

  useEffect(() => {
    loadSettings();
    setAudio(battleBgMusic, true);
  }, []);

  useEffect(() => {
    if (currentSrc === battleBgMusic && shouldPlay && !muteMusic) {
      bgMusic.loop = true;
      bgMusic.play();
    } else {
      bgMusic.pause();
    }
  }, [currentSrc, shouldPlay, muteMusic, bgMusic]);

  useEffect(() => {
    const backAction = () => {
      stop();
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
      handleClear,
      onCancel,
      onCloseMap,
      onCompleteFloatingDamage,
      onConfirm,
      onPressBackToHome,
      onPressNextArea,
      onPressNextStage
    },
    states: {
      step,
      stage,
      enemyView,
      enemyStyle,
      enemyShakeAnim,
      enemyHP,
      enemyMaxHp,
      enemyMinDmg: minDmg,
      enemyMaxDmg: maxDmg,
      playerShakeAnim,
      playerHP,
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
      reshuffleCount: reshuffle,
      currentStage,
      currentArea,
      getDmgBreakdown: damageBreakdowns
    }
  };
}
