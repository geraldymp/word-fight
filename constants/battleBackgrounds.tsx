import { ImageSourcePropType } from 'react-native';

export const battleBackgrounds: Record<
  string,
  ImageSourcePropType | undefined
> = {
  shop: undefined,
  fireCamp: undefined,
  forest: require('@assets/backgrounds/forest.jpg'),
  goblinCamp: require('@assets/backgrounds/forest.jpg'), // same as forest
  witchSwamp: require('@assets/backgrounds/witch_swamp.jpg'),
  graveyard: require('@assets/backgrounds/graveyard.jpg'),
  futuristicCity: require('@assets/backgrounds/futuristic_city.jpg'),
  ancientKingdom: require('@assets/backgrounds/ancient_kingdom.jpg'),
  boss: require('@assets/backgrounds/graveyard.jpg')
};
