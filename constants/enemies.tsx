import { IEnemy } from '../types/IEnemy';

export const enemies: IEnemy[] = [
  {
    name: '',
    image: null,
    baseHp: 0,
    minDmg: 0,
    maxDmg: 0,
    goldReward: 0,
    level: 0
  },

  {
    name: 'Happy Frog',
    image: require('../assets/enemies/happy_frog.png'),
    baseHp: 30,
    minDmg: 3,
    maxDmg: 5,
    goldReward: 10,
    level: 1
  },
  {
    name: 'Sleepy Head',
    image: require('../assets/enemies/sleepy_head.png'),
    baseHp: 30,
    minDmg: 2,
    maxDmg: 6,
    goldReward: 10,
    level: 1
  },
  {
    name: 'Yellow Tusk',
    image: require('../assets/enemies/yellow_tusk.png'),
    baseHp: 25,
    minDmg: 5,
    maxDmg: 5,
    goldReward: 10,
    level: 1
  },
  {
    name: 'Scar Face',
    image: require('../assets/enemies/scar_face.png'),
    baseHp: 20,
    minDmg: 5,
    maxDmg: 7,
    goldReward: 10,
    level: 1
  },
  {
    name: 'Dark Ghost',
    image: require('../assets/enemies/dark_ghost.png'),
    baseHp: 20,
    minDmg: 8,
    maxDmg: 9,
    goldReward: 10,
    level: 1
  },

  {
    name: 'Dead Face',
    image: require('../assets/enemies/dead_face.png'),
    baseHp: 35,
    minDmg: 4,
    maxDmg: 6,
    goldReward: 12,
    level: 2
  },
  {
    name: 'Cracked Skull',
    image: require('../assets/enemies/cracked_skull.png'),
    baseHp: 35,
    minDmg: 5,
    maxDmg: 7,
    goldReward: 12,
    level: 2
  },

  {
    name: 'Pirate Skull',
    image: require('../assets/enemies/pirate_skull.png'),
    baseHp: 40,
    minDmg: 6,
    maxDmg: 7,
    goldReward: 15,
    level: 3
  },
  {
    name: 'The Frankenstein',
    image: require('../assets/enemies/the_frankenstein.png'),
    baseHp: 38,
    minDmg: 6,
    maxDmg: 8,
    goldReward: 15,
    level: 3
  },
  {
    name: 'Scary Clown',
    image: require('../assets/enemies/scary_clown.png'),
    baseHp: 38,
    minDmg: 4,
    maxDmg: 7,
    goldReward: 15,
    level: 3
  },
  {
    name: 'Big Ear Goblin',
    image: require('../assets/enemies/big_ear_goblin.png'),
    baseHp: 22,
    minDmg: 2,
    maxDmg: 13,
    goldReward: 15,
    level: 3
  },

  {
    name: 'Evil Queen',
    image: require('../assets/enemies/evil_queen.png'),
    baseHp: 45,
    minDmg: 6,
    maxDmg: 10,
    goldReward: 20,
    level: 4
  },
  {
    name: 'Horned Cyclops',
    image: require('../assets/enemies/horned_cyclops.png'),
    baseHp: 45,
    minDmg: 4,
    maxDmg: 12,
    goldReward: 20,
    level: 4
  },
  {
    name: 'Mother of Demon',
    image: require('../assets/enemies/mother_of_demon.png'),
    baseHp: 35,
    minDmg: 8,
    maxDmg: 8,
    goldReward: 20,
    level: 4
  },

  {
    name: 'Fallen Angel',
    image: require('../assets/enemies/fallen_angel.png'),
    baseHp: 80,
    minDmg: 8,
    maxDmg: 10,
    goldReward: 25,
    level: 5
  },
  {
    name: 'Smiling Demon',
    image: require('../assets/enemies/smiling_demon.png'),
    baseHp: 50,
    minDmg: 12,
    maxDmg: 15,
    goldReward: 25,
    level: 5
  },
  {
    name: 'Ancient Cyborg',
    image: require('../assets/enemies/ancient_cyborg.png'),
    baseHp: 50,
    minDmg: 10,
    maxDmg: 18,
    goldReward: 25,
    level: 5
  }
];
