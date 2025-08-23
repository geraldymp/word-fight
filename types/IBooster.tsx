import { GameStoreType } from 'app/store/GameStoreType';
import { ImageSourcePropType } from 'react-native';

export interface IBooster {
  id: string;
  name: string;
  description: string;
  image: ImageSourcePropType | undefined;
  type: 'lower' | 'higher';
  action: (gameStore: GameStoreType) => void; // New field
}
