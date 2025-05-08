// utils/calculateDamage.ts
import { letterDamageMap } from './letterDamage';

export const calculateDamage = (word: string): number => {
  return word
    .toUpperCase()
    .split('')
    .reduce((total, letter) => total + (letterDamageMap[letter] || 0), 0);
};
