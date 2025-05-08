// stores/useGameStore.ts
import { create } from 'zustand';

interface GameState {
  enemyHP: number;
  playerHP: number;
  setEnemyHP: (hp: number) => void;
  setPlayerHP: (hp: number) => void;
  reduceEnemyHP: (amount: number) => void;
  reducePlayerHP: (amount: number) => void;
  resetGame: () => void;
  level: number;
  setLevel: (level: number) => void;
  increaseLevel: () => void;
  getEnemyStats: (level: number) => { hp: number; damageRange: [number, number] };
}

export const useGameStore = create<GameState>((set) => ({
  enemyHP: 20,
  playerHP: 18,
  setEnemyHP: (hp) => set({ enemyHP: hp }),
  setPlayerHP: (hp) => set({ playerHP: hp }),
  reduceEnemyHP: (amount) =>
    set((state) => ({ enemyHP: Math.max(0, state.enemyHP - amount) })),
  reducePlayerHP: (amount) =>
    set((state) => ({ playerHP: Math.max(0, state.playerHP - amount) })),
  resetGame: () =>
    set((state) => ({
      enemyHP: 15 + (state.level * 5),
      playerHP: 18,
      level: 1
    })),
  level: 1,
  setLevel: (level) => set({ level }),
  increaseLevel: () => set((state) => ({ level: state.level + 1 })),
  getEnemyStats: (level) => {
    const hp = 15 + (level * 5);
    const damageRange: [number, number] = [3 + (level * 1), 5 + (level * 2)];
    return { hp, damageRange };
  },
}));
