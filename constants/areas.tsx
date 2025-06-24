import { IArea } from '../types/IArea'

export const areas: IArea[] = [
    {
        step: 1,
        type: 'dungeon',
        content: [
            {
                id: 'forest',
                name: 'Forest',
                image: require('../assets/areas/forest.jpg'),
                description: 'A place where magic happened. Most of magician will fleed here to deepen their magic.',
            },
            {
                id: 'goblin_camp',
                name: 'Goblin Camp',
                image: require('../assets/areas/goblin_camp.jpg'),
                description: 'Dangerous place, yet some people still gone to test their own strength',
            },
        ]
    },
    {
        step: 2,
        type: 'dungeon',
        content: [
            {
                id: 'witch_swamp',
                name: 'Witch Swamp',
                image: require('../assets/areas/witch_swamp.jpg'),
                description: 'What will happen if magicians can not control their own creation and let them run? You will find the answer here',
            },
            {
                id: 'graveyard',
                name: 'Graveyard',
                image: require('../assets/areas/graveyard.jpg'),
                description: 'They said `Silent as a grave`, yet this one full of lively creatures!',
            },
        ]
    },
    {
        step: 3,
        type: 'rest',
        content: [
            {
                id: 'shop',
                name: 'Shop',
                image: undefined,
                description: 'Spent some gold here, Hero! No need to save it all if your journey end!',
            },
            {
                id: 'fire_camp',
                name: 'Fire camp',
                image: undefined,
                description: 'Take a rest. Your journey still far from finished',
            }
        ]
    },
    {
        step: 4,
        type: 'dungeon',
        content: [
            {
                id: 'futuristic_city',
                name: 'Futuristic City',
                image: require('../assets/areas/futuristic_city.jpg'),
                description: 'You think the future will be kind? Not really',
            },
            {
                id: 'ancient_kingdom',
                name: 'Ancient Kingdom',
                image: require('../assets/areas/ancient_kingdom.jpg'),
                description: 'The past is in the past. Yet, this time, the past will come to get you!',
            }
        ]
    },
    {
        step: 5,
        type: 'rest',
        content: [
            {
                id: 'shop',
                name: 'Shop',
                image: undefined,
                description: 'This is the last reminder from me. Buy something or the gold might gone to waste!',
            },
            {
                id: 'fire_camp',
                name: 'Fire camp',
                image: undefined,
                description: 'Take a rest, Hero! Be calm and be ready for what ahead!',
            }
        ]
    },
    {
        step: 6,
        type: 'boss',
        content: [
            {
                id: 'boss',
                name: 'Boss',
                image: require('../assets/areas/boss.jpg'),
                description: 'Finally, my journey will come to an end (?)',
            }
        ]
    }

]