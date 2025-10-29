import { IEnemy } from '@customTypes/IEnemy';

interface IEnemies {
  step: number;
  area: string;
  content: IEnemy[];
}

export const enemies: IEnemies[] = [
  {
    step: 1,
    area: 'forest',
    content: [
      {
        id: 'juniorMage',
        name: 'Junior Mage',
        baseHp: 36,
        minDmg: 3,
        maxDmg: 5,
        minManaBounty: 5,
        maxManaBounty: 8
      },
      {
        id: 'livingTree',
        name: 'Living Tree',
        baseHp: 38,
        minDmg: 3,
        maxDmg: 5,
        minManaBounty: 6,
        maxManaBounty: 9
      },
      {
        id: 'oldWarlock',
        name: 'Old Warlock',
        baseHp: 40,
        minDmg: 5,
        maxDmg: 7,
        minManaBounty: 7,
        maxManaBounty: 10
      }
    ]
  },
  {
    step: 1,
    area: 'goblinCamp',
    content: [
      {
        id: 'scarredGoblin',
        name: 'Scarred Goblin',
        baseHp: 45,
        minDmg: 1,
        maxDmg: 3,
        minManaBounty: 4,
        maxManaBounty: 9
      },
      {
        id: 'oneEyedGoblin',
        name: 'One-eyed Goblin',
        baseHp: 48,
        minDmg: 2,
        maxDmg: 3,
        minManaBounty: 5,
        maxManaBounty: 10
      },
      {
        id: 'madGoblin',
        name: 'Mad Goblin',
        baseHp: 50,
        minDmg: 3,
        maxDmg: 5,
        minManaBounty: 6,
        maxManaBounty: 11
      }
    ]
  },
  {
    step: 3,
    area: 'graveyard',
    content: [
      {
        id: 'crackedSkull',
        name: 'Cracked Skull',
        baseHp: 41,
        minDmg: 3,
        maxDmg: 5,
        minManaBounty: 5,
        maxManaBounty: 8
      },
      {
        id: 'deadFace',
        name: 'Dead Face',
        baseHp: 42,
        minDmg: 3,
        maxDmg: 5,
        minManaBounty: 6,
        maxManaBounty: 9
      },
      {
        id: 'theFrankenstein',
        name: 'The Frankenstein',
        baseHp: 45,
        minDmg: 5,
        maxDmg: 7,
        minManaBounty: 7,
        maxManaBounty: 10
      }
    ]
  },
  {
    step: 3,
    area: 'witchSwamp',
    content: [
      {
        id: 'greenMoss',
        name: 'Green Moss',
        baseHp: 55,
        minDmg: 1,
        maxDmg: 3,
        minManaBounty: 4,
        maxManaBounty: 9
      },
      {
        id: 'beardedCentaur',
        name: 'Bearded Centaur',
        baseHp: 55,
        minDmg: 2,
        maxDmg: 3,
        minManaBounty: 5,
        maxManaBounty: 10
      },
      {
        id: 'theMedusa',
        name: 'The Medusa',
        baseHp: 60,
        minDmg: 3,
        maxDmg: 5,
        minManaBounty: 6,
        maxManaBounty: 11
      }
    ]
  },
  {
    step: 5,
    area: 'ancientKingdom',
    content: [
      {
        id: 'metalKnight',
        name: 'Metal Knight',
        baseHp: 60,
        minDmg: 2,
        maxDmg: 3,
        minManaBounty: 8,
        maxManaBounty: 12
      },
      {
        id: 'oldViking',
        name: 'Old Viking',
        baseHp: 60,
        minDmg: 2,
        maxDmg: 4,
        minManaBounty: 9,
        maxManaBounty: 13
      },
      {
        id: 'theExecutioner',
        name: 'The Executioner',
        baseHp: 65,
        minDmg: 3,
        maxDmg: 5,
        minManaBounty: 10,
        maxManaBounty: 15
      }
    ]
  },
  {
    step: 5,
    area: 'futuristicCity',
    content: [
      {
        id: 'halfCyborg',
        name: 'Half Cyborg',
        baseHp: 46,
        minDmg: 5,
        maxDmg: 7,
        minManaBounty: 10,
        maxManaBounty: 11
      },
      {
        id: 'gunnerMachine',
        name: 'Gunner Machine',
        baseHp: 48,
        minDmg: 5,
        maxDmg: 7,
        minManaBounty: 11,
        maxManaBounty: 12
      },
      {
        id: 'flyingAndroid',
        name: 'Flying Android',
        baseHp: 50,
        minDmg: 9,
        maxDmg: 9,
        minManaBounty: 13,
        maxManaBounty: 14
      }
    ]
  },
  {
    step: 7,
    area: 'boss',
    content: [
      {
        id: 'boss1',
        name: 'Azazel the Archmage',
        baseHp: 70,
        minDmg: 10,
        maxDmg: 15,
        minManaBounty: 50,
        maxManaBounty: 50
      }
    ]
  }
];
