import { GameStoreType } from '@store/GameStoreType';
import { UpgradeDefinition } from 'app/constants/pointUpgrades';
import { ILetter } from 'app/types/ILetter';
import { getDamageFromUpgrades } from './getDamageFromUpgrades';
import { getDamageModifier } from './getDamageModifier';
import { getBonusDamageFromLength } from './wordLengthDamageMap';

export function damageBreakdown(
  letters: ILetter[],
  mod: GameStoreType['damageModifier'],
  upgrades: UpgradeDefinition[]
) {
  const word = letters.map(l => l.letter).join('');
  const letterDamages = letters.map(letter => ({
    type: 'letter' as const,
    value: letter.value
  }));

  const lengthBonus = {
    type: 'length' as const,
    value: getBonusDamageFromLength(letters)
  };

  const dmgMod = {
    type: 'modifier' as const,
    value: getDamageModifier(word, mod)
  };

  const upgradeBonus = {
    type: 'upgrade' as const,
    value: getDamageFromUpgrades(word, upgrades)
  };

  return [...letterDamages, lengthBonus, dmgMod, upgradeBonus];
}
