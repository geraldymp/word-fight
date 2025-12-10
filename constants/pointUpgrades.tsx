export interface UpgradeDefinition {
  id: string;
  name: string;
  type: 'damage' | 'hp' | 'mana';
  letters?: string[];
  bonusPerLevel: number;
  level: number;
  maxLevel: number;
  costs: number[];
}

export const DEFAULT_UPGRADE_LIST: UpgradeDefinition[] = [
  {
    id: 'aiueo',
    name: 'AIUEO Bonus Damage',
    type: 'damage',
    letters: ['A', 'I', 'U', 'E', 'O'],
    bonusPerLevel: 5,
    level: 0,
    maxLevel: 3,
    costs: [1, 3, 6]
  },
  {
    id: 'dgln',
    name: 'DGLN Bonus Damage',
    type: 'damage',
    letters: ['D', 'G', 'L', 'N'],
    bonusPerLevel: 5,
    level: 0,
    maxLevel: 3,
    costs: [1, 3, 6]
  },
  {
    id: 'rst',
    name: 'RST Bonus Damage',
    type: 'damage',
    letters: ['R', 'S', 'T'],
    bonusPerLevel: 5,
    level: 0,
    maxLevel: 3,
    costs: [1, 3, 6]
  },
  {
    id: 'bcf',
    name: 'BCF Bonus Damage',
    type: 'damage',
    letters: ['B', 'C', 'F'],
    bonusPerLevel: 10,
    level: 0,
    maxLevel: 3,
    costs: [1, 3, 6]
  },
  {
    id: 'hmp',
    name: 'HMP Bonus Damage',
    type: 'damage',
    letters: ['H', 'M', 'P'],
    bonusPerLevel: 10,
    level: 0,
    maxLevel: 3,
    costs: [1, 3, 6]
  },
  {
    id: 'vwy',
    name: 'VWY Bonus Damage',
    type: 'damage',
    letters: ['V', 'W', 'Y'],
    bonusPerLevel: 15,
    level: 0,
    maxLevel: 3,
    costs: [1, 3, 6]
  },
  {
    id: 'jk',
    name: 'JK Bonus Damage',
    type: 'damage',
    letters: ['J', 'K'],
    bonusPerLevel: 18,
    level: 0,
    maxLevel: 3,
    costs: [1, 3, 6]
  },
  {
    id: 'xz',
    name: 'XZ Bonus Damage',
    type: 'damage',
    letters: ['X', 'Z'],
    bonusPerLevel: 25,
    level: 0,
    maxLevel: 3,
    costs: [1, 3, 6]
  },
  {
    id: 'q',
    name: 'Q Bonus Damage',
    type: 'damage',
    letters: ['Q'],
    bonusPerLevel: 35,
    level: 0,
    maxLevel: 3,
    costs: [1, 3, 6]
  },
  {
    id: 'hp',
    name: 'Bonus HP',
    type: 'hp',
    bonusPerLevel: 50,
    level: 0,
    maxLevel: 3,
    costs: [1, 3, 6]
  },
  {
    id: 'mana',
    name: 'Bonus Starting Mana',
    type: 'mana',
    bonusPerLevel: 15,
    level: 0,
    maxLevel: 3,
    costs: [1, 3, 6]
  }
];
