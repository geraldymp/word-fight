import { IEnemy } from '@/types/IEnemy';

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
        name: 'Junior Mage',
        image: require('../assets/enemies/forest/junior_mage.png'),
        baseHp: 40,
        minDmg: 3,
        maxDmg: 5,
        goldReward: 10
      },
      {
        name: 'Living Tree',
        image: require('../assets/enemies/forest/living_tree.png'),
        baseHp: 42,
        minDmg: 3,
        maxDmg: 5,
        goldReward: 12
      },
      {
        name: 'Old Warlock',
        image: require('../assets/enemies/forest/old_warlock.png'),
        baseHp: 45,
        minDmg: 5,
        maxDmg: 7,
        goldReward: 15
      }
    ]
  },
  {
    step: 1,
    area: 'goblin_camp',
    content: [
      {
        name: 'Big Ear Goblin',
        image: require('../assets/enemies/goblin_camp/big_ear_goblin.png'),
        baseHp: 55,
        minDmg: 1,
        maxDmg: 3,
        goldReward: 12
      },
      {
        name: 'Mad Goblin',
        image: require('../assets/enemies/goblin_camp/mad_goblin.png'),
        baseHp: 55,
        minDmg: 2,
        maxDmg: 3,
        goldReward: 13
      },
      {
        name: 'Scarred Goblin',
        image: require('../assets/enemies/goblin_camp/scarred_goblin.png'),
        baseHp: 60,
        minDmg: 3,
        maxDmg: 5,
        goldReward: 15
      }
    ]
  },
  {
    step: 2,
    area: 'graveyard',
    content: [
      {
        name: 'Cracked Skull',
        image: require('../assets/enemies/graveyard/cracked_skull.png'),
        baseHp: 40,
        minDmg: 3,
        maxDmg: 5,
        goldReward: 12
      },
      {
        name: 'Dead Face',
        image: require('../assets/enemies/graveyard/dead_face.png'),
        baseHp: 42,
        minDmg: 3,
        maxDmg: 5,
        goldReward: 12
      },
      {
        name: 'The Frankenstein',
        image: require('../assets/enemies/graveyard/the_frankenstein.png'),
        baseHp: 45,
        minDmg: 5,
        maxDmg: 7,
        goldReward: 15
      }
    ]
  },
  {
    step: 2,
    area: 'witch_swamp',
    content: [
      {
        name: 'Smilling Pumpkin',
        image: require('../assets/enemies/witch_swamp/smilling_pumpkin.png'),
        baseHp: 55,
        minDmg: 1,
        maxDmg: 3,
        goldReward: 13
      },
      {
        name: 'Bearded Centaur',
        image: require('../assets/enemies/witch_swamp/bearded_centaur.png'),
        baseHp: 55,
        minDmg: 2,
        maxDmg: 3,
        goldReward: 14
      },
      {
        name: 'The Medusa',
        image: require('../assets/enemies/witch_swamp/the_medusa.png'),
        baseHp: 60,
        minDmg: 3,
        maxDmg: 5,
        goldReward: 16
      }
    ]
  },
  {
    step: 4,
    area: 'ancient_kingdom',
    content: [
      {
        name: 'Metal Knight',
        image: require('../assets/enemies/ancient_kingdom/metal_knight.png'),
        baseHp: 65,
        minDmg: 2,
        maxDmg: 3,
        goldReward: 20
      },
      {
        name: 'Old Viking',
        image: require('../assets/enemies/ancient_kingdom/old_viking.png'),
        baseHp: 60,
        minDmg: 2,
        maxDmg: 4,
        goldReward: 20
      },
      {
        name: 'The Executioner',
        image: require('../assets/enemies/ancient_kingdom/the_executioner.png'),
        baseHp: 65,
        minDmg: 3,
        maxDmg: 5,
        goldReward: 25
      }
    ]
  },
  {
    step: 4,
    area: 'futuristic_city',
    content: [
      {
        name: 'Revamped Android',
        image: require('../assets/enemies/futuristic_city/revamped_android.png'),
        baseHp: 46,
        minDmg: 5,
        maxDmg: 7,
        goldReward: 21
      },
      {
        name: 'Half Cyborg',
        image: require('../assets/enemies/futuristic_city/half_cyborg.png'),
        baseHp: 48,
        minDmg: 5,
        maxDmg: 7,
        goldReward: 23
      },
      {
        name: 'Ancient Machine',
        image: require('../assets/enemies/futuristic_city/ancient_machine.png'),
        baseHp: 50,
        minDmg: 9,
        maxDmg: 9,
        goldReward: 26
      }
    ]
  },
  {
    step: 6,
    area: 'boss',
    content: [
      {
        name: 'The Death',
        image: require('../assets/enemies/the_death.png'),
        baseHp: 70,
        minDmg: 10,
        maxDmg: 15,
        goldReward: 99
      }
    ]
  }
];
