// useSfxStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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
      name: 'sfx-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({ muted: state.muted })
    }
  )
);
