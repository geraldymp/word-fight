import { IcFight, IcRearrange, IcReshuffle } from 'app/assets/icons/battle';
import { SvgHeart, SvgMana } from 'app/assets/icons/svgs';
import Colors from 'app/foundation/colors';
import { moderateScale, scale, verticalScale } from 'app/utils/sizeScaling';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo } from 'react';
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

const BUTTON_GRADIENT = ['#f7e7c6', '#f5ce64ff'] as const;
const BUTTON_GRADIENT_SECONDARY = ['#ba7ddbff', '#4164caff'] as const;
const BUTTON_GRADIENT_SECONDARY_DISABLED = [
  '#ece6efff',
  'rgba(127, 133, 150, 1)'
] as const;

const IMAGE_SIZE = scale(50);
const STROKE_WIDTH = IMAGE_SIZE * 0.12;
const RADIUS = (IMAGE_SIZE + STROKE_WIDTH) / 2;
const CIRCUM = 2 * Math.PI * RADIUS;
const ACTION_ICON_SIZE = IMAGE_SIZE * 0.28;

interface IBottomHUD {
  characterImage: any;
  playerShakeAnim: SharedValue<number>;
  playerHP: number;
  playerMaxHP: number;
  mana: number;
  maxReshuffle: number;
  currentReshuffle: number;
  disabledReshuffle: boolean;
  onReshuffle: () => void;
  onRearrange: () => void;
  onPlay: () => void;
  customStyle?: StyleProp<ViewStyle>;
}

const _BottomHUD: React.FC<IBottomHUD> = ({
  characterImage,
  playerShakeAnim,
  playerHP,
  playerMaxHP,
  mana,
  maxReshuffle,
  currentReshuffle,
  disabledReshuffle,
  onReshuffle,
  onRearrange,
  onPlay,
  customStyle
}) => {
  const healthPercent = useMemo(() => {
    return Math.max(0, playerHP / playerMaxHP);
  }, [playerHP, playerMaxHP]);

  const disableReshuffle = useMemo(() => {
    if (disabledReshuffle) {
      return true;
    } else if (currentReshuffle === 0) {
      return true;
    }
    return false;
  }, [currentReshuffle, disabledReshuffle]);

  const reshuffleStyle = useMemo(() => {
    if (disableReshuffle) {
      return BUTTON_GRADIENT_SECONDARY_DISABLED;
    }
    return BUTTON_GRADIENT_SECONDARY;
  }, [disableReshuffle]);

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
          <SvgHeart
            color="red"
            stroke="black"
            height={scale(36)}
            width={scale(36)}
          />
          <Text style={stylesBtm.playerHPText}>{playerHP}</Text>
        </View>
      </View>

      <View style={stylesBtm.sectionWrapper}>
        <View style={stylesBtm.manaWrapper}>
          <Text style={stylesBtm.manaText}>{mana}</Text>
          <SvgMana
            height={scale(20)}
            width={scale(20)}
            color={Colors.primary}
          />
        </View>
        <View style={stylesBtm.buttonsWrapper}>
          {/* Reshuffle button */}
          <View style={stylesBtm.reshuffleDotsAndButton}>
            <View style={stylesBtm.reshuffleDotsWrapper}>
              {Array.from({ length: maxReshuffle }).map((_, i) => {
                const isUsed = i < maxReshuffle - currentReshuffle;
                return (
                  <View
                    key={i}
                    style={[
                      stylesBtm.reshuffleDot,
                      isUsed
                        ? stylesBtm.reshuffleDotUsed
                        : stylesBtm.reshuffleDotActive
                    ]}
                  />
                );
              })}
            </View>
            <TouchableOpacity
              style={[stylesBtm.button, stylesBtm.buttonParent3DEffect]}
              onPress={onReshuffle}
              disabled={disableReshuffle}>
              <LinearGradient
                colors={reshuffleStyle}
                style={[stylesBtm.button, { bottom: 1.5 }]}>
                <IcReshuffle
                  color="black"
                  width={ACTION_ICON_SIZE}
                  height={ACTION_ICON_SIZE}
                  style={{ marginVertical: 4, marginHorizontal: 9 }}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Rearrange button */}
          <TouchableOpacity
            style={[stylesBtm.button, stylesBtm.buttonParent3DEffect]}
            onPress={onRearrange}>
            <LinearGradient
              colors={BUTTON_GRADIENT_SECONDARY}
              style={[stylesBtm.button, { bottom: 1.5 }]}>
              <IcRearrange
                color="black"
                width={ACTION_ICON_SIZE}
                height={ACTION_ICON_SIZE}
                style={{ marginVertical: 4, marginHorizontal: 9 }}
              />
            </LinearGradient>
          </TouchableOpacity>

          {/* Attack button */}
          <TouchableOpacity
            style={[
              stylesBtm.playButtonWrapper,
              stylesBtm.buttonParent3DEffect
            ]}
            onPress={onPlay}>
            <LinearGradient
              colors={BUTTON_GRADIENT}
              style={[stylesBtm.playButtonWrapper, { bottom: 4 }]}>
              <IcFight width={scale(20)} height={scale(20)} />
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
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(4),
    borderTopLeftRadius: moderateScale(18),
    borderTopRightRadius: moderateScale(18),
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
    fontSize: moderateScale(17),
    fontFamily: 'SourGummy_800ExtraBold',
    position: 'absolute'
  },
  sectionWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  manaWrapper: {
    flexDirection: 'row',
    backgroundColor: Colors.neutralDark,
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(9),
    marginHorizontal: scale(10),
    borderColor: Colors.borderBlack,
    borderWidth: 2,
    borderRadius: moderateScale(4),
    gap: scale(4)
  },
  manaText: {
    color: Colors.neutralLight,
    fontFamily: 'ArchitectsDaughter_400Regular'
  },
  reshuffleDotsAndButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  reshuffleDotsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4
  },
  reshuffleDot: {
    width: scale(7),
    height: scale(7),
    borderRadius: scale(4),
    marginVertical: verticalScale(0.8),
    backgroundColor: Colors.neutralDark,
    borderWidth: 1,
    borderColor: Colors.borderBlack,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 2
  },
  reshuffleDotActive: {
    backgroundColor: Colors.primary,
    shadowOpacity: 0.5
  },
  reshuffleDotUsed: {
    backgroundColor: Colors.neutralDark,
    opacity: 0.4
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
    height: verticalScale(30),
    width: scale(70),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(10),
    borderColor: Colors.borderBlack,
    borderWidth: 0.5,
    marginTop: verticalScale(2)
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

const BottomHUD = React.memo(_BottomHUD);
export default BottomHUD;
