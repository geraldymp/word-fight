export function getBonusDamageFromLength(word: string): number {
  const length = word.length;

  if (length === 4) return 4;
  if (length === 5) return 7;
  if (length === 6) return 10;
  if (length === 7) return 13;
  if (length === 8) return 18;
  if (length === 9) return 23;
  if (length === 10) return 28;
  if (length === 11) return 35;

  // For words with 12 letter, give 25 bonus damage
  return 40;
}
