import { ILetter } from 'app/types/ILetter';

// This function returns the bonus damage based on the length of the word.
// The longer the word, the more bonus damage is applied
export function getBonusDamageFromLength(word: ILetter[]): number {
  const length = word.length;

  if (length < 4) return 0;
  if (length === 4) return 10;
  if (length === 5) return 20;
  if (length === 6) return 40;
  if (length === 7) return 60;
  if (length === 8) return 90;
  if (length === 9) return 120;
  if (length === 10) return 160;
  if (length === 11) return 200;
  if (length === 12) return 250;
  if (length === 13) return 300;
  if (length === 14) return 360;
  if (length === 15) return 420;
  if (length === 16) return 490;
  if (length === 17) return 560;
  if (length === 18) return 600;

  return 0;
}
