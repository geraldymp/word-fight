import { ILetter } from 'app/types/ILetter';

const MAX_DUPLICATE = 2;

// Pick a random letter from a pool, skipping ones that already hit the duplicate cap.
// Falls back to the full pool if every letter in it is capped out (avoids infinite loop / crash).
export function pickAvailableLetter(
  pool: ILetter[],
  counts: Record<string, number>
): ILetter {
  const available = pool.filter(
    item => (counts[item.letter] || 0) < MAX_DUPLICATE
  );
  const source = available.length > 0 ? available : pool;
  const picked = source[Math.floor(Math.random() * source.length)];
  counts[picked.letter] = (counts[picked.letter] || 0) + 1;
  return picked;
}
