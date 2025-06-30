// app/choose_area.tsx
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { areas } from '../constants/areas';
import { enemies } from '../constants/enemies';
import { useGameStore } from '../store/useGameStore';
import { IArea } from '../types/IArea';

export default function ChooseAreaScreen() {
  const { step, setSelectedEnemies } = useGameStore();
  const router = useRouter();

  const [choices, setChoices] = useState<IArea['content']>([]);

  function getEnemiesByArea(area: string) {
    return enemies.find(entry => entry.area === area)?.content || [];
  }

  useEffect(() => {
    const filtered = areas.find(e => e.step === step)?.content || [];
    setChoices(filtered);
  }, [step]);

  function onPress(option: string) {
    if (step === 3 || step === 5) {
      if (option === 'shop') {
        router.replace('/choose_safe_zone');
      } else if (option === 'fire_camp') {
        router.replace('/fire_camp');
      }
    } else {
      setSelectedEnemies(getEnemiesByArea(option));
      router.replace('/battle');
    }
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: 'white',
          alignSelf: 'center',
          fontSize: 20,
          marginVertical: 16
        }}
      >
        Choose your path
      </Text>
      {choices.map(option => (
        <TouchableOpacity
          key={option.id}
          style={styles.card}
          onPress={() => onPress(option.id)}
          testID={`select-area-btn-${option.id}`}
        >
          <ImageBackground style={styles.cardInner} source={option.image}>
            <Text style={styles.optionName}>{option.name}</Text>
            <View style={styles.descriptionWrapper}>
              <Text style={styles.descriptionText}>{option.description}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000'
  },
  card: {
    flex: 1,
    backgroundColor: '#2d2d44',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#555',
    overflow: 'hidden'
  },
  cardInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 12,
    borderRadius: 10
  },
  imagePlaceholder: {
    fontSize: 50,
    marginBottom: 12,
    color: '#ccc'
  },
  optionName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffe08a',
    textAlign: 'center',
    marginBottom: 32,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'red',
    borderRadius: 12
  },
  descriptionWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  descriptionText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center'
  }
});
