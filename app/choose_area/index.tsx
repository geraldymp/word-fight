// app/choose_area.tsx
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import UseChooseArea from './use_choose_area';

export default function ChooseAreaScreen() {
  const { actions, states } = UseChooseArea();
  const { choices } = states;
  const { onPress } = actions;
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
