// TODO: Remove this after nothing use this
import { letterDamageMap } from '@constants/letterDamage';

export const calculateBaseLetterDamage = (word: string): number => {
  return word
    .toUpperCase()
    .split('')
    .reduce((total, letter) => total + (letterDamageMap[letter] || 0), 0);
};
