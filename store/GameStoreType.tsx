import { IEnemy } from '@customTypes/IEnemy';
import { INode } from '@customTypes/INode';

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
  gold: number;
  setGold: (gold: number) => void;
  increaseGold: (gainedGold: number) => void;
  decreaseGold: (lostGold: number) => void;

  // Progress section
  step: number;
  increaseStep: () => void;
  stage: number;
  setStage: (stage: number) => void;
  increaseStage: () => void;
  selectedEnemy: IEnemy;
  setSelectedEnemy: (enemy: IEnemy) => void;
  selectedEnemies: any;
  setSelectedEnemies: (enemy: IEnemy[]) => void;

  // Menu section
  maxReshuffle: number;
  reshuffle: number;
  setReshuffle: (res: number) => void;

  // Reset Game
  resetGame: () => void;

  // Map section (unused)
  journeyPath: INode[][];
  addToJourney: (node: INode[]) => void;
  resetJourney: () => void;

  // Damage modifier
  damageModifier: {
    bonusDamage: number;
    vowelModifier: number;
    ABCDEModifier: number;
    VWXYZModifier: number;
    IngModifier: number;
    STModifier: number;
  };
  setBonusDamage: (modifier: number) => void;
  setVowelModifier: (modifier: number) => void;
  setABCDEModifier: (modifier: number) => void;
  setVWXYZRModifier: (modifier: number) => void;
  setIngModifier: (modifier: number) => void;
  setSTModifier: (modifier: number) => void;

  setFirecampHeal: () => void;

  // Highscore section
  lowestHighscore: number;
  setLowestHighScore: (hiscore: number) => void;
  highScoreFilled: boolean;
  setHighScoreFilled: (isFilled: boolean) => void;
}
