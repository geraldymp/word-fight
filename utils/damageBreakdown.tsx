import { GameStoreType } from 'app/store/GameStoreType';
import { calculateBaseLetterDamage } from './calculateDamage';
import { getDamageModifier } from './getDamageModifier';
import { getBonusDamageFromLength } from './wordLengthDamageMap';

export function damageBreakdown(
  word: string,
  mod: GameStoreType['damageModifier']
) {
  // Get letter base damages
  const letterDamages = word
    .split('')
    .map(letter => calculateBaseLetterDamage(letter));

  // Length bonus
  const lengthBonus = getBonusDamageFromLength(word);

  // Damage modifier
  const dmgMod = getDamageModifier(word, mod);

  // Build breakdown array
  return [...letterDamages, lengthBonus, dmgMod];
}
