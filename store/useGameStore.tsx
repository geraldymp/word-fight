// stores/useGameStore.ts
import { create } from 'zustand';
import { GameStoreType } from './GameStoreType';

export const useGameStore = create<GameStoreType>((set, get) => ({
  enemyHP: 20,
  setEnemyHP: hp => set({ enemyHP: hp }),
  reduceEnemyHP: amount =>
    set(state => ({ enemyHP: Math.max(0, state.enemyHP - amount) })),

  playerMaxHP: 50,
  setPlayerMaxHP: maxHp => set({ playerMaxHP: maxHp }),
  playerHP: 0,
  setPlayerHP: hp => set({ playerHP: hp }),
  increasePlayerHP: amount =>
    set(state => {
      const newHP = state.playerHP + amount;
      return {
        playerHP: newHP > state.playerMaxHP ? state.playerMaxHP : newHP
      };
    }),
  reducePlayerHP: amount =>
    set(state => ({ playerHP: Math.max(0, state.playerHP - amount) })),
  gold: 0,
  setGold: (gold: number) => set({ gold }),
  increaseGold: gainedGold => set(state => ({ gold: state.gold + gainedGold })),
  decreaseGold: lostGold => set(state => ({ gold: state.gold - lostGold })),

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
  selectedEnemies: [],
  setSelectedEnemies: enemies => {
    set(state => ({
      selectedEnemies: enemies,
      selectedEnemy: enemies[state.stage - 1],
      enemyHP: enemies[state.stage - 1].baseHp
    }));
  },

  maxReshuffle: 2,
  reshuffle: 2,
  setReshuffle: res => set({ reshuffle: res }),

  resetGame: () =>
    set(state => ({
      step: 1,
      stage: 1,
      gold: 0,
      playerMaxHP: 50,
      playerHP: state.playerMaxHP,
      maxReshuffle: 2,
      reshuffle: 2,
      journeyPath: [],
      damageModifier: {
        bonusDamage: 0,
        vowelModifier: 0,
        ABCDEModifier: 0,
        VWXYZModifier: 0,
        IngModifier: 0,
        STModifier: 0
      }
    })),

  journeyPath: [],
  addToJourney: node =>
    set(state => ({ journeyPath: [...state.journeyPath, node] })),
  resetJourney: () => set({ journeyPath: [] }),

  damageModifier: {
    bonusDamage: 0,
    vowelModifier: 0,
    ABCDEModifier: 0,
    VWXYZModifier: 0,
    IngModifier: 0,
    STModifier: 0
  },
  setBonusDamage: (modifier: number) =>
    set(state => ({
      damageModifier: {
        ...state.damageModifier,
        bonusDamage: state.damageModifier.bonusDamage + modifier
      }
    })),
  setVowelModifier: (modifier: number) =>
    set(state => ({
      damageModifier: {
        ...state.damageModifier,
        vowelModifier: state.damageModifier.vowelModifier + modifier
      }
    })),
  setABCDEModifier: (modifier: number) =>
    set(state => ({
      damageModifier: {
        ...state.damageModifier,
        ABCDEModifier: state.damageModifier.ABCDEModifier + modifier
      }
    })),
  setVWXYZRModifier: (modifier: number) =>
    set(state => ({
      damageModifier: {
        ...state.damageModifier,
        VWXYZModifier: state.damageModifier.VWXYZModifier + modifier
      }
    })),
  setIngModifier: (modifier: number) =>
    set(state => ({
      damageModifier: {
        ...state.damageModifier,
        IngModifier: state.damageModifier.IngModifier + modifier
      }
    })),
  setSTModifier: (modifier: number) =>
    set(state => ({
      damageModifier: {
        ...state.damageModifier,
        STModifier: state.damageModifier.STModifier + modifier
      }
    })),

  setFirecampHeal: () => {
    get().increasePlayerHP(5);
    get().setBonusDamage(2);
  },

  lowestHighscore: 0,
  setLowestHighScore: score => set({ lowestHighscore: score }),
  highScoreFilled: false,
  setHighScoreFilled: isFilled => set({ highScoreFilled: isFilled })
}));
