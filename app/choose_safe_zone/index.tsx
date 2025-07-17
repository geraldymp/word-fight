// app/choose_booster.tsx
import { boosters } from '@constants/boosters';
import { IBooster } from '@customTypes/IBooster';
import { useGameStore } from '@store/useGameStore';
import { useRouter } from 'expo-router';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function ChooseBoosterScreen() {
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
        increasePlayerHP(10);
        break;
      case 'bonus-damage':
        setBonusDamage(3);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Booster</Text>
      <FlatList
        data={boosters}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleSelect(item)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  list: {
    gap: 16
  },
  card: {
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 16
  },
  name: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 8
  },
  desc: {
    color: '#ccc'
  }
});
