// Place this inside your BattleScreen's JSX, at the bottom of your main View

import { IcFight, IcRearrange, IcReshuffle } from 'app/assets/icons/battle';
import { SvgChevronRight } from 'app/assets/icons/svgs';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const IMAGE_SIZE = 55;
const BUTTON_SIZE = 16;
const STROKE_WIDTH = 7;
const RADIUS = (IMAGE_SIZE + STROKE_WIDTH) / 2;
const CIRCUM = 2 * Math.PI * RADIUS;

interface IBottomMenu {
  characterImage: any;
  playerShakeAnim: SharedValue<number>;
  playerHP: number;
  playerMaxHP: number;
  gold: number;
  onReshuffle: () => void;
  onRearrange: () => void;
  onPlay: () => void;
  customStyle?: StyleProp<ViewStyle>;
}

const _BottomMenu: React.FC<IBottomMenu> = ({
  characterImage,
  playerShakeAnim,
  playerHP,
  playerMaxHP,
  gold,
  onReshuffle,
  onRearrange,
  onPlay,
  customStyle
}) => {
  const healthPercent = Math.max(0, playerHP / playerMaxHP);
  return (
    <View style={[stylesBtm.container, customStyle]}>
      {/* Health ring */}
      <View style={stylesBtm.ringWrapper}>
        <Svg
          width={IMAGE_SIZE + STROKE_WIDTH * 2}
          height={IMAGE_SIZE + STROKE_WIDTH * 2}>
          {/* Background (lost health) */}
          <Circle
            cx={(IMAGE_SIZE + STROKE_WIDTH * 2) / 2}
            cy={(IMAGE_SIZE + STROKE_WIDTH * 2) / 2}
            r={RADIUS}
            stroke="#444"
            strokeWidth={STROKE_WIDTH}
            fill="none"
          />
          {/* Foreground (current health) */}
          <Circle
            cx={(IMAGE_SIZE + STROKE_WIDTH * 2) / 2}
            cy={(IMAGE_SIZE + STROKE_WIDTH * 2) / 2}
            r={RADIUS}
            stroke="#00e676"
            strokeWidth={STROKE_WIDTH}
            fill="none"
            strokeDasharray={CIRCUM}
            strokeDashoffset={CIRCUM * (1 - healthPercent)}
            strokeLinecap="round"
          />
        </Svg>
        <Animated.Image
          source={characterImage}
          style={[
            stylesBtm.characterImg,
            { transform: [{ translateX: playerShakeAnim }] }
          ]}
          resizeMode="contain"
        />
      </View>

      <View style={stylesBtm.playerHpWrapper}>
        <Text style={stylesBtm.playerHPText}>{playerHP}</Text>
      </View>

      <View style={stylesBtm.sectionWrapper}>
        <View style={stylesBtm.goldWrapper}>
          <Text style={stylesBtm.goldText}>Gold: ${gold}</Text>
        </View>
        <View style={stylesBtm.buttonsWrapper}>
          <TouchableOpacity style={stylesBtm.button} onPress={onReshuffle}>
            <IcReshuffle
              color={'black'}
              width={BUTTON_SIZE}
              height={BUTTON_SIZE}
            />
          </TouchableOpacity>
          <TouchableOpacity style={stylesBtm.button} onPress={onRearrange}>
            <IcRearrange
              color={'black'}
              width={BUTTON_SIZE}
              height={BUTTON_SIZE}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ justifyContent: 'center' }}
            onPress={onPlay}>
            <SvgChevronRight width={80} height={50} color={'gold'} />
            <IcFight
              width={20}
              height={20}
              style={{ position: 'absolute', alignSelf: 'center' }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const stylesBtm = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 8
  },
  playerHpWrapper: {
    marginLeft: IMAGE_SIZE + 8,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 15
  },
  playerHPText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'SourGummy_800ExtraBold'
  },
  sectionWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20
  },
  goldWrapper: {
    backgroundColor: 'cyan',
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 4
  },
  goldText: {
    fontFamily: 'ArchitectsDaughter_400Regular'
  },
  buttonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: 'violet',
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderWidth: 2,
    borderRadius: 4
  },
  icon: {
    fontSize: 12
  },
  ringWrapper: {
    position: 'absolute',
    left: 12,
    bottom: 8,
    width: IMAGE_SIZE + STROKE_WIDTH * 2,
    height: IMAGE_SIZE + STROKE_WIDTH * 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  characterImg: {
    position: 'absolute',
    left: STROKE_WIDTH,
    top: STROKE_WIDTH,
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    backgroundColor: '#222'
  }
});

const BottomMenu = React.memo(_BottomMenu);
export default BottomMenu;
