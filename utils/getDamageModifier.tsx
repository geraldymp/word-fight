import { GameStoreType } from '@store/GameStoreType';

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
  let totalModifier = bonusDamage.value;

  if (vowelModifier.value > 0) {
    const vowels = word.match(/[aeiou]/gi);
    if (vowels) totalModifier += vowels.length * vowelModifier.value;
  }

  if (ABCDEModifier.value > 0) {
    const abcde = word.match(/[abcde]/gi);
    if (abcde) totalModifier += abcde.length * ABCDEModifier.value;
  }

  if (VWXYZModifier.value > 0) {
    const vwxyz = word.match(/[vwxyz]/gi);
    if (vwxyz) totalModifier += vwxyz.length * VWXYZModifier.value;
  }

  if (IngModifier.value > 0) {
    if (word.toLowerCase().includes('ing')) totalModifier += IngModifier.value;
  }

  if (STModifier.value > 0) {
    const st = word.match(/[st]/gi);
    if (st) totalModifier += st.length * STModifier.value;
  }

  return totalModifier;
}
