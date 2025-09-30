export const HelperContents = [
  {
    id: 'how',
    title: 'How to Play',
    description: `Word Fight is a turn-based game where you need to create a word using 18 randomized letters to damage the enemy. Enemy will hit you back after your turn, so keep watching your health points.\nYour goal is to reach and beat the Boss`,
    image: require('@assets/word_fight_title.png')
  },
  {
    id: 'how2',
    title: 'Area Progression',
    description: `Start the game by selecting an Area which contains 3 enemies. After beating 3 Areas, you will reach the boss stage`,
    image: require('@assets/helper/helper_progress.png')
  },
  {
    id: 'how3',
    title: 'Magic Hut & Firecamp',
    description: `After beating every enemy in the Area, you can choose between Magic Hut and Firecamp. Buy upgrade using Mana in Magic Hut or rest in Firecamp if you need to save some mana`,
    image: require('@assets/icons/shop/magician.png')
  },
  {
    id: 'first',
    title: 'Enemy Detail',
    description: `A: Enemy Range of Damage\nB: Enemy Health Points\nC: Range of Mana gained when defeating the enemy\n\nEnemy will hit you back if they are still alive, so beating them quickly is a good strategy`,
    image: require('@assets/helper/helper_1.png')
  },
  {
    id: 'second',
    title: 'Word Builder',
    description: `A: Create a word from 18 random letters\nB: Selected letter to form a word\n\nThe longer the word, the greater the damage. Also, every letter has different damage, like XYZ damage is greater than AIUEO`,
    image: require('@assets/helper/helper_2.png')
  },
  {
    id: 'third',
    title: 'Bottom HUD Part 1',
    description: `A: Player Health Points\nB: Collected mana for this run\n\nBeating enemy will grant you Mana which can be used to upgrade yourself. Don't forget you lose the game if your health points is 0.`,
    image: require('@assets/helper/helper_3.png')
  },
  {
    id: 'fourth',
    title: 'Bottom HUD Part 2',
    description: `A: Reshuffle button and how many refresh left\nB: Rearrange button\nC: Submit button to attack the enemy with current word\n\nReshuffle means you get new set of letters. While Rearrange only change position of current set of letter.\nYou can Rearrange as many times as you like, but not Reshuffle`,
    image: require('@assets/helper/helper_4.png')
  },
  {
    id: 'fifth',
    title: 'Progression',
    description: `There are 3 enemies for every Area (except Boss). Green one for finished enemy, Yellow for current enemy and Empty for next enemy\n\n You only get 1 bonus Reshuffle every 1 Area. Use wisely!`,
    image: require('@assets/helper/helper_5.png')
  }
];
