import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

type SettingsStore = {
  muteMusic: boolean;
  muteSound: boolean;
  setMuteMusic: (value: boolean) => void;
  setMuteSound: (value: boolean) => void;
  loadSettings: () => Promise<void>;

  currentSrc: string | null;
  shouldPlay: boolean;
  setAudio: (src: string | null, play?: boolean) => void;
  play: () => void;
  stop: () => void;
};

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  muteMusic: false,
  muteSound: false,

  setMuteMusic: value => {
    AsyncStorage.setItem('muteMusic', String(value)).catch(err => {
      console.warn('Failed to save muteMusic setting:', err);
    });
    set({ muteMusic: value });
  },

  setMuteSound: value => {
    AsyncStorage.setItem('muteSound', String(value)).catch(err => {
      console.warn('Failed to save muteSound setting:', err);
    });
    set({ muteSound: value });
  },

  loadSettings: async () => {
    try {
      const music = await AsyncStorage.getItem('muteMusic');
      const sound = await AsyncStorage.getItem('muteSound');
      set({
        muteMusic: music === 'true',
        muteSound: sound === 'true'
      });
    } catch (err) {
      console.warn('Failed to load settings:', err);
    }
  },

  currentSrc: null,
  shouldPlay: false,
  setAudio: (src, play = true) => set({ currentSrc: src, shouldPlay: play }),
  play: () => set({ shouldPlay: true }),
  stop: () => set({ shouldPlay: false })
}));
