// stores/useGameStore.ts
import { create } from 'zustand';
import { enemies } from '../constants/enemies';
import { IEnemy } from '../types/IEnemy';
import { INode } from '../types/INode';

interface GameState {
  enemyHP: number;
  setEnemyHP: (hp: number) => void;
  reduceEnemyHP: (amount: number) => void;

  playerHP: number;
  setPlayerHP: (hp: number) => void;
  increasePlayerHP: (amount: number) => void;
  reducePlayerHP: (amount: number) => void;

  resetGame: () => void;

  journeyPath: INode[][]; // e.g., ['B', 'D', 'F']
  addToJourney: (node: INode[]) => void;
  resetJourney: () => void;

  selectedEnemy: IEnemy;
  setSelectedEnemy: (enemy: IEnemy) => void;

  level: number;
  setLevel: (level: number) => void;
  increaseLevel: () => void;

  gold: number;
  setGold: (gold: number) => void;

  bonusDamage: number;
  setBonusDamage: (bonus: number) => void;
  bonusGold: number;
  setBonusGold: (bonus: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  enemyHP: 20,
  setEnemyHP: (hp) => set({ enemyHP: hp }),
  reduceEnemyHP: (amount) =>
    set((state) => ({ enemyHP: Math.max(0, state.enemyHP - amount) })),

  playerHP: 50,
  setPlayerHP: (hp) => set({ playerHP: hp }),
  increasePlayerHP: (amount) =>
    set((state) => ({ playerHP: state.playerHP + amount })),
  reducePlayerHP: (amount) =>
    set((state) => ({ playerHP: Math.max(0, state.playerHP - amount) })),

  resetGame: () =>
    set(({
      gold: 0,
      level: 1,
      journeyPath: []
    })),

  journeyPath: [],
  addToJourney: (node) =>
    set((state) => ({ journeyPath: [...state.journeyPath, node] })),
  resetJourney: () => set({ journeyPath: [] }),

  selectedEnemy: enemies[0],
  setSelectedEnemy: (enemy) =>
    set({ selectedEnemy: enemy, enemyHP: enemy.baseHp }),
  
  level: 1,
  setLevel: (level) => set({ level }),
  increaseLevel: () => set((state) => ({ level: state.level + 1 })),

  gold: 0,
  setGold: (gold: number) => set({ gold }),

  bonusDamage: 0,
  setBonusDamage: (bonus: number) => set((state) => ({ bonusDamage: state.bonusDamage + bonus })),
  bonusGold: 0,
  setBonusGold: (bonus: number) => set((state) => ({ bonusGold: state.bonusGold + bonus }))
}));
