import { IEnemy } from '@customTypes/IEnemy';

interface IEnemies {
  step: number;
  area: string;
  content: IEnemy[];
}

// TODO: Rebalance numbers
export const enemies: IEnemies[] = [
  {
    step: 1,
    area: 'forest',
    content: [
      {
        id: 'juniorMage',
        name: 'Junior Mage',
        baseHp: 280,
        minDmg: 20,
        maxDmg: 30,
        minManaBounty: 5,
        maxManaBounty: 8,
        exp: 10
      },
      {
        id: 'oneEyedGoblin',
        name: 'One-eyed Goblin',
        baseHp: 320,
        minDmg: 20,
        maxDmg: 50,
        minManaBounty: 7,
        maxManaBounty: 10,
        exp: 15
      },
      {
        id: 'livingTree',
        name: 'Living Tree',
        baseHp: 300,
        minDmg: 20,
        maxDmg: 40,
        minManaBounty: 6,
        maxManaBounty: 9,
        exp: 10
      },
      {
        id: 'scarredGoblin',
        name: 'Scarred Goblin',
        baseHp: 380,
        minDmg: 10,
        maxDmg: 20,
        minManaBounty: 4,
        maxManaBounty: 9,
        exp: 10
      },
      {
        id: 'oldWarlock',
        name: 'Old Warlock',
        baseHp: 320,
        minDmg: 20,
        maxDmg: 50,
        minManaBounty: 7,
        maxManaBounty: 10,
        exp: 15
      }
    ]
  },
  {
    step: 1,
    area: 'calmBeach',
    content: [
      {
        id: 'duckMagician',
        name: 'Duck Magician',
        baseHp: 380,
        minDmg: 10,
        maxDmg: 20,
        minManaBounty: 4,
        maxManaBounty: 9,
        exp: 10
      },
      {
        id: 'frogMage',
        name: 'Frog Mage',
        baseHp: 400,
        minDmg: 10,
        maxDmg: 30,
        minManaBounty: 5,
        maxManaBounty: 10,
        exp: 10
      },
      {
        id: 'duckWarrior',
        name: 'Duck Warrior',
        baseHp: 420,
        minDmg: 10,
        maxDmg: 40,
        minManaBounty: 6,
        maxManaBounty: 11,
        exp: 15
      },
      {
        id: 'frogWizard',
        name: 'Frog Wizard',
        baseHp: 440,
        minDmg: 10,
        maxDmg: 40,
        minManaBounty: 6,
        maxManaBounty: 11,
        exp: 15
      },
      {
        id: 'northFairy',
        name: 'North Fairy',
        baseHp: 420,
        minDmg: 10,
        maxDmg: 40,
        minManaBounty: 6,
        maxManaBounty: 11,
        exp: 15
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
        baseHp: 290,
        minDmg: 25,
        maxDmg: 35,
        minManaBounty: 5,
        maxManaBounty: 8,
        exp: 10
      },
      {
        id: 'deadFace',
        name: 'Dead Face',
        baseHp: 310,
        minDmg: 25,
        maxDmg: 45,
        minManaBounty: 6,
        maxManaBounty: 9,
        exp: 10
      },
      {
        id: 'theFrankenstein',
        name: 'The Frankenstein',
        baseHp: 330,
        minDmg: 25,
        maxDmg: 55,
        minManaBounty: 7,
        maxManaBounty: 10,
        exp: 25
      },
      {
        id: 'goblinGargoyle',
        name: 'Goblin Gargoyle',
        baseHp: 330,
        minDmg: 25,
        maxDmg: 55,
        minManaBounty: 7,
        maxManaBounty: 10,
        exp: 25
      },
      {
        id: 'soulProphet',
        name: 'Soul Prophet',
        baseHp: 330,
        minDmg: 25,
        maxDmg: 55,
        minManaBounty: 7,
        maxManaBounty: 10,
        exp: 25
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
        baseHp: 390,
        minDmg: 15,
        maxDmg: 25,
        minManaBounty: 4,
        maxManaBounty: 9,
        exp: 10
      },
      {
        id: 'beardedCentaur',
        name: 'Bearded Centaur',
        baseHp: 410,
        minDmg: 15,
        maxDmg: 35,
        minManaBounty: 5,
        maxManaBounty: 10,
        exp: 10
      },
      {
        id: 'theMedusa',
        name: 'The Medusa',
        baseHp: 430,
        minDmg: 15,
        maxDmg: 45,
        minManaBounty: 6,
        maxManaBounty: 11,
        exp: 25
      },
      {
        id: 'madGoblin',
        name: 'Mad Goblin',
        baseHp: 430,
        minDmg: 15,
        maxDmg: 45,
        minManaBounty: 6,
        maxManaBounty: 11,
        exp: 25
      },
      {
        id: 'overlordBeast',
        name: 'Overlord Beast',
        baseHp: 430,
        minDmg: 15,
        maxDmg: 45,
        minManaBounty: 6,
        maxManaBounty: 11,
        exp: 25
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
        baseHp: 320,
        minDmg: 30,
        maxDmg: 40,
        minManaBounty: 8,
        maxManaBounty: 12,
        exp: 30
      },
      {
        id: 'oldViking',
        name: 'Old Viking',
        baseHp: 340,
        minDmg: 30,
        maxDmg: 50,
        minManaBounty: 9,
        maxManaBounty: 13,
        exp: 30
      },
      {
        id: 'theExecutioner',
        name: 'The Executioner',
        baseHp: 360,
        minDmg: 30,
        maxDmg: 60,
        minManaBounty: 10,
        maxManaBounty: 15,
        exp: 50
      },
      {
        id: 'wanderingWarrior',
        name: 'Wandering Warrior',
        baseHp: 360,
        minDmg: 30,
        maxDmg: 60,
        minManaBounty: 10,
        maxManaBounty: 15,
        exp: 50
      },
      {
        id: 'blindGoblin',
        name: 'Blind Goblin',
        baseHp: 360,
        minDmg: 30,
        maxDmg: 60,
        minManaBounty: 10,
        maxManaBounty: 15,
        exp: 50
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
        baseHp: 420,
        minDmg: 20,
        maxDmg: 30,
        minManaBounty: 10,
        maxManaBounty: 11,
        exp: 30
      },
      {
        id: 'gunnerMachine',
        name: 'Gunner Machine',
        baseHp: 440,
        minDmg: 20,
        maxDmg: 40,
        minManaBounty: 11,
        maxManaBounty: 12,
        exp: 30
      },
      {
        id: 'flyingAndroid',
        name: 'Flying Android',
        baseHp: 460,
        minDmg: 20,
        maxDmg: 50,
        minManaBounty: 13,
        maxManaBounty: 14,
        exp: 50
      },
      {
        id: 'gearedRobot',
        name: 'Geared Robot',
        baseHp: 460,
        minDmg: 20,
        maxDmg: 50,
        minManaBounty: 13,
        maxManaBounty: 14,
        exp: 50
      },
      {
        id: 'thunderRevenant',
        name: 'Thunder Revenant',
        baseHp: 460,
        minDmg: 20,
        maxDmg: 50,
        minManaBounty: 13,
        maxManaBounty: 14,
        exp: 50
      }
    ]
  },
  {
    step: 7,
    area: 'boss',
    content: [
      {
        id: 'redMimic',
        name: 'Red Mimic',
        baseHp: 500,
        minDmg: 35,
        maxDmg: 65,
        minManaBounty: 50,
        maxManaBounty: 50,
        exp: 100
      },
      {
        id: 'grandMagi',
        name: 'Grand Magi',
        baseHp: 500,
        minDmg: 35,
        maxDmg: 65,
        minManaBounty: 50,
        maxManaBounty: 50,
        exp: 100
      }
    ]
  }
];
