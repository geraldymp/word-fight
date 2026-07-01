import Colors from 'app/foundation/colors';
import { ILetter } from 'app/types/ILetter';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming
} from 'react-native-reanimated';

interface INormalTile {
  item: ILetter;
  index: number;
  handleLetterPress: (i: number) => void;
  selectedIndices: number[];
}

const screenHeight = Dimensions.get('window').height;
const diceSize = screenHeight / 20;
const diceTextSize = (diceSize * 3) / 6;
const BUTTON_GRADIENT = ['#f7e7c6', '#f5ce64ff'] as const; // light gold gradient for buttons

const _NormalTile: React.FC<INormalTile> = ({
  item,
  index,
  handleLetterPress,
  selectedIndices
}) => {
  const entrance = useSharedValue(0);

  useEffect(() => {
    entrance.value = 0;
    entrance.value = withDelay(
      index * 40,
      withTiming(1, { duration: 200, easing: Easing.out(Easing.back(1.5)) })
    );
  }, []);

  const entranceStyle = useAnimatedStyle(() => ({
    transform: [{ scale: entrance.value }],
    opacity: entrance.value
  }));

  return (
    <Animated.View style={entranceStyle}>
      <TouchableOpacity
        style={[
          styles.letterTile,
          { backgroundColor: Colors.neutralDark } // There is View inside to make shadowing effect
        ]}
        onPress={() => handleLetterPress(index)}
        testID={`letter-${item}`}>
        <LinearGradient
          colors={BUTTON_GRADIENT}
          style={[
            styles.letterTile,
            { bottom: 2 },
            selectedIndices.includes(index) && styles.selectedTile
          ]}>
          <Text style={styles.letter}>{item.letter.toUpperCase()}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const NormalTile = React.memo(_NormalTile);

const styles = StyleSheet.create({
  letterTile: {
    width: diceSize,
    height: diceSize,
    margin: 3,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  selectedTile: {
    borderWidth: 3,
    borderColor: Colors.borderBlue,
    bottom: 0
  },
  letter: {
    fontSize: diceTextSize,
    color: Colors.neutralDark,
    fontFamily: 'SourGummy_800ExtraBold'
  }
});
