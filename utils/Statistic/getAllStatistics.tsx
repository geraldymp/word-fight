import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from 'app/constants/storageKeys';
import { ISavedStats } from 'app/types/ISavedStats';
import { IShowedStats } from 'app/types/IShowedStats';

const DEFAULT_SAVED_STATS: ISavedStats = {
  totalWords: 0,
  totalLength: 0,
  totalDamage: 0,
  totalBossBeaten: 0
};

// a global promise that represents "the last write in progress"
let writeQueue: Promise<any> = Promise.resolve();

/**
 * Ensures all updates to AsyncStorage run sequentially.
 * Each call waits for the previous one to finish before running.
 */
function withLock<T>(operation: () => Promise<T>): Promise<T> {
  // Chain this operation after the previous one in the queue
  const nextOperation = writeQueue.then(() => operation());

  // Update the queue reference, but swallow errors so the chain keeps alive
  writeQueue = nextOperation.catch(() => {});

  // Return the real promise so caller can await the result
  return nextOperation;
}

export async function updateStats(mutator: (stats: ISavedStats) => void) {
  return withLock(async () => {
    const s = await loadStats();
    mutator(s);
    await saveStats(s);
  });
}

export async function loadStats(): Promise<ISavedStats> {
  const json = await AsyncStorage.getItem(STORAGE_KEYS.STATS_KEY);
  return json ? (JSON.parse(json) as ISavedStats) : { ...DEFAULT_SAVED_STATS };
}

export async function saveStats(s: ISavedStats) {
  await AsyncStorage.setItem(STORAGE_KEYS.STATS_KEY, JSON.stringify(s));
}

export async function getAllStats(): Promise<IShowedStats> {
  const s = await loadStats();
  return {
    averageDamage: s.totalWords ? s.totalDamage / s.totalWords : 0,
    averageLength: s.totalWords ? s.totalLength / s.totalWords : 0,
    totalBossBeaten: s.totalBossBeaten
  };
}
