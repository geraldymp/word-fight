import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeroIcons } from 'app/constants/heroIcons';
import { STORAGE_KEYS } from 'app/constants/storageKeys';
import { create } from 'zustand';

interface HeroState {
  selectedHeroId: string;
  setHero: (heroId: string) => Promise<void>;
  loadHero: () => Promise<void>;
}

export const useHeroStore = create<HeroState>(set => ({
  selectedHeroId: HeroIcons[0].id,

  setHero: async heroId => {
    await AsyncStorage.setItem(STORAGE_KEYS.SELECTED_HERO, heroId);
    set({ selectedHeroId: heroId });
  },

  loadHero: async () => {
    const stored = await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_HERO);
    if (stored) set({ selectedHeroId: stored });
  }
}));
