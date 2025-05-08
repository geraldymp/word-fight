// utils/wordValidator.ts
import wordList from '../assets/words_alpha.json';

const wordListTyped: string[] = wordList as unknown as string[];

const wordSet = new Set(wordListTyped.map(w => w.toLowerCase()));

export function isValidWord(word: string): boolean {
  return wordSet.has(word.toLowerCase());
}
