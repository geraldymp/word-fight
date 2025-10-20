// must mimic ISavedGame.tsx
export const SavedGameSchema = {
  name: 'SavedGame',
  primaryKey: 'id',
  properties: {
    id: 'string',
    timestamp: 'date',

    enemyHP: 'int',
    playerMaxHP: 'int',
    playerHP: 'int',
    mana: 'int',
    step: 'int',
    area: 'string',
    stage: 'int',
    selectedEnemy: 'string',
    selectedEnemies: 'string',
    maxReshuffle: 'int',
    reshuffle: 'int',
    damageModifier: 'string',

    currentPotionUsed: 'int',
    purchasedItem: 'string',

    statHighestDamage: 'int',
    statLongestWordLength: 'int',
    statWordsUsed: 'int',
    statDamageDealt: 'int'
  }
};
