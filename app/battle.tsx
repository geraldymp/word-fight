/* eslint-disable react-hooks/exhaustive-deps */
import { useAudioPlayer } from 'expo-audio';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  BackHandler,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from 'react-native-reanimated';
import {
  IcCancel,
  IcFight,
  IcRearrange,
  IcReshuffle
} from '../assets/icons/battle';
import { ActionBottomButton } from '../components/Battle/ActionBottomButton';
import { FloatingDamage } from '../components/FloatingDamage';
import { JourneyMapModal } from '../components/JourneyMapModal';
// import { submitHighScoreIfTop10 } from '../lib/submitHighScoreIfTop10';
import { Cinzel_700Bold, useFonts } from '@expo-google-fonts/cinzel';
import { GameProgressModal } from '../components/Battle/GameProgressModal';
import { useGameStore } from '../store/useGameStore';
import { useSettingsStore } from '../store/useSettingStore';
import { calculateBaseLetterDamage } from '../utils/calculateDamage';
import { generateRandomLetters } from '../utils/generateLetters';
import { getBonusDamageFromLength } from '../utils/wordLengthDamageMap';
import { isValidWord } from '../utils/wordValidator';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const enemyHit = require('../assets/sounds/enemy_hit.mp3');
const enemyBeaten = require('../assets/sounds/enemy_beaten.mp3');
const playerHit = require('../assets/sounds/player_hit.mp3');
const battleBgMusic = require('../assets/sounds/battle_screen.mp3');

