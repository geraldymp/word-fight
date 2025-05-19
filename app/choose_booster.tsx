// app/choose_booster.tsx
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { boosters } from '../constants/boosters';
import { useGameStore } from '../store/useGameStore';
import { IBooster } from '../types/IBooster';

export default function ChooseBoosterScreen() {
  const router = useRouter();
  const { addToJourney } = useGameStore();

  const { increasePlayerHP } = useGameStore()
  const increasePlayerBonusDamage = useGameStore((s) => s.setBonusDamage);
  // const increaseExtraGoldGained = useGameStore((s) => s.setBonusGold);

  const handleSelect = (booster: IBooster) => {
    const {id, name} = booster;
    if (id === 'extra-hp') {
        increasePlayerHP(10);
    };
    if (id === 'bonus-damage') increasePlayerBonusDamage(2);
    // if (id === 'gold-rush') increaseExtraGoldGained(5);

    addToJourney([{ name: name, type: 'booster', chosen: true }]); // Add the booster to the journey path
    router.replace('/choose_enemy'); // back to enemy select
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Booster</Text>
      <FlatList
        data={boosters}
        keyExtractor={(item) => item.id}
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
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    gap: 16,
  },
  card: {
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 16,
  },
  name: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
  },
  desc: {
    color: '#ccc',
  },
});
