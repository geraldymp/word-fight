import { ImageSourcePropType } from 'react-native';

// for background images in Choose Area screen
// TODO: update to proper ones
export const areaImages: Record<string, ImageSourcePropType | undefined> = {
  shop: undefined,
  fireCamp: undefined,
  forest: require('@assets/areas/forest.jpg'),
  // goblinCamp: require('@assets/areas/goblin_camp.jpg'),
  witchSwamp: require('@assets/areas/witch_swamp.jpg'),
  graveyard: require('@assets/areas/graveyard.jpg'),
  futuristicCity: require('@assets/areas/futuristic_city.jpg'),
  ancientKingdom: require('@assets/areas/ancient_kingdom.jpg'),
  boss: require('@assets/areas/boss.jpg'),

  calm_beach: require('@assets/areas/goblin_camp.jpg')
};
