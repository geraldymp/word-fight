import { KeyValues } from '@constants/key_values';
import { boosters } from 'app/constants/boosters';
import { useGameStore } from 'app/store/useGameStore';
import { useRouter } from 'expo-router';

export default function UseChooseSafeZone() {
  const router = useRouter();

  const { shop } = KeyValues;

  type BoosterId = (typeof boosters)[number]['id'];

  const {
    increasePlayerHP,
    setBonusDamage,
    setVowelModifier,
    setABCDEModifier,
    setVWXYZRModifier,
    setIngModifier,
    setSTModifier,
    increaseStep
  } = useGameStore();

  const handleSelect = (boosterId: BoosterId) => {
    switch (boosterId) {
      case 'restoration_kit':
        increasePlayerHP(shop.restoration_kit);
        break;
      case 'bulking_up':
        setBonusDamage(shop.bulking_up);
        break;
      case 'max-reshuffle':
        // Increase max reshuffle logic here
        break;
      case 'book_of_vowels':
        setVowelModifier(shop.book_of_vowels);
        break;
      case 'starter_briefcase':
        setABCDEModifier(shop.starter_briefcase);
        break;
      case 'omega_cleaver':
        setVWXYZRModifier(shop.omega_cleaver);
        break;
      case 'brush_of_ing':
        setIngModifier(shop.brush_of_ing);
        break;
      case 'saint_bow':
        setSTModifier(shop.saint_bow);
        break;
    }

    // addToJourney([{ name: name, type: 'booster', chosen: true }]); // Add the booster to the journey path
    increaseStep();
    router.replace('/choose_area'); // back to enemy select
  };

  return {
    actions: {
      handleSelect
    }
  };
}
