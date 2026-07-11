// useSfxStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from 'app/constants/storageKeys';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const { SFX_STATE } = STORAGE_KEYS;
export type SfxKey =
  | 'playerHit'
  | 'enemyBeaten'
  | 'windHit'
  | 'iceHit'
  | 'earthHit'
  | 'flameHit';

type SfxStore = {
  muted: boolean;
  setMuted: (v: boolean) => void;
  playSfx: (key: SfxKey) => void;
  registerPlaySfx: (fn: (key: SfxKey) => void) => void;
};

export const useSfxStore = create<SfxStore>()(
  persist(
    set => ({
      muted: false,
      setMuted: v => set({ muted: v }),
      playSfx: () => {}, // no-op until SfxPlayer registers the real implementation
      registerPlaySfx: fn => set({ playSfx: fn })
    }),
    {
      name: SFX_STATE,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({ muted: state.muted }) // only muted gets persisted, as before
    }
  )
);
