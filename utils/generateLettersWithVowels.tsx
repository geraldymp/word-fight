// A function to generate random letters when starting the battle or when reshuffle.
// Guarantee a certain amount of vowels generated
// Guarantee a certain amount of duplicate letters are not generated (to avoid too many duplicates in the same reshuffle)

import { alphabets, vowels } from 'app/constants/lettersAndValues';
import { ILetter } from 'app/types/ILetter';
import { pickAvailableLetter } from './pickAvailableLetter';

export function generateRandomLettersWithVowels(
  count = 18,
  vowelsNeeded = 2
): ILetter[] {
  const letters: ILetter[] = [];
  const letterCounts: Record<string, number> = {};

  // Add required vowels first
  for (let i = 0; i < vowelsNeeded; i++) {
    letters.push(pickAvailableLetter(vowels, letterCounts));
  }

  // Fill the rest with random letters
  for (let i = vowelsNeeded; i < count; i++) {
    letters.push(pickAvailableLetter(alphabets, letterCounts));
  }

  // Shuffle the array so vowels are not always at the start
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }

  return letters;
}
