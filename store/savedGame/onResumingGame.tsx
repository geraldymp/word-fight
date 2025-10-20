// to move data from Realm to Zustand
// make Zustand as source of truth again
import { useAdStore } from '@store/useAdStore';
import { useGameStore } from '@store/useGameStore';
import { useMagicHutStore } from '@store/useMagicHutStore';
import { ISavedGame } from './SavedGameType';

export const resumeGame = async (saved: ISavedGame) => {
  useGameStore.setState({
    enemyHP: saved.enemyHP,
    playerMaxHP: saved.playerMaxHP,
    playerHP: saved.playerHP,
    mana: saved.mana,
    step: saved.step,
    area: JSON.parse(saved.area),
    stage: saved.stage,
    selectedEnemy: JSON.parse(saved.selectedEnemy),
    selectedEnemies: JSON.parse(saved.selectedEnemies),
    maxReshuffle: saved.maxReshuffle,
    reshuffle: saved.reshuffle,
    damageModifier: JSON.parse(saved.damageModifier),
    highestDamage: saved.statHighestDamage,
    longestWordLength: saved.statLongestWordLength,
    wordsUsed: saved.statWordsUsed,
    damageDealt: saved.statDamageDealt
  });

  useMagicHutStore.setState({
    purchasedItemIds: JSON.parse(saved.purchasedItem)
  });

  useAdStore.setState(state => ({
    ...state,
    magicHutPotion: {
      ...state.magicHutPotion,
      potionUsed: saved.currentPotionUsed
    }
  }));
};
