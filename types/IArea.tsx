import { ImageSourcePropType } from 'react-native';

export interface IContent {
  id: string;
  name: string;
  image: ImageSourcePropType | undefined;
  battleBackground: ImageSourcePropType | undefined;
  description: string;
}

export interface IArea {
  step: number;
  type: 'dungeon' | 'rest' | 'boss';
  content: IContent[];
}
