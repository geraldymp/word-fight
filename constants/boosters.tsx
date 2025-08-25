import { KeyValues } from '@constants/key_values';
import { IBooster } from '@customTypes/IBooster';

const { shop } = KeyValues;

export const boosters: IBooster[] = [
  {
    id: 'enlightenment',
    name: 'Enlightenment',
    description: `Gain +2 Max Reshuffle`,
    image: require('@assets/icons/shop/enlightenment.png'),
    type: 'lower',
    action: store => store.increaseMaxReshuffleAndFill(shop.enlightenment),
    price: 25
  },
  {
    id: 'restoration_spell',
    name: 'Restoration Spell',
    description: `Restore HP by ${shop.restoration_spell}`,
    image: require('@assets/icons/shop/restoration.png'),
    type: 'lower',
    action: store => store.increasePlayerHP(shop.restoration_spell),
    price: 20
  },
  {
    id: 'full_heal_magic',
    name: 'Full Heal Magic',
    description: `Restore HP 100%`,
    image: require('@assets/icons/shop/restoration.png'),
    type: 'higher',
    action: store => store.increasePlayerHP(shop.full_heal_magic),
    price: 40
  },
  {
    id: 'intelligence_scroll',
    name: 'Intelligence Scroll',
    description: `Increase total damage by +${shop.intelligence_scroll}`,
    image: require('@assets/icons/shop/scroll_1.png'),
    type: 'lower',
    action: store => store.setBonusDamage(shop.intelligence_scroll),
    price: 25
  },
  {
    id: 'intelligence_book',
    name: 'Intelligence Book',
    description: `Increase total damage by +${shop.intelligence_book}`,
    image: require('@assets/icons/shop/book_1.png'),
    type: 'higher',
    action: store => store.setBonusDamage(shop.intelligence_book),
    price: 45
  },
  {
    id: 'vowel_scroll',
    name: 'Vowel Scroll',
    description: `Every Vowel will deal +${shop.vowel_scroll} more damage`,
    image: require('@assets/icons/shop/scroll_1.png'),
    type: 'lower',
    action: store => store.setVowelModifier(shop.vowel_scroll),
    price: 25
  },
  {
    id: 'vowel_book',
    name: 'Vowel Book',
    description: `Every Vowel will deal +${shop.vowel_book} more damage`,
    image: require('@assets/icons/shop/book_1.png'),
    type: 'higher',
    action: store => store.setVowelModifier(shop.vowel_book),
    price: 45
  },
  {
    id: 'genesis_scroll',
    name: 'Genesis Scroll',
    description: `Every ABCDE letter will deal +${shop.genesis_scroll} more damage`,
    image: require('@assets/icons/shop/scroll_1.png'),
    type: 'lower',
    action: store => store.setABCDEModifier(shop.genesis_scroll),
    price: 25
  },
  {
    id: 'genesis_book',
    name: 'Genesis Book',
    description: `Every ABCDE letter will deal +${shop.genesis_book} more damage`,
    image: require('@assets/icons/shop/book_1.png'),
    type: 'higher',
    action: store => store.setABCDEModifier(shop.genesis_book),
    price: 45
  },
  {
    id: 'omega_scroll',
    name: 'Omega Scroll',
    description: `Every VWXYZ letter will deal +${shop.omega_scroll} more damage`,
    image: require('@assets/icons/shop/scroll_2.png'),
    type: 'lower',
    action: store => store.setVWXYZRModifier(shop.omega_scroll),
    price: 20
  },
  {
    id: 'omega_book',
    name: 'Omega Book',
    description: `Every VWXYZ letter will deal +${shop.omega_book} more damage`,
    image: require('@assets/icons/shop/book_2.png'),
    type: 'higher',
    action: store => store.setVWXYZRModifier(shop.omega_book),
    price: 40
  },
  {
    id: 'scroll_of_working',
    name: 'Scroll of Working',
    description: `Word with ING will deal +${shop.scroll_of_working} more damage`,
    image: require('@assets/icons/shop/scroll_2.png'),
    type: 'lower',
    action: store => store.setIngModifier(shop.scroll_of_working),
    price: 20
  },
  {
    id: 'book_of_working',
    name: 'Book of Working',
    description: `Word with ING will deal +${shop.book_of_working} more damage`,
    image: require('@assets/icons/shop/book_2.png'),
    type: 'higher',
    action: store => store.setIngModifier(shop.book_of_working),
    price: 40
  },
  {
    id: 'scroll_of_saint',
    name: 'Scroll of Saint',
    description: `Every S and T letter will deal +${shop.scroll_of_saint} more damage`,
    image: require('@assets/icons/shop/scroll_3.png'),
    type: 'lower',
    action: store => store.setSTModifier(shop.scroll_of_saint),
    price: 25
  },
  {
    id: 'book_of_saint',
    name: 'Book of Saint',
    description: `Every S and T letter will deal +${shop.book_of_saint} more damage`,
    image: require('@assets/icons/shop/book_2.png'),
    type: 'higher',
    action: store => store.setSTModifier(shop.book_of_saint),
    price: 40
  }
];
