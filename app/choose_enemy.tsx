// app/choose_enemy.tsx
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { enemies } from '../constants/enemies'; // Adjust path if needed
import { useGameStore } from '../store/useGameStore';
import { IEnemy } from '../types/IEnemy';
import { remapEnemyToJourney } from '../utils/remapEnemyToJourney';

export default function ChooseEnemyScreen() {
  const { level, addToJourney } = useGameStore();
  const setSelectedEnemy = useGameStore(state => state.setSelectedEnemy);
  const router = useRouter();

  const [choices, setChoices] = useState<IEnemy[]>([]);

  useEffect(() => {
    // Get random 2 enemies from level 1 for now
    const filtered = enemies.filter(e => e.level === level);
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    setChoices(shuffled.slice(0, 2));
  }, [level]); // dep from copilot

  const handleChoose = (enemy: IEnemy) => {
    setSelectedEnemy(enemy);
    const result = choices.map(enemies => ({
      ...enemies,
      chosen: enemies.name === enemy.name
    }));
    const mappedResult = remapEnemyToJourney(result);
    addToJourney(mappedResult);
    router.replace('/battle');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Enemy</Text>
      <FlatList
        data={choices}
        keyExtractor={item => item.name}
        horizontal
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleChoose(item)}
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.stats}>HP: {item.baseHp}</Text>
            <Text style={styles.stats}>
              DMG: {item.minDmg} - {item.maxDmg}
            </Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        style={{ height: 300, flexGrow: 0 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20
  },
  list: {
    gap: 16,
    paddingHorizontal: 20
  },
  card: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    width: 150,
    height: 240
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 12,
    resizeMode: 'contain'
  },
  name: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center'
  },
  stats: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center'
  }
});
