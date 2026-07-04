// A function to generate letters to replace that used by player.

// The goal is to guarantee a certain amount of vowels exist in the whole letters
// and guarantee a max duplicate of 2 for any given letter in the whole letters

import { alphabets, vowels } from 'app/constants/lettersAndValues';
import { ILetter } from 'app/types/ILetter';
import { pickAvailableLetter } from './pickAvailableLetter';

export function generateSomeLettersWithVowels(
  letters: ILetter[],
  selectedIndices: number[], // Array of index of used tiles
  vowelsNeeded: number = 2
): ILetter[] {
  const selectedSet = new Set(selectedIndices);

  // Letters that are NOT being replaced (they stay in the final result)
  const remainingLetters = letters.filter((_, idx) => !selectedSet.has(idx));

  // Count vowels among the remaining (non-replaced) tiles
  const existingVowelsCount = remainingLetters.filter(letter =>
    vowels.includes(letter)
  ).length;

  // How many vowels still need to be added in replacements
  let vowelsStillNeeded = Math.max(0, vowelsNeeded - existingVowelsCount);

  // Seed the duplicate counter with letters that are staying,
  // so replacements respect the cap across the WHOLE final set, not just themselves
  const letterCounts: Record<string, number> = {};
  for (const letter of remainingLetters) {
    letterCounts[letter.letter] = (letterCounts[letter.letter] || 0) + 1;
  }

  let newLetters = [...letters];
  let replacements: ILetter[] = [];

  for (let i = 0; i < selectedIndices.length; i++) {
    if (vowelsStillNeeded > 0) {
      replacements.push(pickAvailableLetter(vowels, letterCounts));
      vowelsStillNeeded--;
    } else {
      replacements.push(pickAvailableLetter(alphabets, letterCounts));
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
