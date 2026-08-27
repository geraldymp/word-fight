import { GameStoreType } from '@store/GameStoreType';
import { UpgradeDefinition } from 'app/constants/pointUpgrades';
import { IEnemy } from 'app/types/IEnemy';
import { ILetter } from 'app/types/ILetter';
import { getDamageFromUpgrades } from './getDamageFromUpgrades';
import { getDamageModifier } from './getDamageModifier';
import { getBonusDamageFromLength } from './wordLengthDamageMap';

interface CalculateDamageProps {
  currentWord: string;
  currentWordWithValue: ILetter[];
  damageModifier: GameStoreType['damageModifier'];
  upgrades: UpgradeDefinition[];
  targetEnemy: IEnemy;
}

export function calculateTotalDamage({
  currentWord,
  currentWordWithValue,
  damageModifier,
  upgrades,
  targetEnemy
}: CalculateDamageProps): number {
  const baseDamage = currentWordWithValue.reduce(
    (sum, letter) => sum + letter.value,
    0
  );
  const lengthBonusDamage = getBonusDamageFromLength(currentWordWithValue);
  const dmgModifier = getDamageModifier(currentWord, damageModifier);
  const dmgFromUpgrade = getDamageFromUpgrades(currentWord, upgrades);
  const lengthOnlyDamage = currentWordWithValue.length; // Example calculation, replace with actual logic

  console.log('Base Damage:', lengthOnlyDamage);
  if (targetEnemy?.defenseType === 'lengthOnly') {
    return lengthOnlyDamage;
  }

  return baseDamage + lengthBonusDamage + dmgModifier + dmgFromUpgrade;
}
