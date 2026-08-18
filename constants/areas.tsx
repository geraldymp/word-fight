import { IArea } from '@customTypes/IArea';

export const areas: IArea[] = [
  {
    step: 1,
    type: 'dungeon',
    content: [
      {
        id: 'forest',
        name: 'Forest',
        description:
          'A place where magic happened. Most of magician will fleed here to deepen their magic.'
      },
      {
        id: 'calmBeach',
        name: 'Calm Beach',
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
        name: 'Magic Hut',
        description:
          'Spent some gold here, Hero! No need to save it all if your journey end!'
      },
      {
        id: 'fireCamp',
        name: 'Fire camp',
        description: 'Take a rest. Your journey still far from finished'
      }
    ]
  },
  {
    step: 3,
    type: 'dungeon',
    content: [
      {
        id: 'witchSwamp',
        name: 'Witch Swamp',
        description: 'A place where a weirdest creatures belong to'
      },
      {
        id: 'graveyard',
        name: 'Graveyard',
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
        name: 'Magic Hut',
        description:
          'Spent some gold here, Hero! No need to save it all if your journey end!'
      },
      {
        id: 'fireCamp',
        name: 'Fire camp',
        description: 'Take a rest. Your journey still far from finished'
      }
    ]
  },
  {
    step: 5,
    type: 'dungeon',
    content: [
      {
        id: 'futuristicCity',
        name: 'Futuristic City',
        description:
          'Robots with the best mechanical weapons are gathering here'
      },
      {
        id: 'ancientKingdom',
        name: 'Ancient Kingdom',
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
        description: 'Those mana will be worthless if you dont spent it now'
      },
      {
        id: 'fireCamp',
        name: 'Fire camp',
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
        description: 'Finally, my journey will come to an end...'
      }
    ]
  }
];