export default function BattleScreen() {
  const router = useRouter();

  const {
    selectedEnemy,
    setEnemyHP,
    bonusDamage,
    journeyPath,
    stage,
    increaseStage,
    step,
    increaseStep,
    enemyHP,
    reduceEnemyHP,
    playerHP,
    reducePlayerHP,
    resetGame
  } = useGameStore();
  const { name, image, baseHp, minDmg, maxDmg } = selectedEnemy;
  const enemyHitSound = useAudioPlayer(enemyHit);
  const playerHitSound = useAudioPlayer(playerHit);
  const enemyBeatenSound = useAudioPlayer(enemyBeaten);

  const { muteMusic } = useSettingsStore();
  const bgMusic = useAudioPlayer(battleBgMusic);

  const [fontsLoaded] = useFonts({
    Cinzel_700Bold
  });

  const maxReshuffles = 2;
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
  const [reshuffleCount, setReshuffleCount] = useState(2);
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
      transform: [
        { rotate: `${enemyRotation.value}deg` },
        { scale: enemyScale.value }
      ],
      opacity: enemyOpacity.value
    };
  });

  const handleReshuffle = () => {
    if (reshuffleCount > 0) {
      setLetters(generateRandomLetters());
      setSelectedIndices([]);
      setReshuffleCount(prev => prev - 1);
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

  const handleSubmit = () => {
    if (currentWord.length === 0) return;

    if (isValidWord(currentWord) && currentWord.length > 3) {
      const damage =
        calculateBaseLetterDamage(currentWord) +
        getBonusDamageFromLength(currentWord) +
        20;
      setDamageEvents(prev => [
        ...prev,
        { id: Date.now(), amount: damage + bonusDamage, type: 'enemy' }
      ]);

      reduceEnemyHP(damage + bonusDamage);
      enemyHitSound.seekTo(0);
      enemyHitSound.play();
      triggerQuickShake(enemyShakeAnim);

      // Submit highscore to supabase if in top 10
      // submitHighScoreIfTop10(currentWord, damage);

      // Replace used letters
      const newLetters = [...letters];
      selectedIndices.forEach(i => {
        newLetters[i] = generateRandomLetters(1)[0];
      });
      setLetters(newLetters);

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
    if (reshuffleCount < maxReshuffles && stage > 1) {
      setReshuffleCount(prev => prev + 1);
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

  // hidden music for now
  // useEffect(() => {
  //   if (!muteMusic) {
  //     bgMusic.loop = true;
  //     if (bgMusic.isLoaded) {
  //       bgMusic.play();
  //     }
  //   } else {
  //     bgMusic.pause();
  //   }
  // }, [muteMusic, bgMusic]);

  useEffect(() => {
    const backAction = () => {
      // bgMusic.pause();
      router.replace('/');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [router]);

  return (
    <View style={styles.container}>
      {/* Enemy Display */}
      <View style={styles.enemyArea}>
        <Text
          style={styles.stageStyle}
        >{`Stage: ${step === 6 ? 'Final' : stage}`}</Text>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            padding: 16
          }}
        >
          <Text style={styles.enemyName}>{enemyView.name}</Text>
          <Animated.View style={[enemyStyle]}>
            <Image
              source={enemyView.image}
              resizeMode="cover"
              style={{ width: screenWidth / 2, height: screenHeight / 4 }}
            />
          </Animated.View>
        </View>
        <Animated.Text
          style={[
            styles.enemyHP,
            { transform: [{ translateX: enemyShakeAnim }] }
          ]}
        >
          Enemy HP: {enemyHP} / {enemyMaxHp}
        </Animated.Text>

        {/* map hidden for now */}
        {/* <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 16,
            left: 16
          }}
          onPress={() => setMapVisible(true)}
        >
          <Image
            source={require('../assets/icons/battle/map.png')}
            resizeMode="contain"
            style={{ width: 32, height: 32 }}
          />
        </TouchableOpacity> */}
      </View>

      {/* Letters + Word Builder */}
      <View style={styles.playerArea}>
        <Animated.Text
          style={[
            { fontSize: 18, color: 'white', marginVertical: 6 },
            { transform: [{ translateX: playerShakeAnim }] }
          ]}
        >
          Player HP: {playerHP}
        </Animated.Text>

        <Text style={styles.currentWord}>
          {currentWord ? currentWord.toUpperCase() : '-'}
        </Text>

        <Animated.FlatList
          data={letters}
          keyExtractor={(_, i) => i.toString()}
          numColumns={5}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.letterTile,
                selectedIndices.includes(index) && styles.selectedTile
              ]}
              onPress={() => handleLetterPress(index)}
              testID={`letter-${item}`}
            >
              <Text style={styles.letter}>{item.toUpperCase()}</Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          style={[
            { flexGrow: 0 },
            { transform: [{ translateX: wrongWordShakeAnim }] }
          ]}
        />

        {feedback === 'invalid' && (
          <Text style={styles.invalid}>Invalid word</Text>
        )}
        {feedback === 'short' && (
          <Text style={styles.invalid}>At least 4 letter</Text>
        )}

        {/* Controls */}
        <View style={styles.controls}>
          <ActionBottomButton
            icon={<IcReshuffle width={18} height={18} />}
            onPress={handleReshuffle}
            disabled={reshuffleCount === 0}
            counter={reshuffleCount}
          />
          <ActionBottomButton
            icon={<IcRearrange width={18} height={18} />}
            onPress={handleRearrange}
          />
          <ActionBottomButton
            icon={<IcCancel width={18} height={18} />}
            onPress={handleClear}
          />
          <ActionBottomButton
            icon={<IcFight width={18} height={18} />}
            onPress={handleSubmit}
          />
        </View>
      </View>
      <GameProgressModal
        showModal={showGameOverModal}
        modalContent={modalContent}
        onPressNextStage={() => {
          increaseStage();
          setLetters(generateRandomLetters());
          setSelectedIndices([]);
          setFeedback(null);
          setShowGameOverModal(false);
          enemyRotation.value = 1;
          enemyScale.value = 1;
          enemyOpacity.value = 1;
        }}
        onPressNextArea={() => {
          increaseStep();
          setShowGameOverModal(false);
          // bgMusic.pause();
          router.replace('/choose_area');
        }}
        onPressBackToHome={() => {
          resetGame();
          setShowGameOverModal(false);
          // bgMusic.pause();
          router.replace('/');
        }}
      />
      <JourneyMapModal
        visible={mapVisible}
        onClose={() => setMapVisible(false)}
        journey={journeyPath}
      />
      {damageEvents.map(event => (
        <FloatingDamage
          key={event.id}
          amount={event.amount}
          type={event.type}
          onComplete={() =>
            setDamageEvents(prev => prev.filter(e => e.id !== event.id))
          }
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  enemyArea: {
    flex: 1,
    backgroundColor: '#330000',
    padding: 16
  },
  stageStyle: {
    fontSize: 18,
    color: 'white'
  },
  enemyName: {
    fontSize: 28,
    color: '#ffe08a',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#ffcc00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 1.2,
    fontFamily: 'Cinzel_700Bold'
  },
  enemyHP: {
    fontSize: 18,
    color: '#ffaaaa',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    marginBottom: 16
  },
  playerArea: {
    flex: 1,
    padding: 10,
    backgroundColor: '#001a33',
    alignItems: 'center'
  },
  currentWord: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10
  },
  letterTile: {
    width: 28,
    height: 28,
    margin: 4,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6
  },
  selectedTile: {
    backgroundColor: '#aaf'
  },
  letter: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  controls: {
    flexDirection: 'row',
    gap: 16,
    position: 'absolute',
    bottom: 24
  },
  invalid: {
    color: 'salmon',
    marginTop: 10
  }
});
