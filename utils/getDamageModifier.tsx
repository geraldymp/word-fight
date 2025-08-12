import { GameStoreType } from 'app/store/GameStoreType';

export function getDamageModifier(
  word: string,
  mod: GameStoreType['damageModifier']
) {
  const {
    bonusDamage,
    vowelModifier,
    ABCDEModifier,
    VWXYZModifier,
    IngModifier,
    STModifier
  } = mod;
  let modifier = bonusDamage;

  if (vowelModifier) {
    const vowels = word.match(/[aeiou]/gi);
    if (vowels) modifier += vowels.length * vowelModifier;
  }

  if (ABCDEModifier) {
    const abcde = word.match(/[abcde]/gi);
    if (abcde) modifier += abcde.length * ABCDEModifier;
  }

  if (VWXYZModifier) {
    const vwxyz = word.match(/[vwxyz]/gi);
    if (vwxyz) modifier += vwxyz.length * VWXYZModifier;
  }

  if (IngModifier) {
    if (word.toLowerCase().includes('ing')) modifier += IngModifier;
  }

  if (STModifier) {
    if (word.toLowerCase().includes('st')) modifier += STModifier;
  }

  return modifier;
}
