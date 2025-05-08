const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

export function generateRandomLetters(count = 16): string[] {
  const letters: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomChar = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    letters.push(randomChar);
  }
  return letters;
}
