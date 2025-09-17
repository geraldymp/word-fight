import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from 'app/constants/storageKeys';

function generateRandomUsername(): string {
  const random = Math.random().toString(36).substring(2, 8); // random 6 chars
  return `user_${random}`;
}

export async function getUsername(): Promise<string> {
  try {
    let username = await AsyncStorage.getItem(STORAGE_KEYS.USERNAME);

    if (!username) {
      username = generateRandomUsername(); // generate random username if no username exist
      await AsyncStorage.setItem(STORAGE_KEYS.USERNAME, username);
    }

    return username;
  } catch (e) {
    console.error('Failed to load username', e);
    return generateRandomUsername(); // fallback
  }
}

export async function setUsername(newName: string): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USERNAME, newName);
    await AsyncStorage.setItem(
      STORAGE_KEYS.USERNAME_LAST_CHANGED_TIME,
      Date.now().toString()
    );
  } catch (e) {
    console.error('Failed to save username', e);
  }
}

export async function canChangeUsername(): Promise<boolean> {
  const last = await AsyncStorage.getItem(
    STORAGE_KEYS.USERNAME_LAST_CHANGED_TIME
  );
  if (!last) return true;
  const lastTime = parseInt(last, 10);
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  return Date.now() - lastTime >= oneWeek;
}

export async function getNextChangeDate(): Promise<Date | null> {
  const last = await AsyncStorage.getItem(
    STORAGE_KEYS.USERNAME_LAST_CHANGED_TIME
  );
  if (!last) return null;
  return new Date(parseInt(last, 10) + 7 * 24 * 60 * 60 * 1000);
}
