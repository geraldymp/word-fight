import { KeyValues } from '@constants/key_values';
import { useGameStore } from 'app/store/useGameStore';
import { IBooster } from 'app/types/IBooster';
import { useRouter } from 'expo-router';

export default function UseMagicHut() {
  const router = useRouter();

  const { shop } = KeyValues;

  const {
    gold,
    decreaseGold,
    increasePlayerHP,
    setBonusDamage,
    setVowelModifier,
    setABCDEModifier,
    setVWXYZRModifier,
    setIngModifier,
    setSTModifier,
    increaseStep
  } = useGameStore();

  const handleSelect = (booster: IBooster) => {
    switch (booster.id) {
      case 'enlightenment':
        // increasePlayerHP(shop.restoration_kit);
        break;
      case 'restoration_spell':
        increasePlayerHP(shop.restoration_spell);
        break;
      case 'full_heal_magic':
        increasePlayerHP(100);
        break;
      case 'intelligence_scroll':
        setBonusDamage(shop.intelligence_scroll);
        break;
      case 'intelligence_book':
        setBonusDamage(shop.intelligence_book);
        break;
      case 'vowel_scroll':
        setVowelModifier(shop.vowel_scroll);
        break;
      case 'vowel_book':
        setVowelModifier(shop.vowel_book);
        break;
      case 'genesis_scroll':
        setABCDEModifier(shop.genesis_scroll);
        break;
      case 'genesis_book':
        setABCDEModifier(shop.genesis_book);
        break;
      case 'omega_scroll':
        setVWXYZRModifier(shop.omega_scroll);
        break;
      case 'omega_book':
        setVWXYZRModifier(shop.omega_book);
        break;
      case 'scroll_of_working':
        setIngModifier(shop.scroll_of_working);
        break;
      case 'book_of_working':
        setIngModifier(shop.book_of_working);
        break;
      case 'scroll_of_saint':
        setSTModifier(shop.scroll_of_saint);
        break;
      case 'book_of_saint':
        setSTModifier(shop.book_of_saint);
        break;
    }

    if (booster.type === 'higher') {
      decreaseGold(60);
    } else {
      decreaseGold(30);
    }
    increaseStep();
    router.replace('/choose_area'); // back to enemy select
  };

  return {
    actions: {
      handleSelect
    }
  };
}
