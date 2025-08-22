import { IcFight, IcRearrange, IcReshuffle } from 'app/assets/icons/battle';
import { SvgHeart } from 'app/assets/icons/svgs';
import Colors from 'app/foundation/colors';
import { LinearGradient } from 'expo-linear-gradient';
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
const ICON_SIZE = 16;
const STROKE_WIDTH = 7;
const RADIUS = (IMAGE_SIZE + STROKE_WIDTH) / 2;
const CIRCUM = 2 * Math.PI * RADIUS;

const BUTTON_GRADIENT = ['#f7e7c6', '#f5ce64ff'] as const; // light gold gradient for buttons
const BUTTON_GRADIENT_SECONDARY = ['#ba7ddbff', '#4164caff'] as const; // for secondary/blue buttons

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
            stroke={Colors.neutralLight}
            strokeWidth={STROKE_WIDTH}
            fill="none"
          />
          {/* Foreground (current health) */}
          <Circle
            cx={(IMAGE_SIZE + STROKE_WIDTH * 2) / 2}
            cy={(IMAGE_SIZE + STROKE_WIDTH * 2) / 2}
            r={RADIUS}
            stroke={Colors.danger}
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
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <SvgHeart color="red" stroke="black" height={36} width={36} />
          <Text style={stylesBtm.playerHPText}>{playerHP}</Text>
        </View>
      </View>

      <View style={stylesBtm.sectionWrapper}>
        <View style={stylesBtm.goldWrapper}>
          <Text style={stylesBtm.goldText}>Gold: ${gold}</Text>
        </View>
        <View style={stylesBtm.buttonsWrapper}>
          <TouchableOpacity
            style={[stylesBtm.button, stylesBtm.buttonParent3DEffect]}
            onPress={onReshuffle}>
            <LinearGradient
              colors={BUTTON_GRADIENT_SECONDARY}
              style={[stylesBtm.button, { bottom: 1.5 }]}>
              <IcReshuffle
                color="black"
                width={ICON_SIZE}
                height={ICON_SIZE}
                style={{ marginVertical: 4, marginHorizontal: 9 }}
              />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[stylesBtm.button, stylesBtm.buttonParent3DEffect]}
            onPress={onRearrange}>
            <LinearGradient
              colors={BUTTON_GRADIENT_SECONDARY}
              style={[stylesBtm.button, { bottom: 1.5 }]}>
              <IcRearrange
                color="black"
                width={ICON_SIZE}
                height={ICON_SIZE}
                style={{ marginVertical: 4, marginHorizontal: 9 }}
              />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              stylesBtm.playButtonWrapper,
              stylesBtm.buttonParent3DEffect
            ]}
            onPress={onPlay}>
            <LinearGradient
              colors={BUTTON_GRADIENT}
              style={[stylesBtm.playButtonWrapper, { bottom: 4 }]}>
              <IcFight width={24} height={24} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const stylesBtm = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    shadowColor: Colors.neutralDark,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    backgroundColor: Colors.secondaryBg70
  },
  playerHpWrapper: {
    marginLeft: IMAGE_SIZE + 8,
    justifyContent: 'flex-end'
  },
  playerHPText: {
    color: Colors.textWhite,
    fontSize: 17,
    fontFamily: 'SourGummy_800ExtraBold',
    position: 'absolute'
  },
  sectionWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  goldWrapper: {
    backgroundColor: Colors.neutralLight,
    paddingVertical: 4,
    paddingHorizontal: 9,
    marginHorizontal: 10,
    borderColor: Colors.borderBlack,
    borderWidth: 2,
    borderRadius: 4
  },
  goldText: {
    fontFamily: 'ArchitectsDaughter_400Regular'
  },
  buttonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: Colors.calm,
    borderRadius: 8,
    borderColor: Colors.borderBlack,
    borderWidth: 0.5
  },
  playButtonWrapper: {
    backgroundColor: Colors.primary,
    height: 35,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: Colors.borderBlack,
    borderWidth: 0.5
  },
  buttonParent3DEffect: {
    backgroundColor: Colors.neutralDark
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
    backgroundColor: Colors.neutralDark
  }
});

const BottomMenu = React.memo(_BottomMenu);
export default BottomMenu;
