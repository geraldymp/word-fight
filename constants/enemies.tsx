import { IEnemy } from "@/types/IEnemy";

interface IEnemies {
  step: number;
  area: string;
  content: IEnemy[]
}

export const enemies: IEnemies[] = [
  {
    step: 1,
    area: 'forest',
    content: [
      {
        name: 'Junior Mage',
        image: require('../assets/enemieses/forest/junior_mage.png'),
        baseHp: 30,
        minDmg: 3,
        maxDmg: 5,
        goldReward: 10
      },
      {
        name: 'Living Tree',
        image: require('../assets/enemieses/forest/living_tree.png'),
        baseHp: 30,
        minDmg: 3,
        maxDmg: 5,
        goldReward: 10
      },
      {
        name: 'Old Warlock',
        image: require('../assets/enemieses/forest/old_warlock.png'),
        baseHp: 30,
        minDmg: 3,
        maxDmg: 5,
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
        baseHp: 30,
        minDmg: 3,
        maxDmg: 5,
        goldReward: 10
      },
      {
        name: 'Mad Goblin',
        image: require('../assets/enemieses/goblin_camp/mad_goblin.png'),
        baseHp: 30,
        minDmg: 3,
        maxDmg: 5,
        goldReward: 10
      },
      {
        name: 'Scarred Goblin',
        image: require('../assets/enemieses/goblin_camp/scarred_goblin.png'),
        baseHp: 30,
        minDmg: 3,
        maxDmg: 5,
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
        baseHp: 30,
        minDmg: 3,
        maxDmg: 5,
        goldReward: 10
      },
      {
        name: 'Dead Face',
        image: require('../assets/enemieses/graveyard/dead_face.png'),
        baseHp: 30,
        minDmg: 3,
        maxDmg: 5,
        goldReward: 10
      },
      {
        name: 'The Frankenstein',
        image: require('../assets/enemieses/graveyard/the_frankenstein.png'),
        baseHp: 30,
        minDmg: 3,
        maxDmg: 5,
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
        baseHp: 30,
        minDmg: 3,
        maxDmg: 5,
        goldReward: 10
      },
      {
        name: 'Bearded Centaur',
        image: require('../assets/enemieses/witch_swamp/bearded_centaur.png'),
        baseHp: 30,
        minDmg: 3,
        maxDmg: 5,
        goldReward: 10
      },
      {
        name: 'The Medusa',
        image: require('../assets/enemieses/witch_swamp/the_medusa.png'),
        baseHp: 30,
        minDmg: 3,
        maxDmg: 5,
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
        baseHp: 30,
        minDmg: 3,
        maxDmg: 5,
        goldReward: 10
      },
      {
        name: 'Old Viking',
        image: require('../assets/enemieses/ancient_kingdom/old_viking.png'),
        baseHp: 30,
        minDmg: 3,
        maxDmg: 5,
        goldReward: 10
      },
      {
        name: 'The Executioner',
        image: require('../assets/enemieses/ancient_kingdom/the_executioner.png'),
        baseHp: 30,
        minDmg: 3,
        maxDmg: 5,
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
        baseHp: 30,
        minDmg: 3,
        maxDmg: 5,
        goldReward: 10
      },
      {
        name: 'Half Cyborg',
        image: require('../assets/enemieses/futuristic_city/half_cyborg.png'),
        baseHp: 30,
        minDmg: 3,
        maxDmg: 5,
        goldReward: 10
      },
      {
        name: 'Ancient Machine',
        image: require('../assets/enemieses/futuristic_city/ancient_machine.png'),
        baseHp: 30,
        minDmg: 3,
        maxDmg: 5,
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
        baseHp: 30,
        minDmg: 3,
        maxDmg: 5,
        goldReward: 10
      }
    ]
  }
]
