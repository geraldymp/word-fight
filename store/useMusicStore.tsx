// useMusicStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from 'app/constants/storageKeys';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const { MUSIC_STATE } = STORAGE_KEYS;
export type TrackKey = 'home' | 'battle';

type MusicStore = {
  currentTrack: TrackKey | null;
  muted: boolean;
  playMusic: (track: TrackKey) => void;
  stopMusic: () => void;
  setMuted: (v: boolean) => void;
};

export const useMusicStore = create<MusicStore>()(
  persist(
    set => ({
      currentTrack: null,
      muted: false,
      playMusic: track => set({ currentTrack: track }),
      stopMusic: () => set({ currentTrack: null }),
      setMuted: v => set({ muted: v })
    }),
    {
      name: MUSIC_STATE,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({ muted: state.muted })
    }
  )
);
