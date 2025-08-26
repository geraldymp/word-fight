import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from 'app/constants/storageKeys';

export async function resetAllStats() {
  await AsyncStorage.removeItem(STORAGE_KEYS.STATS_KEY);
}
