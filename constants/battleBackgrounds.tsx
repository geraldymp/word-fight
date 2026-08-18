import { ImageSourcePropType } from 'react-native';

// TODO: Update to proper battle backgrounds for each area
export const battleBackgrounds: Record<
  string,
  ImageSourcePropType | undefined
> = {
  shop: undefined,
  fireCamp: undefined,
  forest: require('@assets/backgrounds/old_library.jpg'),
  calmBeach: require('@assets/backgrounds/calm_beach.jpg'),
  goblinCamp: require('@assets/backgrounds/forest.jpg'),
  witchSwamp: require('@assets/backgrounds/witch_swamp.jpg'),
  graveyard: require('@assets/backgrounds/graveyard.jpg'),
  futuristicCity: require('@assets/backgrounds/futuristic_city.jpg'),
  ancientKingdom: require('@assets/backgrounds/ancient_kingdom.jpg'),
  boss: require('@assets/backgrounds/ruined_village.jpg')
};
