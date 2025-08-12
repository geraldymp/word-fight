import { IEnemy } from '@customTypes/IEnemy';
import { INode } from '@customTypes/INode';

export interface GameStoreType {
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

  maxReshuffle: number;
  reshuffle: number;
  setReshuffle: (res: number) => void;

  resetGame: () => void;

  journeyPath: INode[][]; // e.g., ['B', 'D', 'F']
  addToJourney: (node: INode[]) => void;
  resetJourney: () => void;

  selectedEnemy: IEnemy;
  setSelectedEnemy: (enemy: IEnemy) => void;

  gold: number;
  setGold: (gold: number) => void;

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

  selectedEnemies: any;
  setSelectedEnemies: (enemy: IEnemy[]) => void;

  lowestHighscore: number;
  setLowestHighScore: (hiscore: number) => void;
  highScoreFilled: boolean;
  setHighScoreFilled: (isFilled: boolean) => void;
}
