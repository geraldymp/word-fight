import { IArea } from '@customTypes/IArea';

export const areas: IArea[] = [
  {
    step: 1,
    type: 'dungeon',
    content: [
      {
        id: 'forest',
        name: 'Forest',
        image: require('@assets/areas/forest.jpg'),
        battleBackground: require('@assets/backgrounds/forest.jpg'),
        description:
          'A place where magic happened. Most of magician will fleed here to deepen their magic.'
      },
      {
        id: 'goblin_camp',
        name: 'Goblin Camp',
        image: require('@assets/areas/goblin_camp.jpg'),
        battleBackground: require('@assets/backgrounds/forest.jpg'),
        description:
          'Dangerous place, yet some people still gone to test their own strength'
      }
    ]
  },
  {
    step: 2,
    type: 'rest',
    content: [
      {
        id: 'shop',
        name: 'Shop',
        image: undefined,
        battleBackground: undefined,
        description:
          'Spent some gold here, Hero! No need to save it all if your journey end!'
      },
      {
        id: 'fire_camp',
        name: 'Fire camp',
        image: undefined,
        battleBackground: undefined,
        description: 'Take a rest. Your journey still far from finished'
      }
    ]
  },
  {
    step: 3,
    type: 'dungeon',
    content: [
      {
        id: 'witch_swamp',
        name: 'Witch Swamp',
        image: require('@assets/areas/witch_swamp.jpg'),
        battleBackground: require('@assets/backgrounds/witch_swamp.jpg'),
        description: 'A place where a weirdest creatures belong to'
      },
      {
        id: 'graveyard',
        name: 'Graveyard',
        image: require('@assets/areas/graveyard.jpg'),
        battleBackground: require('@assets/backgrounds/graveyard.jpg'),
        description:
          'They said `Silent as a grave`, yet this one full of lively creatures!'
      }
    ]
  },
  {
    step: 4,
    type: 'rest',
    content: [
      {
        id: 'shop',
        name: 'Shop',
        image: undefined,
        battleBackground: undefined,
        description:
          'Spent some gold here, Hero! No need to save it all if your journey end!'
      },
      {
        id: 'fire_camp',
        name: 'Fire camp',
        image: undefined,
        battleBackground: undefined,
        description: 'Take a rest. Your journey still far from finished'
      }
    ]
  },
  {
    step: 5,
    type: 'dungeon',
    content: [
      {
        id: 'futuristic_city',
        name: 'Futuristic City',
        image: require('@assets/areas/futuristic_city.jpg'),
        battleBackground: require('@assets/backgrounds/futuristic_city.jpg'),
        description:
          'Robots with the best mechanical weapons are gathering here'
      },
      {
        id: 'ancient_kingdom',
        name: 'Ancient Kingdom',
        image: require('@assets/areas/ancient_kingdom.jpg'),
        battleBackground: require('@assets/backgrounds/ancient_kingdom.jpg'),
        description:
          'Old place that should have been a ruin, but a magical being revive it'
      }
    ]
  },
  {
    step: 6,
    type: 'rest',
    content: [
      {
        id: 'shop',
        name: 'Shop',
        image: undefined,
        battleBackground: undefined,
        description: 'Those mana will be worthless if you dont spent it now'
      },
      {
        id: 'fire_camp',
        name: 'Fire camp',
        image: undefined,
        battleBackground: undefined,
        description: 'Take a rest, Hero! Be calm and be ready for what ahead!'
      }
    ]
  },
  {
    step: 7,
    type: 'boss',
    content: [
      {
        id: 'boss',
        name: 'Final Stage',
        image: require('../assets/areas/boss.jpg'),
        battleBackground: require('@assets/backgrounds/graveyard.jpg'),
        description: 'Finally, my journey will come to an end...'
      }
    ]
  }
];
