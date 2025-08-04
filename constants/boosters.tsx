import { KeyValues } from '@constants/key_values';
import { IBooster } from '@customTypes/IBooster';

const { shop } = KeyValues;

export const boosters: IBooster[] = [
  {
    id: 'restoration_kit',
    name: 'Restoration Kit',
    description: `Restore HP by ${shop.restoration_kit}`,
    image: require('@assets/icons/shop/restoration_kit.png')
  },
  {
    id: 'bulking_up',
    name: 'Bulking Up',
    description: `Increase total damage by +${shop.bulking_up}`,
    image: require('@assets/icons/shop/bulking_up.png')
  },
  // {
  //   id: 'max-reshuffle',
  //   name: 'Everyday Shuffling',
  //   description: 'Increase max Reshuffle by 1',
  //   image: undefined
  // },
  {
    id: 'book_of_vowels',
    name: 'Book of Vowels',
    description: `Every Vowel will deal +${shop.book_of_vowels} more damage`,
    image: require('@assets/icons/shop/book_of_vowels.png')
  },
  {
    id: 'starter_briefcase',
    name: 'Starter Briefcase',
    description: `Every ABCDE letter will deal +${shop.starter_briefcase} more damage`,
    image: require('@assets/icons/shop/starter_briefcase.png')
  },
  {
    id: 'omega_cleaver',
    name: 'Omega Cleaver',
    description: `Every VWXYZ letter will deal +${shop.omega_cleaver} more damage`,
    image: require('@assets/icons/shop/omega_cleaver.png')
  },
  {
    id: 'brush_of_ing',
    name: 'Brush of Ing',
    description: `Word with ING will deal +${shop.brush_of_ing} more damage`,
    image: require('@assets/icons/shop/brush_of_ing.png')
  },
  {
    id: 'saint_bow',
    name: 'Saint Bow',
    description: `Every S and T letter will deal +${shop.saint_bow} more damage`,
    image: require('@assets/icons/shop/saint_bow.png')
  }
];
