import { useGameStore } from '@store/useGameStore';
import { areas } from 'app/constants/areas';
import { enemies } from 'app/constants/enemies';
import { IArea } from 'app/types/IArea';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';

export default function UseChooseArea() {
  const { step, setSelectedEnemies, setArea } = useGameStore();
  const router = useRouter();
  const [choices, setChoices] = useState<IArea['content']>([]);

  function getEnemiesByArea(area: string) {
    return enemies.find(entry => entry.area === area)?.content || [];
  }

  function getSelectedAreaDetail(area: string) {
    return choices.find(entry => entry.id === area);
  }

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

  useEffect(() => {
    const filtered = areas.find(e => e.step === step)?.content || [];
    setChoices(filtered);
  }, [step]);

  function onPress(option: string) {
    if (step % 2 === 0) {
      if (option === 'shop') {
        router.replace('/magic_hut');
      } else if (option === 'fire_camp') {
        router.replace('/fire_camp');
      }
    } else {
      // Get set of enemies based on player area choice
      setSelectedEnemies(getEnemiesByArea(option));

      // Get detail data of selected area
      const selectedArea = getSelectedAreaDetail(option);
      if (selectedArea) {
        setArea?.(selectedArea);
      }
      router.replace('/battle');
    }
  }

  return {
    actions: {
      onPress
    },
    states: {
      choices
    }
  };
}
