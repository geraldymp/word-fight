import { generateRandomLettersWithVowels } from '../generateLettersWithVowels';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

describe('generateRandomLetters', () => {
  it('returns correct number of letters', () => {
    const result = generateRandomLettersWithVowels(10);
    expect(result).toHaveLength(10);
  });

  it('returns only letters from the alphabet', () => {
    const result = generateRandomLettersWithVowels(50);
    for (const letter of result) {
      expect(ALPHABET.includes(letter)).toBe(true);
    }
  });

  it('defaults to 20 letters if no count is provided', () => {
    const result = generateRandomLettersWithVowels();
    expect(result).toHaveLength(20);
  });

  it('returns different results most of the time', () => {
    const result1 = generateRandomLettersWithVowels(10);
    const result2 = generateRandomLettersWithVowels(10);
    // Not guaranteed, but very likely
    expect(result1.join('')).not.toEqual(result2.join(''));
  });
});
