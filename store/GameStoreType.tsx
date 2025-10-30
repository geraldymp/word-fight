import { IEnemy } from '@customTypes/IEnemy';
import { IContent } from 'app/types/IArea';
import { IDamageModifier } from 'app/types/IDamageModifier';

export interface GameStoreType {
  // Enemy section
  enemyHP: number;
  setEnemyHP: (hp: number) => void;
  reduceEnemyHP: (amount: number) => void;

  // Player section
  playerMaxHP: number;
  setPlayerMaxHP: (maxHp: number) => void;
  playerHP: number;
  setPlayerHP: (hp: number) => void;
  increasePlayerHP: (amount: number) => void;
  reducePlayerHP: (amount: number) => void;
  mana: number;
  setMana: (mana: number) => void;
  increaseMana: (manaGained: number) => void;
  decreaseMana: (manaLost: number) => void;

  // Progress section
  step: number; // Journey step of player. Start with Step 1 (fight enemy) -> Step 2 (Magic Hut) -> *Repeat* -> Step 7 (Boss)
  setStep: (step: number) => void;
  increaseStep: () => void;
  area?: IContent; // Content of Area (like fighting place, firecamp or magic hut)
  setArea?: (selectedArea: IContent) => void;
  stage: number; // Position of player while fighting. There are 3 stage in battle area
  setStage: (stage: number) => void;
  increaseStage: () => void;
  selectedEnemy: IEnemy;
  setSelectedEnemy: (enemy: IEnemy) => void;
  selectedEnemies: any;
  setSelectedEnemies: (enemy: IEnemy[]) => void;

  // Menu section
  maxReshuffle: number;
  setMaxReshuffle: (maxReshuffle: number) => void;
  increaseMaxReshuffleAndFill: (addMaxRes: number) => void;
  reshuffle: number;
  setReshuffle: (res: number) => void;

  // Reset Game
  resetGame: () => void;

  // Damage modifier
  damageModifier: IDamageModifier;
  setBonusDamage: (modifier: number) => void;
  setVowelModifier: (modifier: number) => void;
  setABCDEModifier: (modifier: number) => void;
  setVWXYZRModifier: (modifier: number) => void;
  setIngModifier: (modifier: number) => void;
  setSTModifier: (modifier: number) => void;

  setFirecampHeal: () => void;

  // Highscore section
  lowestHighscore: number;
  setLowestHighScore: (score: number) => void;
  lowestMonthlyHighscore: number;
  setLowestMonthlyHighScore: (score: number) => void;

  // Current run statistic
  highestDamage: number;
  setHighestDamage: (damage: number) => void;
  longestWordLength: number;
  setLongestWordLength: (wordLength: number) => void;
  wordsUsed: number;
  increaseWordsUsed: () => void;
  damageDealt: number;
  increaseDamageDealt: (damage: number) => void;
  resetRunStatistic: () => void;
}
