import Colors from 'app/foundation/colors';
import { ILetter } from 'app/types/ILetter';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface INumberedTile {
  item: ILetter;
  index: number;
  handleLetterPress: (i: number) => void;
  selectedIndices: number[];
}

const screenHeight = Dimensions.get('window').height;
const diceSize = screenHeight / 20;
const diceTextSize = (diceSize * 3) / 6;
const BUTTON_GRADIENT = ['#f7e7c6', '#f5ce64ff'] as const; // light gold gradient for buttons

const _NumberedTile: React.FC<INumberedTile> = ({
  item,
  index,
  handleLetterPress,
  selectedIndices
}) => {
  return (
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
        <Text style={styles.number}>{item.value}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export const NumberedTile = React.memo(_NumberedTile);

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
  },
  number: {
    fontSize: 10,
    color: Colors.neutralDark,
    fontFamily: 'SourGummy_800ExtraBold',
    position: 'absolute',
    right: 3,
    bottom: 2
  }
});
