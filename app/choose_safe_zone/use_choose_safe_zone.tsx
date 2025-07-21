import { useGameStore } from "app/store/useGameStore";
import { IBooster } from "app/types/IBooster";
import { useRouter } from "expo-router";

export default function UseChooseSafeZone() {
  const router = useRouter();

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

  const handleSelect = (booster: IBooster) => {
    const { id, name } = booster;
    switch (id) {
      case 'restore-hp':
        increasePlayerHP(15);
        break;
      case 'bonus-damage':
        setBonusDamage(4);
        break;
      case 'max-reshuffle':
        // Increase max reshuffle logic here
        break;
      case 'vowel-boost':
        setVowelModifier(2);
        break;
      case 'abcde-boost':
        setABCDEModifier(3);
        break;
      case 'vwxyz-boost':
        setVWXYZRModifier(5);
        break;
      case 'ing-boost':
        setIngModifier(8);
        break;
      case 'st-boost':
        setSTModifier(4);
        break;
      default:
        console.warn(`Unknown booster ID: ${id}`);
        return;
    }

    // addToJourney([{ name: name, type: 'booster', chosen: true }]); // Add the booster to the journey path
    increaseStep();
    router.replace('/choose_area'); // back to enemy select
  };

  return {
    actions: {
        handleSelect
    }
  }
}