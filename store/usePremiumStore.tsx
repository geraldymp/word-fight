// store/useSettingsStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from 'app/constants/storageKeys';
import { create } from 'zustand';
import { useSubscriptionStore } from './useSubscriptionStore';

const { SHOW_NUMBERED_TILE, SHOW_DAMAGE_BREAKDOWN } = STORAGE_KEYS;

type SettingsState = {
  showNumberedTiles: boolean;
  showDamageBreakdown: boolean;
  loadSettings: () => Promise<void>;
  toggleNumberedTiles: () => Promise<void>;
  toggleDamageBreakdown: () => Promise<void>;
};

export const usePremiumStore = create<SettingsState>((set, get) => ({
  showNumberedTiles: false,
  showDamageBreakdown: false,

  loadSettings: async () => {
    const { isPremium } = useSubscriptionStore.getState();
    if (!isPremium) {
      set({ showNumberedTiles: false, showDamageBreakdown: false });
      return;
    }

    try {
      const [tiles, breakdown] = await Promise.all([
        AsyncStorage.getItem(SHOW_NUMBERED_TILE),
        AsyncStorage.getItem(SHOW_DAMAGE_BREAKDOWN)
      ]);

      set({
        showNumberedTiles: tiles === null ? true : tiles === 'true',
        showDamageBreakdown: breakdown === null ? true : breakdown === 'true'
      });
    } catch (e) {
      console.warn('Failed to load premium settings', e);
    }
  },

  toggleNumberedTiles: async () => {
    if (!useSubscriptionStore.getState().isPremium) return;
    const { showNumberedTiles } = get();
    const newValue = !showNumberedTiles;
    set({ showNumberedTiles: newValue });
    await AsyncStorage.setItem(SHOW_NUMBERED_TILE, String(newValue));
  },

  toggleDamageBreakdown: async () => {
    if (!useSubscriptionStore.getState().isPremium) return;
    const { showDamageBreakdown } = get();
    const newValue = !showDamageBreakdown;
    set({ showDamageBreakdown: newValue });
    await AsyncStorage.setItem(SHOW_DAMAGE_BREAKDOWN, String(newValue));
  }
}));
