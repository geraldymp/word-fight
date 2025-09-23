// useSfxStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from 'app/constants/storageKeys';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const { SFX_STATE } = STORAGE_KEYS;
export type SfxKey = 'playerHit' | 'enemyHit' | 'enemyBeaten';

type SfxStore = {
  currentSfx: { key: SfxKey; id: number } | null;
  muted: boolean;
  playSfx: (key: SfxKey) => void;
  clearSfx: () => void;
  setMuted: (v: boolean) => void;
};

export const useSfxStore = create<SfxStore>()(
  persist(
    set => ({
      currentSfx: null,
      muted: false,
      playSfx: key => set({ currentSfx: { key, id: Date.now() } }),
      clearSfx: () => set({ currentSfx: null }),
      setMuted: v => set({ muted: v })
    }),
    {
      name: SFX_STATE,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({ muted: state.muted })
    }
  )
);
