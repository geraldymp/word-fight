// A function to generate letters to replace that used by player.

// The goal is to guarantee a certain amount of vowels exist in the whole letters
// Yet this function not fully correct, because this one only generate certain amount of vowels
// rather than make sure the entire letters to contain certain amount of vowels
// But this get the job done

// TODO: update to proper one

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const VOWELS = 'aeiou';
export function generateSomeLettersWithVowels(
  letters: string[],
  selectedIndices: number[], // Array of used tiles
  vowelsNeeded: number = 1
): string[] {
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
