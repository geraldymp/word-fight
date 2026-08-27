import { useGameStore } from '@store/useGameStore';
import { areas } from 'app/constants/areas';
import { enemies } from 'app/constants/enemies';
import { IArea } from 'app/types/IArea';
import { rollMimicEncounter } from 'app/utils/rollMimicEncounter';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';

export default function UseChooseArea() {
  const { step, setSelectedEnemies, setArea } = useGameStore();
  const router = useRouter();
  const [choices, setChoices] = useState<IArea['content']>([]);

  function getEnemiesByArea(area: string) {
    const base = enemies.find(entry => entry.area === area)?.content || [];
    return rollMimicEncounter(base, step);
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
    console.log('Filtered areas for step', step, filtered);
    setChoices(filtered);
  }, [step]);

  function onPress(optionId: string) {
    // If step is even, the player is choosing shop or fire camp
    if (step % 2 === 0) {
      if (optionId === 'shop') {
        router.replace('/magic_hut');
      } else if (optionId === 'fireCamp') {
        router.replace('/fire_camp');
      }
    } else {
      // If step is odd, the player is choosing an area to battle
      // Get set of enemies based on area
      setSelectedEnemies(getEnemiesByArea(optionId));

      // Get detail data of selected area
      const selectedArea = getSelectedAreaDetail(optionId);
      console.log('Selected area detail:', selectedArea);
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
