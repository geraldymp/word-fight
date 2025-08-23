export function generateSomeLettersWithVowels(
  letters: string[],
  selectedIndices: number[],
  vowelsNeeded: number = 1
): string[] {
  const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
  const VOWELS = 'aeiou';

  function getRandomAlphabet() {
    return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }

  function getRandomVowel() {
    return VOWELS[Math.floor(Math.random() * VOWELS.length)];
  }

  let minimumVowels = vowelsNeeded;
  let newLetters = [...letters];
  let replacements: string[] = [];
  for (let i = 0; i < selectedIndices.length; i++) {
    if (minimumVowels > 0) {
      replacements.push(getRandomVowel());
      minimumVowels--;
    } else {
      replacements.push(getRandomAlphabet());
    }
  }

  // Apply replacements
  selectedIndices.forEach((idx, i) => {
    newLetters[idx] = replacements[i];
  });

  return newLetters;
}
