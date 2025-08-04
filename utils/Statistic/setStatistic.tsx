import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from 'app/constants/storageKeys';

export async function setStats(word: string, damage: number) {
  const currentStats = await AsyncStorage.getItem(STORAGE_KEYS.STATS_KEY);
  let stats = {
    totalWords: 0,
    totalLength: 0,
    totalDamage: 0
  };

  if (currentStats) {
    stats = JSON.parse(currentStats);
  }

  stats.totalWords += 1;
  stats.totalLength += word.length;
  stats.totalDamage += damage;

  await AsyncStorage.setItem(STORAGE_KEYS.STATS_KEY, JSON.stringify(stats));
}
