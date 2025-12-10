// must mimic SavedGameSchema.tsx
export interface ISavedGame {
  enemyHP: number;
  playerMaxHP: number;
  playerHP: number;
  mana: number;
  step: number;
  area: string;
  stage: number;
  selectedEnemy: string;
  selectedEnemies: string;
  maxReshuffle: number;
  reshuffle: number;
  damageModifier: string;
  tempExp: number;

  currentPotionUsed: number;
  purchasedItem: string;

  statHighestDamage: number;
  statLongestWordLength: number;
  statWordsUsed: number;
  statDamageDealt: number;
}
