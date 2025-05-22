/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Image,
  Modal,
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
import { submitHighScoreIfTop10 } from '../lib/submitHighScoreIfTop10';
import { useGameStore } from '../store/useGameStore';
import { calculateBaseLetterDamage } from '../utils/calculateDamage';
import { generateRandomLetters } from '../utils/generateLetters';
import { getBonusDamageFromLength } from '../utils/wordLengthDamageMap';
import { isValidWord } from '../utils/wordValidator';

export default function BattleScreen() {
  const router = useRouter();
  const { selectedEnemy, setEnemyHP, increaseLevel, bonusDamage, journeyPath } =
    useGameStore();
  const { name, image, baseHp, minDmg, maxDmg, level } = selectedEnemy;

  const enemyHP = useGameStore(state => state.enemyHP);
  const reduceEnemyHP = useGameStore(state => state.reduceEnemyHP);
  const playerHP = useGameStore(state => state.playerHP);
  const reducePlayerHP = useGameStore(state => state.reducePlayerHP);
  const resetGame = useGameStore(state => state.resetGame);
  const maxReshuffles = 2;
  const getRandomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const enemyDamage = getRandomInt(minDmg, maxDmg) + bonusDamage;
  const playerShakeAnim = useSharedValue(0);
  const enemyShakeAnim = useSharedValue(0);
  const wrongWordShakeAnim = useSharedValue(0);

  const enemyRotation = useSharedValue(0);
  const enemyScale = useSharedValue(1);
  const enemyOpacity = useSharedValue(1);

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
        triggerQuickShake(playerShakeAnim);
      }, 1200);
    }
  };

  const handleSubmit = () => {
    if (currentWord.length === 0) return;

    if (isValidWord(currentWord) && currentWord.length > 3) {
      const damage =
        calculateBaseLetterDamage(currentWord) +
        getBonusDamageFromLength(currentWord);
      setDamageEvents(prev => [
        ...prev,
        { id: Date.now(), amount: damage, type: 'enemy' }
      ]);

      reduceEnemyHP(damage);

      triggerQuickShake(enemyShakeAnim);

      // Submit highscore to supabase if in top 10
      submitHighScoreIfTop10(currentWord, damage);

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
    // On mount or level up, set enemy HP
    setEnemyHP(baseHp);
    setEnemyView({ name, image });
    if (reshuffleCount < maxReshuffles && level > 1) {
      setReshuffleCount(prev => prev + 1);
    }
  }, [level]);

  const modalContent: {
    modalText: string;
    showNextLevelBtn: boolean;
    showBoosterBtn: boolean;
  } = useMemo(() => {
    if (level === 5 && enemyHP === 0) {
      return {
        modalText: 'Congratulations, you beat the game!',
        showNextLevelBtn: false,
        showBoosterBtn: false
      };
    } else if (enemyHP === 0 && level === 3) {
      return {
        modalText: 'You win the fight!',
        showNextLevelBtn: false,
        showBoosterBtn: true
      };
    } else if (enemyHP === 0) {
      return {
        modalText: 'You win the fight!',
        showNextLevelBtn: true,
        showBoosterBtn: false
      };
    } else {
      return {
        modalText: 'You lose!',
        showNextLevelBtn: false,
        showBoosterBtn: false
      };
    }
  }, [level, enemyHP]);

  return (
    <View style={styles.container}>
      {/* Enemy Display */}
      <View style={styles.enemyArea}>
        <Text style={styles.enemyTitle}>{`Level: ${level}`}</Text>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            padding: 16
          }}
        >
          <Text style={{ color: 'white', fontSize: 20 }}>{enemyView.name}</Text>
          <Animated.View style={enemyStyle}>
            <Image
              source={enemyView.image}
              resizeMode="cover"
              style={{ width: 220, height: 220 }}
            />
          </Animated.View>
        </View>
        <Animated.Text
          style={[
            styles.enemyHP,
            { transform: [{ translateX: enemyShakeAnim }] }
          ]}
        >
          Enemy HP: {enemyHP}
        </Animated.Text>
        <TouchableOpacity
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
        </TouchableOpacity>
      </View>

      {/* Letters + Word Builder */}
      <View style={styles.playerArea}>
        <Animated.Text
          style={[
            { fontSize: 18, color: 'white', marginVertical: 10 },
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
      <Modal
        visible={showGameOverModal}
        transparent
        animationType="slide"
        onRequestClose={() => {}}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.6)'
          }}
        >
          <View
            style={{
              backgroundColor: '#222',
              padding: 30,
              borderRadius: 12,
              alignItems: 'center'
            }}
          >
            <Text style={{ color: 'white', fontSize: 24, marginBottom: 10 }}>
              {modalContent.modalText}
            </Text>
            <View style={{ gap: 6 }}>
              {modalContent.showNextLevelBtn && (
                <Button
                  title="Next Level"
                  onPress={() => {
                    increaseLevel();
                    setLetters(generateRandomLetters());
                    setSelectedIndices([]);
                    setFeedback(null);
                    setShowGameOverModal(false);
                    router.replace('/choose_enemy');
                  }}
                />
              )}
              {modalContent.showBoosterBtn && (
                <Button
                  title="Go to Booster Selection"
                  onPress={() => {
                    increaseLevel();
                    setLetters(generateRandomLetters());
                    setSelectedIndices([]);
                    setFeedback(null);
                    setShowGameOverModal(false);
                    router.replace('/choose_booster');
                  }}
                />
              )}
              <Button
                title="Back to Home"
                onPress={() => {
                  resetGame();
                  router.replace('/');
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  enemyTitle: { fontSize: 18, color: 'white' },
  enemyHP: { fontSize: 18, color: '#ffaaaa', alignSelf: 'center' },
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
  invalid: { color: 'salmon', marginTop: 10 }
});
