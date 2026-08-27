import { IEnemy } from 'app/types/IEnemy';

export const mimics: IEnemy[] = [
  {
    id: 'redMimic',
    name: 'Red Mimic',
    baseHp: 13,
    minDmg: 0,
    maxDmg: 100,
    minManaBounty: 0,
    maxManaBounty: 0,
    exp: 10,
    defenseType: 'lengthOnly'
  },
  {
    id: 'goldenMimic',
    name: 'Golden Mimic',
    baseHp: 13,
    minDmg: 50,
    maxDmg: 70,
    minManaBounty: 0,
    maxManaBounty: 0,
    exp: 10,
    defenseType: 'lengthOnly'
  }
];
