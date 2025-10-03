// stores/useGameStore.ts
import { KeyValues } from 'app/constants/keyValues';
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
  mana: 0,
  setMana: (mana: number) => set({ mana }),
  increaseMana: manaGained => set(state => ({ mana: state.mana + manaGained })),
  decreaseMana: manaLost => set(state => ({ mana: state.mana - manaLost })),

  step: 1,
  setStep: step => set({ step: step }),
  increaseStep: () =>
    set(state => ({
      step: state.step + 1,
      stage: 1
    })),
  area: undefined,
  setArea: selectedArea => set({ area: selectedArea }),
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
    minManaBounty: 0,
    maxManaBounty: 0
  },
  setSelectedEnemy: enemy =>
    set({ selectedEnemy: enemy, enemyHP: enemy.baseHp }),
  selectedEnemies: [],
  setSelectedEnemies: enemies => {
    set(state => ({
      selectedEnemies: enemies,
      selectedEnemy: enemies[state.stage - 1], // -1 because its array, duh!
      enemyHP: enemies[state.stage - 1].baseHp
    }));
  },

  maxReshuffle: 2,
  // try to limit max shuffle to 4, to prevent UI problem
  setMaxReshuffle: maxReshuffle => set({ maxReshuffle: maxReshuffle }),
  increaseMaxReshuffleAndFill: addMaxRes => {
    set(state => {
      const newMax = state.maxReshuffle + addMaxRes;
      return {
        maxReshuffle: newMax,
        reshuffle: newMax
      };
    });
  },
  reshuffle: 2,
  setReshuffle: res => set({ reshuffle: res }),

  resetGame: () =>
    set(state => ({
      step: 1,
      stage: 1,
      mana: 0,
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
  setDamageModifier: (modifiers: {
    bonusDamage: number;
    vowelModifier: number;
    ABCDEModifier: number;
    VWXYZModifier: number;
    IngModifier: number;
    STModifier: number;
  }) => set({ damageModifier: modifiers }),
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
    get().increasePlayerHP(KeyValues.fireCamp.restoreHp);
    get().setBonusDamage(KeyValues.fireCamp.increaseDamage);
  },

  lowestHighscore: 0,
  setLowestHighScore: score => set({ lowestHighscore: score }),
  highScoreFilled: false,
  setHighScoreFilled: isFilled => set({ highScoreFilled: isFilled })
}));
