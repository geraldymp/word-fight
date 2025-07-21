import { boosters } from '@constants/boosters';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import UseChooseSafeZone from './use_choose_safe_zone';

export default function ChooseBoosterScreen() {
  const { actions } = UseChooseSafeZone();
  const { handleSelect } = actions;

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
