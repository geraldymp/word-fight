import { GameStoreType } from 'app/store/GameStoreType';
import { ILetter } from 'app/types/ILetter';
import { getDamageModifier } from './getDamageModifier';
import { getBonusDamageFromLength } from './wordLengthDamageMap';

// TODO: Be independent from calculateBaseLetterDamage
export function damageBreakdown(
  letters: ILetter[],
  mod: GameStoreType['damageModifier']
) {
  const word = letters.map(l => l.letter).join('');
  const letterDamages = letters.map(letter => ({
    type: 'letter' as const,
    value: letter.value
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
