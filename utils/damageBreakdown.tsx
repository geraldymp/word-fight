import { GameStoreType } from 'app/store/GameStoreType';
import { calculateBaseLetterDamage } from './calculateDamage';
import { getDamageModifier } from './getDamageModifier';
import { getBonusDamageFromLength } from './wordLengthDamageMap';

export function damageBreakdown(
  word: string,
  mod: GameStoreType['damageModifier']
) {
  const letterDamages = word.split('').map(letter => ({
    type: 'letter' as const,
    value: calculateBaseLetterDamage(letter)
  }));

  const lengthBonus = {
    type: 'length' as const,
    value: getBonusDamageFromLength(word)
  };

  const dmgMod = {
    type: 'modifier' as const,
    value: getDamageModifier(word, mod)
  };

  return [...letterDamages, lengthBonus, dmgMod];
}
