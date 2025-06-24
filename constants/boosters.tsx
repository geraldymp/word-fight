import { IBooster } from '../types/IBooster';

export const boosters: IBooster[] = [
  {
    id: 'restore-hp',
    name: 'Restore HP',
    description: 'Restore HP by 10',
    apply: () => {}
  },
  {
    id: 'bonus-damage',
    name: 'Generalist',
    description: 'Increase total damage by 3',
    apply: () => {}
  },
  {
    id: 'max-reshuffle',
    name: 'Everyday Shuffling',
    description: 'Increase max Reshuffle by 1',
    apply: () => {}
  },
  {
    id: 'vowel-boost',
    name: 'Vowel Up',
    description: 'Every Vowel will deal +2 more damage',
    apply: () => {}
  },
  {
    id: 'abcde-boost',
    name: 'Starter Kit',
    description: 'Every ABCDE letter will deal +3 more damage',
    apply: () => {}
  },
  {
    id: 'vwxyz-boost',
    name: 'Omega Bundle',
    description: 'Every VWXYZ letter will deal +5 more damage',
    apply: () => {}
  },
  {
    id: 'ing-boost',
    name: 'Working Class',
    description: 'Word with ING will deal +8 more damage',
    apply: () => {}
  },
  {
    id: 'st-boost',
    name: 'The Saint',
    description: 'Every S and T letter will deal +4 more damage',
    apply: () => {}
  }
];
