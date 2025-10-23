import { Dimensions } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const DICE_SIZE = height / 20;
// const DICE_TEXT_SIZE = (DICE_SIZE * 3) / 6;

const metrics = {
  screenHeight: height,
  screenWidth: width,
  diceSize: DICE_SIZE,
  diceTextSize: (DICE_SIZE * 3) / 6
};

export default metrics;
