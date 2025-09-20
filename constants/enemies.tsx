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
        name: 'Junior Mage',
        image: require('../assets/enemies/forest/junior_mage.png'),
        baseHp: 36,
        minDmg: 3,
        maxDmg: 5,
        minManaBounty: 5,
        maxManaBounty: 8
      },
      {
        name: 'Living Tree',
        image: require('../assets/enemies/forest/living_tree.png'),
        baseHp: 38,
        minDmg: 3,
        maxDmg: 5,
        minManaBounty: 6,
        maxManaBounty: 9
      },
      {
        name: 'Old Warlock',
        image: require('../assets/enemies/forest/old_warlock.png'),
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
    area: 'goblin_camp',
    content: [
      {
        name: 'Scarred Goblin',
        image: require('../assets/enemies/goblin_camp/scarred_goblin.png'),
        baseHp: 45,
        minDmg: 1,
        maxDmg: 3,
        minManaBounty: 4,
        maxManaBounty: 9
      },
      {
        name: 'One-eyed Goblin',
        image: require('../assets/enemies/goblin_camp/one_eyed_goblin.png'),
        baseHp: 48,
        minDmg: 2,
        maxDmg: 3,
        minManaBounty: 5,
        maxManaBounty: 10
      },
      {
        name: 'Mad Goblin',
        image: require('../assets/enemies/goblin_camp/mad_goblin.png'),
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
        name: 'Cracked Skull',
        image: require('../assets/enemies/graveyard/cracked_skull.png'),
        baseHp: 41,
        minDmg: 3,
        maxDmg: 5,
        minManaBounty: 5,
        maxManaBounty: 8
      },
      {
        name: 'Dead Face',
        image: require('../assets/enemies/graveyard/dead_face.png'),
        baseHp: 42,
        minDmg: 3,
        maxDmg: 5,
        minManaBounty: 6,
        maxManaBounty: 9
      },
      {
        name: 'The Frankenstein',
        image: require('../assets/enemies/graveyard/the_frankenstein.png'),
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
    area: 'witch_swamp',
    content: [
      {
        name: 'White Moss',
        image: require('../assets/enemies/witch_swamp/white_moss.png'),
        baseHp: 55,
        minDmg: 1,
        maxDmg: 3,
        minManaBounty: 4,
        maxManaBounty: 9
      },
      {
        name: 'Bearded Centaur',
        image: require('../assets/enemies/witch_swamp/bearded_centaur.png'),
        baseHp: 55,
        minDmg: 2,
        maxDmg: 3,
        minManaBounty: 5,
        maxManaBounty: 10
      },
      {
        name: 'The Medusa',
        image: require('../assets/enemies/witch_swamp/the_medusa.png'),
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
    area: 'ancient_kingdom',
    content: [
      {
        name: 'Metal Knight',
        image: require('../assets/enemies/ancient_kingdom/metal_knight.png'),
        baseHp: 60,
        minDmg: 2,
        maxDmg: 3,
        minManaBounty: 8,
        maxManaBounty: 12
      },
      {
        name: 'Old Viking',
        image: require('../assets/enemies/ancient_kingdom/old_viking.png'),
        baseHp: 60,
        minDmg: 2,
        maxDmg: 4,
        minManaBounty: 9,
        maxManaBounty: 13
      },
      {
        name: 'The Executioner',
        image: require('../assets/enemies/ancient_kingdom/the_executioner.png'),
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
    area: 'futuristic_city',
    content: [
      {
        name: 'Half Cyborg',
        image: require('../assets/enemies/futuristic_city/half_cyborg.png'),
        baseHp: 46,
        minDmg: 5,
        maxDmg: 7,
        minManaBounty: 10,
        maxManaBounty: 11
      },
      {
        name: 'Gunner Machine',
        image: require('../assets/enemies/futuristic_city/gunner_machine.png'),
        baseHp: 48,
        minDmg: 5,
        maxDmg: 7,
        minManaBounty: 11,
        maxManaBounty: 12
      },
      {
        name: 'Flying Android',
        image: require('../assets/enemies/futuristic_city/flying_android.png'),
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
        name: 'Azazel the Archmage',
        image: require('../assets/enemies/boss/azazel_the_archmage.png'),
        baseHp: 70,
        minDmg: 10,
        maxDmg: 15,
        minManaBounty: 99,
        maxManaBounty: 99
      }
    ]
  }
];
