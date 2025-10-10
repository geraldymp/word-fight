import { IDamageModifier } from 'app/types/IDamageModifier';

export const DamageModifierDefault: IDamageModifier = {
  bonusDamage: {
    value: 0,
    description: 'Total Damage: +'
  },
  vowelModifier: {
    value: 0,
    description: 'Every Vowel: +'
  },
  ABCDEModifier: {
    value: 0,
    description: 'Every ABCDE: +'
  },
  VWXYZModifier: {
    value: 0,
    description: 'Every VWXYZ: +'
  },
  IngModifier: {
    value: 0,
    description: 'If contain ING: +'
  },
  STModifier: {
    value: 0,
    description: 'Every S & T: +'
  }
};
