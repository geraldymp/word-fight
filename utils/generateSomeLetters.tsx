// A function to generate letters to replace that used by player.

// The goal is to guarantee a certain amount of vowels exist in the whole letters

import { alphabets, vowels } from 'app/constants/lettersAndValues';
import { ILetter } from 'app/types/ILetter';

function getRandomAlphabet(): ILetter {
  return alphabets[Math.floor(Math.random() * alphabets.length)];
}

function getRandomVowel(): ILetter {
  return vowels[Math.floor(Math.random() * vowels.length)];
}

export function generateSomeLettersWithVowels(
  letters: ILetter[],
  selectedIndices: number[], // Array of used tiles
  vowelsNeeded: number = 1
): ILetter[] {
  const selectedSet = new Set(selectedIndices);

  // Count vowels in tiles that are NOT being replaced
  const existingVowelsCount = letters.filter(
    (letter, idx) => !selectedSet.has(idx) && vowels.includes(letter)
  ).length;

  // How many vowels still need to be added in replacements
  let vowelsStillNeeded = Math.max(0, vowelsNeeded - existingVowelsCount);

  let newLetters = [...letters];
  let replacements: ILetter[] = [];

  for (let i = 0; i < selectedIndices.length; i++) {
    if (vowelsStillNeeded > 0) {
      replacements.push(getRandomVowel());
      vowelsStillNeeded--;
    } else {
      replacements.push(getRandomAlphabet());
    }
  }

  // Shuffle replacements so vowels aren't always at the first indices
  replacements = replacements.sort(() => Math.random() - 0.5);

  // Apply replacements
  selectedIndices.forEach((idx, i) => {
    newLetters[idx] = replacements[i];
  });

  return newLetters;
}
