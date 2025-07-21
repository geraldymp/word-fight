// stores/useGameStore.ts
import { IEnemy } from '@customTypes/IEnemy';
import { INode } from '@customTypes/INode';
import { create } from 'zustand';

interface GameState {
  enemyHP: number;
  setEnemyHP: (hp: number) => void;
  reduceEnemyHP: (amount: number) => void;

  playerHP: number;
  setPlayerHP: (hp: number) => void;
  increasePlayerHP: (amount: number) => void;
  reducePlayerHP: (amount: number) => void;

  step: number;
  increaseStep: () => void;

  stage: number;
  setStage: (stage: number) => void;
  increaseStage: () => void;

  resetGame: () => void;

  journeyPath: INode[][]; // e.g., ['B', 'D', 'F']
  addToJourney: (node: INode[]) => void;
  resetJourney: () => void;

  selectedEnemy: IEnemy;
  setSelectedEnemy: (enemy: IEnemy) => void;

  gold: number;
  setGold: (gold: number) => void;

  bonusDamage: number;
  setBonusDamage: (bonus: number) => void;

  vowelModifier: number;
  setVowelModifier: (modifier: number) => void;
  ABCDEModifier: number;
  setABCDEModifier: (modifier: number) => void;
  VWXYZModifier: number;
  setVWXYZRModifier: (modifier: number) => void;
  IngModifier: number;
  setIngModifier: (modifier: number) => void;
  STModifier: number;
  setSTModifier: (modifier: number) => void;

  setFirecampHeal: () => void;

  selectedEnemies: any;
  setSelectedEnemies: (enemy: IEnemy[]) => void;
}

export const useGameStore = create<GameState>(set => ({
  enemyHP: 20,
  setEnemyHP: hp => set({ enemyHP: hp }),
  reduceEnemyHP: amount =>
    set(state => ({ enemyHP: Math.max(0, state.enemyHP - amount) })),

  playerHP: 50,
  setPlayerHP: hp => set({ playerHP: hp }),
  increasePlayerHP: amount =>
    set(state => ({ playerHP: state.playerHP + amount })),
  reducePlayerHP: amount =>
    set(state => ({ playerHP: Math.max(0, state.playerHP - amount) })),

  step: 1,
  increaseStep: () =>
    set(state => ({
      step: state.step + 1,
      stage: 1
    })),

  stage: 1,
  setStage: stage => set({ stage: stage }),
  increaseStage: () =>
    set(state => ({
      stage: state.stage + 1,
      selectedEnemy: state.selectedEnemies[state.stage]
    })),

  resetGame: () =>
    set({
      step: 1,
      stage: 1,
      gold: 0,
      playerHP: 50,
      journeyPath: [],

      bonusDamage: 0,
      vowelModifier: 0,
      ABCDEModifier: 0,
      VWXYZModifier: 0,
      IngModifier: 0,
      STModifier: 0
    }),

  journeyPath: [],
  addToJourney: node =>
    set(state => ({ journeyPath: [...state.journeyPath, node] })),
  resetJourney: () => set({ journeyPath: [] }),

  selectedEnemy: {
    name: '',
    image: undefined,
    baseHp: 0,
    minDmg: 0,
    maxDmg: 0,
    goldReward: 0
  },
  setSelectedEnemy: enemy =>
    set({ selectedEnemy: enemy, enemyHP: enemy.baseHp }),

  gold: 0,
  setGold: (gold: number) => set({ gold }),

  bonusDamage: 0,
  setBonusDamage: (bonus: number) =>
    set(state => ({ bonusDamage: state.bonusDamage + bonus })),

  vowelModifier: 0,
  setVowelModifier: (modifier: number) =>
    set(state => ({ vowelModifier: state.vowelModifier + modifier })),
  ABCDEModifier: 0,
  setABCDEModifier: (modifier: number) =>
    set(state => ({ ABCDEModifier: state.ABCDEModifier + modifier })),
  VWXYZModifier: 0,
  setVWXYZRModifier: (modifier: number) =>
    set(state => ({ VWXYZModifier: state.VWXYZModifier + modifier })),
  IngModifier: 0,
  setIngModifier: (modifier: number) =>
    set(state => ({ IngModifier: state.IngModifier + modifier })),
  STModifier: 0,
  setSTModifier: (modifier: number) =>
    set(state => ({ STModifier: state.STModifier + modifier })),

  setFirecampHeal: () =>
    set(state => ({
      playerHP: state.playerHP + 5,
      bonusDamage: state.bonusDamage + 2
    })),

  selectedEnemies: [],
  setSelectedEnemies: enemies => {
    set(state => ({
      selectedEnemies: enemies,
      selectedEnemy: enemies[state.stage - 1],
      enemyHP: enemies[state.stage - 1].baseHp
    }));
  }
}));
