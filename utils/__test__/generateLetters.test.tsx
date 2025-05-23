// generateRandomLetters.test.ts
import { generateRandomLetters } from '../generateLetters';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

describe('generateRandomLetters', () => {
  it('returns correct number of letters', () => {
    const result = generateRandomLetters(10);
    expect(result).toHaveLength(10);
  });

  it('returns only letters from the alphabet', () => {
    const result = generateRandomLetters(50);
    for (const letter of result) {
      expect(ALPHABET.includes(letter)).toBe(true);
    }
  });

  it('defaults to 20 letters if no count is provided', () => {
    const result = generateRandomLetters();
    expect(result).toHaveLength(20);
  });

  it('returns different results most of the time', () => {
    const result1 = generateRandomLetters(10);
    const result2 = generateRandomLetters(10);
    // Not guaranteed, but very likely
    expect(result1.join('')).not.toEqual(result2.join(''));
  });
});
