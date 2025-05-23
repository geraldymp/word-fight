import { calculateBaseLetterDamage } from '../calculateDamage';

describe('calculateScore', () => {
  it('returns correct score', () => {
    expect(calculateBaseLetterDamage('hello')).toBe(8);
  });
});
