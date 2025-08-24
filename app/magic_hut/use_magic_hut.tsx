import { useGameStore } from 'app/store/useGameStore';
import { IBooster } from 'app/types/IBooster';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export default function UseMagicHut() {
  const router = useRouter();

  const { decreaseGold, increaseStep } = useGameStore();

  useEffect(() => {
    const backAction = () => {
      router.replace('/');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();
  }, [router]);

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
