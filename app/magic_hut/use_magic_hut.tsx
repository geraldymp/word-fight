import { useGameStore } from 'app/store/useGameStore';
import { IBooster } from 'app/types/IBooster';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export default function UseMagicHut() {
  const router = useRouter();

  const { decreaseMana, increaseStep, mana } = useGameStore();

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

  const handleSelect = (booster?: IBooster) => {
    if (booster !== undefined) {
      // apply booster effect and decrease mana
      booster.action(useGameStore.getState());
      decreaseMana(booster.price);
    }

    increaseStep();
    router.replace('/choose_area');
  };

  return {
    actions: {
      handleSelect
    },
    states: {
      mana
    }
  };
}
