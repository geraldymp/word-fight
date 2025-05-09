/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Button, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FloatingDamage } from '../components/FloatingDamage';
import { enemies } from '../constants/enemies';
import { useGameStore } from '../store/useGameStore';
import { calculateDamage } from '../utils/calculateDamage';
import { generateRandomLetters } from '../utils/generateLetters';
import { isValidWord } from '../utils/wordValidator';

export default function BattleScreen() {
  const { level, getEnemyStats, setEnemyHP, setPlayerHP, increaseLevel } = useGameStore();

  const enemyHP = useGameStore((state) => state.enemyHP);
  const reduceEnemyHP = useGameStore((state) => state.reduceEnemyHP);
  const playerHP = useGameStore((state) => state.playerHP);
  const reducePlayerHP = useGameStore((state) => state.reducePlayerHP);
  const resetGame = useGameStore((state) => state.resetGame);
  const maxReshuffles = 2;
  const { damageRange } = getEnemyStats(level);
  const getRandomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const enemyDamage = getRandomInt(damageRange[0], damageRange[1]);
  const playerShakeAnim = useRef(new Animated.Value(0)).current;
  const enemyShakeAnim = useRef(new Animated.Value(0)).current;

  const [letters, setLetters] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<'valid' | 'invalid' | 'short' | null>(null);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [reshuffleCount, setReshuffleCount] = useState(0);
  const [damageEvents, setDamageEvents] = useState<
    { id: number; amount: number; type: 'player' | 'enemy' }[]
  >([]);
  const [enemyView, setEnemyView] = useState<{ name: string; image: any }>({ name: '', image: null })

  const triggerShake = (animRef: Animated.Value) => {
    Animated.sequence([
      Animated.timing(animRef, {
        toValue: 5,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(animRef, {
        toValue: -5,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(animRef, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };


  const handleReshuffle = () => {
    if (reshuffleCount < maxReshuffles) {
      setLetters(generateRandomLetters());
      setSelectedIndices([]);
      setReshuffleCount((prev) => prev + 1);
    }
  };

  const currentWord = selectedIndices.map(i => letters[i]).join('');

  const handleLetterPress = (index: number) => {
    if (!selectedIndices.includes(index)) {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  const handleClear = () => {
    setSelectedIndices([]);
  };

  const enemyHitBack = () => {
    const currentEnemyHp = useGameStore.getState().enemyHP;
    if (currentEnemyHp > 0) {
      setTimeout(() => {
        setDamageEvents((prev) => [
          ...prev,
          { id: Date.now(), amount: enemyDamage, type: 'player' },
        ]);
        reducePlayerHP(enemyDamage);
        triggerShake(playerShakeAnim);
      }, 1200);
    }
  }

  const handleSubmit = () => {
    if (currentWord.length === 0) return;

    if (isValidWord(currentWord) && currentWord.length > 3) {
      const damage = calculateDamage(currentWord) + currentWord.length;
      setDamageEvents((prev) => [
        ...prev,
        { id: Date.now(), amount: damage, type: 'enemy' },
      ]);

      reduceEnemyHP(damage);
      triggerShake(enemyShakeAnim);
      setFeedback('valid');

      // Replace used letters
      const newLetters = [...letters];
      selectedIndices.forEach((i) => {
        newLetters[i] = generateRandomLetters(1)[0];
      });
      setLetters(newLetters);

      enemyHitBack()

    } else {
      if (currentWord.length <= 3) {
        setFeedback('short');
      }
       else if (!isValidWord(currentWord)) {
        setFeedback('invalid');
      }
    }

    setSelectedIndices([]);
    setTimeout(() => setFeedback(null), 2000);
  };

  useEffect(() => {
    if (enemyHP === 0 || playerHP === 0) {
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
    const { hp } = getEnemyStats(level);
    setEnemyHP(hp);
    setEnemyView({ name: enemies[level - 1].name, image: enemies[level - 1].image })
    setPlayerHP(playerHP + (level * 2))
  }, [level]);

  const modalContent: { modalText: string, showNextLevelBtn: boolean } = useMemo(() => {
    if (level === 5) {
      return { modalText: 'Congratulations, you beat the game!', showNextLevelBtn: false }
    } else if (enemyHP === 0) {
      return { modalText: 'You win the fight!', showNextLevelBtn: true }
    } else {
      return { modalText: 'You lose!', showNextLevelBtn: false }
    }
  }, [level, enemyHP])

  return (
    <View style={styles.container}>
      {/* Enemy Display */}
      <View style={styles.enemyArea}>
        <Text style={styles.enemyTitle}>{`Level: ${level}`}</Text>
        <View style={{ flexDirection: 'column', alignItems: 'center', gap: 16, padding: 16 }}>
          <Text style={{ color: 'white', fontSize: 20 }}>{enemyView.name}</Text>
          <Image source={(enemyView.image)} resizeMode='cover' style={{ width: 250, height: 250 }} />
        </View>
        <Animated.Text
          style={[styles.enemyHP, { transform: [{ translateX: enemyShakeAnim }] }]}
        >
          Enemy HP: {enemyHP}
        </Animated.Text>
      </View>

      {/* Letters + Word Builder */}
      <View style={styles.playerArea}>

        <Animated.Text
          style={[{ fontSize: 18, color: 'white', marginVertical: 10 }, { transform: [{ translateX: playerShakeAnim }] }]}
        >
          Player HP: {playerHP}
        </Animated.Text>

        <Text style={styles.currentWord}>{currentWord ? currentWord.toUpperCase() : '-'}</Text>

        <FlatList
          data={letters}
          keyExtractor={(_, i) => i.toString()}
          numColumns={4}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.letterTile,
                selectedIndices.includes(index) && styles.selectedTile,
              ]}
              onPress={() => handleLetterPress(index)}
            >
              <Text style={styles.letter}>{item.toUpperCase()}</Text>
            </TouchableOpacity>
          )}
        />

        {feedback === 'valid' && <Text style={styles.valid}>✅ Good word!</Text>}
        {feedback === 'invalid' && <Text style={styles.invalid}>❌ Invalid word</Text>}
        {feedback === 'short' && <Text style={styles.invalid}>❌ At least 4 letter</Text>}

        {/* Controls */}
        <View style={styles.controls}>
          <Button
            title={`Reshuffle (${maxReshuffles - reshuffleCount} left)`}
            onPress={handleReshuffle}
            disabled={reshuffleCount >= maxReshuffles}
          />
          <Button title="Clear" onPress={handleClear} />
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </View>
      <Modal
        visible={showGameOverModal}
        transparent
        animationType="slide"
        onRequestClose={() => { }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}
        >
          <View
            style={{
              backgroundColor: '#222',
              padding: 30,
              borderRadius: 12,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 24, marginBottom: 10 }}>
              {modalContent.modalText}
            </Text>
            <View style={{ gap: 6 }}>
              {modalContent.showNextLevelBtn && <Button
                title="Next Level"
                onPress={() => {
                  increaseLevel()
                  setLetters(generateRandomLetters());
                  setSelectedIndices([]);
                  setFeedback(null);
                  setShowGameOverModal(false);
                }}
              />}
              <Button
                title="Restart Game"
                onPress={() => {
                  resetGame();
                  setLetters(generateRandomLetters());
                  setSelectedIndices([]);
                  setFeedback(null);
                  setShowGameOverModal(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      {damageEvents.map((event) => (
        <FloatingDamage
          key={event.id}
          amount={event.amount}
          type={event.type}
          onComplete={() =>
            setDamageEvents((prev) => prev.filter((e) => e.id !== event.id))
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
    alignItems: 'center',
  },
  currentWord: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  letterTile: {
    width: 40,
    height: 40,
    margin: 5,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  selectedTile: {
    backgroundColor: '#aaf',
  },
  letter: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    marginVertical: 24,
    gap: 10,
  },
  valid: { color: 'lightgreen', marginTop: 10 },
  invalid: { color: 'salmon', marginTop: 10 },
});
