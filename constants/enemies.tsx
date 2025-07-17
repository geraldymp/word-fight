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
        image: require('../assets/enemieses/forest/junior_mage.png'),
        baseHp: 28,
        minDmg: 7,
        maxDmg: 10,
        goldReward: 10
      },
      {
        name: 'Living Tree',
        image: require('../assets/enemieses/forest/living_tree.png'),
        baseHp: 24,
        minDmg: 8,
        maxDmg: 11,
        goldReward: 10
      },
      {
        name: 'Old Warlock',
        image: require('../assets/enemieses/forest/old_warlock.png'),
        baseHp: 22,
        minDmg: 9,
        maxDmg: 12,
        goldReward: 10
      }
    ]
  },
  {
    step: 1,
    area: 'goblin_camp',
    content: [
      {
        name: 'Big Ear Goblin',
        image: require('../assets/enemieses/goblin_camp/big_ear_goblin.png'),
        baseHp: 44,
        minDmg: 2,
        maxDmg: 4,
        goldReward: 10
      },
      {
        name: 'Mad Goblin',
        image: require('../assets/enemieses/goblin_camp/mad_goblin.png'),
        baseHp: 40,
        minDmg: 3,
        maxDmg: 5,
        goldReward: 10
      },
      {
        name: 'Scarred Goblin',
        image: require('../assets/enemieses/goblin_camp/scarred_goblin.png'),
        baseHp: 36,
        minDmg: 4,
        maxDmg: 6,
        goldReward: 10
      }
    ]
  },
  {
    step: 2,
    area: 'graveyard',
    content: [
      {
        name: 'Cracked Skull',
        image: require('../assets/enemieses/graveyard/cracked_skull.png'),
        baseHp: 32,
        minDmg: 10,
        maxDmg: 13,
        goldReward: 10
      },
      {
        name: 'Dead Face',
        image: require('../assets/enemieses/graveyard/dead_face.png'),
        baseHp: 28,
        minDmg: 11,
        maxDmg: 14,
        goldReward: 10
      },
      {
        name: 'The Frankenstein',
        image: require('../assets/enemieses/graveyard/the_frankenstein.png'),
        baseHp: 26,
        minDmg: 12,
        maxDmg: 15,
        goldReward: 10
      }
    ]
  },
  {
    step: 2,
    area: 'witch_swamp',
    content: [
      {
        name: 'Smilling Pumpkin',
        image: require('../assets/enemieses/witch_swamp/smilling_pumpkin.png'),
        baseHp: 54,
        minDmg: 4,
        maxDmg: 7,
        goldReward: 10
      },
      {
        name: 'Bearded Centaur',
        image: require('../assets/enemieses/witch_swamp/bearded_centaur.png'),
        baseHp: 50,
        minDmg: 5,
        maxDmg: 8,
        goldReward: 10
      },
      {
        name: 'The Medusa',
        image: require('../assets/enemieses/witch_swamp/the_medusa.png'),
        baseHp: 46,
        minDmg: 6,
        maxDmg: 9,
        goldReward: 10
      }
    ]
  },
  {
    step: 4,
    area: 'ancient_kingdom',
    content: [
      {
        name: 'Metal Knight',
        image: require('../assets/enemieses/ancient_kingdom/metal_knight.png'),
        baseHp: 38,
        minDmg: 14,
        maxDmg: 18,
        goldReward: 10
      },
      {
        name: 'Old Viking',
        image: require('../assets/enemieses/ancient_kingdom/old_viking.png'),
        baseHp: 34,
        minDmg: 15,
        maxDmg: 19,
        goldReward: 10
      },
      {
        name: 'The Executioner',
        image: require('../assets/enemieses/ancient_kingdom/the_executioner.png'),
        baseHp: 30,
        minDmg: 16,
        maxDmg: 20,
        goldReward: 10
      }
    ]
  },
  {
    step: 4,
    area: 'futuristic_city',
    content: [
      {
        name: 'Revamped Android',
        image: require('../assets/enemieses/futuristic_city/revamped_android.png'),
        baseHp: 70,
        minDmg: 7,
        maxDmg: 11,
        goldReward: 10
      },
      {
        name: 'Half Cyborg',
        image: require('../assets/enemieses/futuristic_city/half_cyborg.png'),
        baseHp: 64,
        minDmg: 8,
        maxDmg: 12,
        goldReward: 10
      },
      {
        name: 'Ancient Machine',
        image: require('../assets/enemieses/futuristic_city/ancient_machine.png'),
        baseHp: 58,
        minDmg: 9,
        maxDmg: 13,
        goldReward: 10
      }
    ]
  },
  {
    step: 6,
    area: 'boss',
    content: [
      {
        name: 'The Death',
        image: require('../assets/enemieses/the_death.png'),
        baseHp: 120,
        minDmg: 18,
        maxDmg: 25,
        goldReward: 10
      }
    ]
  }
];
