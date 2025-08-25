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
        battleBackground: require('@assets/backgrounds/forest.png'),
        description:
          'A place where magic happened. Most of magician will fleed here to deepen their magic.'
      },
      {
        id: 'goblin_camp',
        name: 'Goblin Camp',
        image: require('@assets/areas/goblin_camp.jpg'),
        battleBackground: require('@assets/backgrounds/forest.png'),
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
        battleBackground: require('@assets/backgrounds/graveyard.png'),
        description:
          'What will happen if magicians can not control their own creation and let them run? You will find the answer here'
      },
      {
        id: 'graveyard',
        name: 'Graveyard',
        image: require('@assets/areas/graveyard.jpg'),
        battleBackground: require('@assets/backgrounds/graveyard.png'),
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
        battleBackground: require('@assets/backgrounds/futuristic_city.png'),
        description: 'You think the future will be kind? Not really'
      },
      {
        id: 'ancient_kingdom',
        name: 'Ancient Kingdom',
        image: require('@assets/areas/ancient_kingdom.jpg'),
        battleBackground: require('@assets/backgrounds/futuristic_city.png'),
        description:
          'The past is in the past. Yet, this time, the past will come to get you!'
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
        description:
          'This is the last reminder from me. Buy something or the gold might gone to waste!'
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
        name: 'Boss',
        image: require('../assets/areas/boss.jpg'),
        battleBackground: require('@assets/backgrounds/graveyard.png'),
        description: 'Finally, my journey will come to an end (?)'
      }
    ]
  }
];
