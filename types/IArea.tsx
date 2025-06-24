import { ImageSourcePropType } from 'react-native';

interface content {
  id: string;
  name: string;
  image: ImageSourcePropType | undefined;
  description: string;
}

export interface IArea {
  step: number;
  type: 'dungeon' | 'rest' | 'boss';
  content: content[];
}
