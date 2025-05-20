export function getBonusDamageFromLength(word: string): number {
  const length = word.length;

  if (length === 4) return 4;
  if (length === 5) return 6;
  if (length === 6) return 8;
  if (length === 7) return 10;
  if (length === 8) return 12;
  if (length === 9) return 15;
  if (length === 10) return 17;
  if (length === 11) return 19;

  // For words with 12 letter, give 25 bonus damage
  return 25;
}
