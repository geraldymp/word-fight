// app/choose_area.tsx
import Colors from 'app/foundation/colors';
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
      <Text style={styles.titleText}>Choose your path</Text>
      {choices.map(option => (
        <TouchableOpacity
          key={option.id}
          style={styles.card}
          onPress={() => onPress(option.id)}
          testID={`select-area-btn-${option.id}`}>
          <View style={styles.cardMiddleBorder}>
            <ImageBackground style={styles.cardInner} source={option.image}>
              <Text style={styles.optionName}>{option.name}</Text>
              <View style={styles.descriptionWrapper}>
                <Text style={styles.descriptionText}>{option.description}</Text>
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#A2B06D'
  },
  titleText: {
    color: Colors.neutralDark,
    alignSelf: 'center',
    fontSize: 20,
    marginVertical: 16,
    fontFamily: 'Candal_400Regular',
    textTransform: 'uppercase'
  },
  card: {
    flex: 1,
    backgroundColor: '#2d2d44',
    marginBottom: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#555',
    overflow: 'hidden'
  },
  cardMiddleBorder: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 5,
    borderColor: Colors.primary,
    overflow: 'hidden'
  },
  cardInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#555',
    overflow: 'hidden'
  },
  optionName: {
    fontSize: 26,
    fontFamily: 'Candal_400Regular',
    color: '#ffe08a',
    textAlign: 'center',
    marginBottom: 32,
    textShadowColor: 'black',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    textDecorationStyle: 'solid',
    overflow: 'hidden'
  },
  descriptionWrapper: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 3,
    borderColor: Colors.neutralDark
  },
  descriptionText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'SourGummy_400Regular'
  }
});
