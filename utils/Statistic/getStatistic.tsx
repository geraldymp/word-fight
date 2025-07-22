import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from 'app/constants/storageKeys';

export async function getStats() {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.STATS_KEY);
  if (!raw) return  {
    averageLength: 0,
    averageDamage: 0
  };;

  const stats = JSON.parse(raw);
  const averageLength = stats.totalWords > 0
    ? stats.totalLength / stats.totalWords
    : 0;

  const averageDamage = stats.totalWords > 0
    ? stats.totalDamage / stats.totalWords
    : 0;

  return {
    averageLength,
    averageDamage
  };
}
