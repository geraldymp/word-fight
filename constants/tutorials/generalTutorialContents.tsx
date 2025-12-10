export const GeneralTutorialContents = [
  {
    id: 'how',
    title: 'How to play',
    description: `Welcome to Word Fight!\n\nThis is a turn-based game where you use a word to defeat the enemy.`,
    image: require('@assets/tutorial/battle/tutorial_6.png')
  },
  {
    id: 'choose',
    title: 'Choose Path',
    description: `Word Fight is about journey to reach the Final Stage.\n\nYou start by choosing between two Areas, where every Area have its own unique 3 set of enemies.\n\nAfter beating the Area, you can choose between Magic Hut and Fire Camp. And after beating 3 Areas, you will reach the Final Stage.`,
    image: require('@assets/tutorial/general/tutorial_2.png')
  },
  {
    id: 'hero',
    title: 'Hero Section',
    description: `At battle stage, your status will be displayed at the bottom part.\n\nYour current Mana will showed here, along with action buttons like Reshuffle, Cancel, Rearrange and Attack.\n\nYour current buff also showed here, which can be clicked to know about the detail. And the most important part is your HP, never let it drop to 0.`,
    image: require('@assets/tutorial/general/tutorial_3.png')
  },
  {
    id: 'enemy',
    title: 'Enemy Section',
    description: `Your enemy will stand in front of you. You can check their HP and range of damage.\n\nAfter you attack the enemy, they will attack back (unless they are beaten). The attack will be random between their range of damage.\n\nYou will get Mana after beating the enemy, which can be used to buy upgrade later.`,
    image: require('@assets/tutorial/general/tutorial_4.png')
  },
  {
    id: 'word',
    title: 'Create Word',
    description: `Use the letters to create a word and damage the enemy. The damage calculated by: Word Length, Letter Value and Buff.\n\nHard to use letter - like JQZ will give more damage. And you can gain Buff from Magic Hut or Fire Camp.\n\nYou can use Reshuffle to get new set of letters, which will replenish by 1 after clearing the Area.`,
    image: require('@assets/tutorial/general/tutorial_5.png')
  },
  {
    id: 'magic_hut',
    title: 'Magic Hut',
    description: `Magic Hut is a place to buy upgrades using Mana. There are 4 random items to buy, and you can refresh it once (twice for Premium user).\n\nYou can only buy 1 upgrade every visit. Every item can only be bought once.\n\nThere is also Secret Potion (Ad) to restore small HP. It can only be used twice a run.`,
    image: require('@assets/tutorial/general/tutorial_6.png')
  }
];
