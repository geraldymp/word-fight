// utils/calculateDamage.ts
import { letterDamageMap } from './letterDamage';

export const calculateBaseLetterDamage = (word: string): number => {
  return word
    .toUpperCase()
    .split('')
    .reduce((total, letter) => total + (letterDamageMap[letter] || 0), 0);
};
