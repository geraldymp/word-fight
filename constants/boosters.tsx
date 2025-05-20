import { IBooster } from '../types/IBooster';

export const boosters: IBooster[] = [
  {
    id: 'extra-hp',
    name: 'Extra HP',
    description: 'Increase your HP by 10',
    apply: () => {} // logic handled later
  },
  {
    id: 'bonus-damage',
    name: 'Bonus Damage',
    description: 'Deal +2 extra damage each turn',
    apply: () => {}
  }
  // {
  //   id: 'gold-rush',
  //   name: 'Gold Rush',
  //   description: 'Gain +5 gold per battle win',
  //   apply: () => {},
  // },
];
