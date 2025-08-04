import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from 'app/constants/storageKeys';

export async function resetStats() {
  await AsyncStorage.removeItem(STORAGE_KEYS.STATS_KEY);
}
