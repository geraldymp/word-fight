import { ImageSourcePropType } from 'react-native';

export interface IEnemy {
  name: string;
  image: ImageSourcePropType | undefined;
  baseHp: number;
  minDmg: number;
  maxDmg: number;
  minManaBounty: number;
  maxManaBounty: number;
}
