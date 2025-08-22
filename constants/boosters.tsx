import { KeyValues } from '@constants/key_values';
import { IBooster } from '@customTypes/IBooster';

const { shop } = KeyValues;

export const boosters: IBooster[] = [
  {
    id: 'enlightenment',
    name: 'Enlightenment',
    description: `Gain +2 Max Reshuffle`,
    image: require('@assets/icons/shop/restoration_kit.png'),
    type: 'lower'
  },
  {
    id: 'restoration_spell',
    name: 'Restoration Spell',
    description: `Restore HP by ${shop.restoration_spell}`,
    image: require('@assets/icons/shop/restoration_kit.png'),
    type: 'lower'
  },
  {
    id: 'full_heal_magic',
    name: 'Full Heal Magic',
    description: `Restore HP 100%`,
    image: require('@assets/icons/shop/restoration_kit.png'),
    type: 'higher'
  },
  {
    id: 'intelligence_scroll',
    name: 'Intelligence Scroll',
    description: `Increase total damage by +${shop.intelligence_scroll}`,
    image: require('@assets/icons/shop/restoration_kit.png'),
    type: 'lower'
  },
  {
    id: 'intelligence_book',
    name: 'Intelligence Book',
    description: `Increase total damage by +${shop.intelligence_book}`,
    image: require('@assets/icons/shop/restoration_kit.png'),
    type: 'higher'
  },
  {
    id: 'vowel_scroll',
    name: 'Vowel Scroll',
    description: `Every Vowel will deal +${shop.vowel_scroll} more damage`,
    image: require('@assets/icons/shop/restoration_kit.png'),
    type: 'lower'
  },
  {
    id: 'vowel_book',
    name: 'Vowel Book',
    description: `Every Vowel will deal +${shop.vowel_book} more damage`,
    image: require('@assets/icons/shop/restoration_kit.png'),
    type: 'higher'
  },
  {
    id: 'genesis_scroll',
    name: 'Genesis Scroll',
    description: `Every ABCDE letter will deal +${shop.genesis_scroll} more damage`,
    image: require('@assets/icons/shop/restoration_kit.png'),
    type: 'lower'
  },
  {
    id: 'genesis_book',
    name: 'Genesis Book',
    description: `Every ABCDE letter will deal +${shop.genesis_book} more damage`,
    image: require('@assets/icons/shop/restoration_kit.png'),
    type: 'higher'
  },
  {
    id: 'omega_scroll',
    name: 'Omega Scroll',
    description: `Every VWXYZ letter will deal +${shop.omega_scroll} more damage`,
    image: require('@assets/icons/shop/restoration_kit.png'),
    type: 'lower'
  },
  {
    id: 'omega_book',
    name: 'Omega Book',
    description: `Every VWXYZ letter will deal +${shop.omega_book} more damage`,
    image: require('@assets/icons/shop/restoration_kit.png'),
    type: 'higher'
  },
  {
    id: 'scroll_of_working',
    name: 'Scroll of Working',
    description: `Word with ING will deal +${shop.scroll_of_working} more damage`,
    image: require('@assets/icons/shop/restoration_kit.png'),
    type: 'lower'
  },
  {
    id: 'book_of_working',
    name: 'Book of Working',
    description: `Word with ING will deal +${shop.book_of_working} more damage`,
    image: require('@assets/icons/shop/restoration_kit.png'),
    type: 'higher'
  },
  {
    id: 'scroll_of_saint',
    name: 'Scroll of Saint',
    description: `Every S and T letter will deal +${shop.scroll_of_saint} more damage`,
    image: require('@assets/icons/shop/restoration_kit.png'),
    type: 'lower'
  },
  {
    id: 'book_of_saint',
    name: 'Book of Saint',
    description: `Every S and T letter will deal +${shop.book_of_saint} more damage`,
    image: require('@assets/icons/shop/restoration_kit.png'),
    type: 'higher'
  }
];
