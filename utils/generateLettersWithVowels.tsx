// A function to generate random letters when starting the battle or when reshuffle.
// Guarantee a certain amount of vowels generated

import { alphabets, vowels } from 'app/constants/lettersAndValues';
import { ILetter } from 'app/types/ILetter';

export function generateRandomLettersWithVowels(
  count = 18,
  vowelsNeeded = 2
): ILetter[] {
  const letters: ILetter[] = [];

  // Add required vowels first
  for (let i = 0; i < vowelsNeeded; i++) {
    const randomVowel = vowels[Math.floor(Math.random() * vowels.length)];
    letters.push(randomVowel);
  }

  // Fill the rest with random letters
  for (let i = vowelsNeeded; i < count; i++) {
    const randomChar = alphabets[Math.floor(Math.random() * alphabets.length)];
    letters.push(randomChar);
  }

  // Shuffle the array so vowels are not always at the start
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }

  return letters;
}
