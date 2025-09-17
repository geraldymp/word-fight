// A function to generate letters to replace that used by player.

// The goal is to guarantee a certain amount of vowels exist in the whole letters
// Yet this function not fully correct, because this one only generate certain amount of vowels
// rather than make sure the entire letters to contain certain amount of vowels
// But this get the job done

// TODO: update to proper one

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
  let minimumVowels = vowelsNeeded;
  let newLetters = [...letters];
  let replacements: ILetter[] = [];

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
