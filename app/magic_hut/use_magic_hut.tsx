import { useGameStore } from 'app/store/useGameStore';
import { IBooster } from 'app/types/IBooster';
import { useRouter } from 'expo-router';

export default function UseMagicHut() {
  const router = useRouter();

  const { decreaseGold, increaseStep } = useGameStore();

  const handleSelect = (booster: IBooster) => {
    booster.action(useGameStore.getState());

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
