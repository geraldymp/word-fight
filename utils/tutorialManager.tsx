// app/storage/tutorialStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from 'app/constants/storageKeys';

const { BATTLE_TUTORIAL_ENABLED, MAGIC_HUT_TUTORIAL_ENABLED } = STORAGE_KEYS;

async function setItem(key: string, value: boolean): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error saving ${key}:`, err);
  }
}

async function getItem(key: string): Promise<boolean> {
  try {
    const stored = await AsyncStorage.getItem(key);
    if (stored === null) {
      return true;
    }
    return JSON.parse(stored);
  } catch (err) {
    console.warn(`Error loading ${key}:`, err);
    return true; // fallback to show tutorial
  }
}

// --- Battle Tutorial ---
export const setBattleTutorial = (enabled: boolean) =>
  setItem(BATTLE_TUTORIAL_ENABLED, enabled);

export const getBattleTutorial = () => getItem(BATTLE_TUTORIAL_ENABLED);

// --- Magic Hut Tutorial ---
export const setMagicHutTutorial = (enabled: boolean) =>
  setItem(MAGIC_HUT_TUTORIAL_ENABLED, enabled);

export const getMagicHutTutorial = () => getItem(MAGIC_HUT_TUTORIAL_ENABLED);
