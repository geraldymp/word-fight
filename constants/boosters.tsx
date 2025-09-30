import { IBooster } from '@customTypes/IBooster';
import { KeyValues } from 'app/constants/keyValues';

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
    id: 'restorationSpell',
    name: 'Restoration Spell',
    description: `Restore HP by ${shop.restorationSpell}`,
    image: require('@assets/icons/shop/restoration.png'),
    type: 'lower',
    action: store => store.increasePlayerHP(shop.restorationSpell),
    price: 20
  },
  {
    id: 'fullHealMagic',
    name: 'Full Heal Magic',
    description: `Restore HP 100%`,
    image: require('@assets/icons/shop/restoration.png'),
    type: 'higher',
    action: store => store.increasePlayerHP(shop.fullHealMagic),
    price: 40
  },
  {
    id: 'intelligenceScroll',
    name: 'Intelligence Scroll',
    description: `Increase total damage by +${shop.intelligenceScroll}`,
    image: require('@assets/icons/shop/scroll_1.png'),
    type: 'lower',
    action: store => store.setBonusDamage(shop.intelligenceScroll),
    price: 25
  },
  {
    id: 'intelligenceBook',
    name: 'Intelligence Book',
    description: `Increase total damage by +${shop.intelligenceBook}`,
    image: require('@assets/icons/shop/book_1.png'),
    type: 'higher',
    action: store => store.setBonusDamage(shop.intelligenceBook),
    price: 45
  },
  {
    id: 'vowelScroll',
    name: 'Vowel Scroll',
    description: `Every Vowel will deal +${shop.vowelScroll} more damage`,
    image: require('@assets/icons/shop/scroll_1.png'),
    type: 'lower',
    action: store => store.setVowelModifier(shop.vowelScroll),
    price: 25
  },
  {
    id: 'vowelBook',
    name: 'Vowel Book',
    description: `Every Vowel will deal +${shop.vowelBook} more damage`,
    image: require('@assets/icons/shop/book_1.png'),
    type: 'higher',
    action: store => store.setVowelModifier(shop.vowelBook),
    price: 45
  },
  {
    id: 'genesisScroll',
    name: 'Genesis Scroll',
    description: `Every ABCDE letter will deal +${shop.genesisScroll} more damage`,
    image: require('@assets/icons/shop/scroll_1.png'),
    type: 'lower',
    action: store => store.setABCDEModifier(shop.genesisScroll),
    price: 25
  },
  {
    id: 'genesisBook',
    name: 'Genesis Book',
    description: `Every ABCDE letter will deal +${shop.genesisBook} more damage`,
    image: require('@assets/icons/shop/book_1.png'),
    type: 'higher',
    action: store => store.setABCDEModifier(shop.genesisBook),
    price: 45
  },
  {
    id: 'omegaScroll',
    name: 'Omega Scroll',
    description: `Every VWXYZ letter will deal +${shop.omegaScroll} more damage`,
    image: require('@assets/icons/shop/scroll_2.png'),
    type: 'lower',
    action: store => store.setVWXYZRModifier(shop.omegaScroll),
    price: 20
  },
  {
    id: 'omegaBook',
    name: 'Omega Book',
    description: `Every VWXYZ letter will deal +${shop.omegaBook} more damage`,
    image: require('@assets/icons/shop/book_2.png'),
    type: 'higher',
    action: store => store.setVWXYZRModifier(shop.omegaBook),
    price: 40
  },
  {
    id: 'scrollOfWorking',
    name: 'Scroll of Working',
    description: `Word with ING will deal +${shop.scrollOfWorking} more damage`,
    image: require('@assets/icons/shop/scroll_2.png'),
    type: 'lower',
    action: store => store.setIngModifier(shop.scrollOfWorking),
    price: 20
  },
  {
    id: 'bookOfWorking',
    name: 'Book of Working',
    description: `Word with ING will deal +${shop.bookOfWorking} more damage`,
    image: require('@assets/icons/shop/book_2.png'),
    type: 'higher',
    action: store => store.setIngModifier(shop.bookOfWorking),
    price: 40
  },
  {
    id: 'scrollOfSaint',
    name: 'Scroll of Saint',
    description: `Every S and T letter will deal +${shop.scrollOfSaint} more damage`,
    image: require('@assets/icons/shop/scroll_3.png'),
    type: 'lower',
    action: store => store.setSTModifier(shop.scrollOfSaint),
    price: 25
  },
  {
    id: 'bookOfSaint',
    name: 'Book of Saint',
    description: `Every S and T letter will deal +${shop.bookOfSaint} more damage`,
    image: require('@assets/icons/shop/book_2.png'),
    type: 'higher',
    action: store => store.setSTModifier(shop.bookOfSaint),
    price: 40
  }
];
