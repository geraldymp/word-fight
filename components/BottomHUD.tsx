import {
  IcCancel,
  IcFight,
  IcRearrange,
  IcReshuffle
} from 'app/assets/icons/battle';
import { SvgMana } from 'app/assets/icons/svgs';
import Colors from 'app/foundation/colors';
import { IDamageModifier } from 'app/types/IDamageModifier';
import { moderateScale, scale, verticalScale } from 'app/utils/sizeScaling';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import Animated, { SharedValue } from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const BUTTON_GRADIENT = ['#f7e7c6', '#f5ce64ff'] as const;
const BUTTON_GRADIENT_SECONDARY = ['#ba7ddbff', '#4164caff'] as const;
const BUTTON_GRADIENT_SECONDARY_DISABLED = [
  '#ece6efff',
  'rgba(127, 133, 150, 1)'
] as const;

const IMAGE_SIZE = SCREEN_WIDTH * 0.25;
const ACTION_ICON_SIZE = SCREEN_WIDTH / 35;
const MOD_ICON_SIZE = verticalScale(18);

const modifierImages: Record<keyof IDamageModifier, ImageSourcePropType> = {
  bonusDamage: require('@assets/icons/battle/damageModifier/bonusDamage.jpg'),
  vowelModifier: require('@assets/icons/battle/damageModifier/vowel.jpg'),
  ABCDEModifier: require('@assets/icons/battle/damageModifier/abcde.png'),
  VWXYZModifier: require('@assets/icons/battle/damageModifier/vwxyz.png'),
  IngModifier: require('@assets/icons/battle/damageModifier/ing.png'),
  STModifier: require('@assets/icons/battle/damageModifier/st.png')
};

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
  onCancel: () => void;
  onPlay: () => void;
  damageModifiers: IDamageModifier;
}

const BottomHUDBase: React.FC<IBottomHUD> = ({
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
  onCancel,
  onPlay,
  damageModifiers
}) => {
  const [activeModifier, setActiveModifier] = useState<string | null>(null);
  const [baseHudHeight, setBaseHudHeight] = useState(0);
  const [healthHeight, setHealthHeight] = useState(0);

  const onLayoutBaseHud = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setBaseHudHeight(height);
  };

  const onLayoutHealth = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    setHealthHeight(height);
  };

  useEffect(() => {
    if (activeModifier) {
      const timer = setTimeout(() => setActiveModifier(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [activeModifier]);

  const hudAndHealthHeight = useMemo(() => {
    return baseHudHeight + healthHeight;
  }, [baseHudHeight, healthHeight]);

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
    <View
      style={[
        styles.container,
        { marginTop: MOD_ICON_SIZE + verticalScale(36) }
      ]}>
      <View
        style={[
          styles.dmgModsContainer,
          { bottom: hudAndHealthHeight + verticalScale(4) }
        ]}>
        {Object.entries(damageModifiers).map(([key, mod]) => {
          if (mod.value === 0) return null;
          const source = modifierImages[key as keyof typeof modifierImages];

          return (
            <Popover
              key={key}
              isVisible={activeModifier === key}
              onRequestClose={() => setActiveModifier(null)}
              placement={PopoverPlacement.TOP}
              backgroundStyle={{ opacity: 0 }}
              from={
                <TouchableOpacity
                  onPress={() =>
                    setActiveModifier(prev => (prev === key ? null : key))
                  }>
                  <Image
                    source={source}
                    style={styles.rectangle}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              }>
              <View style={{ paddingHorizontal: 6, paddingVertical: 4 }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold'
                  }}>{`${mod.description}${mod.value}`}</Text>
              </View>
            </Popover>
          );
        })}
      </View>
      <View
        style={[
          styles.maxHealthBar,
          { width: SCREEN_WIDTH - IMAGE_SIZE, marginLeft: IMAGE_SIZE }
        ]}
        onLayout={event => {
          onLayoutHealth(event);
        }}>
        <View
          style={[
            styles.currentHealthBar,
            { width: `${Math.max(0, (playerHP / playerMaxHP) * 100)}%` }
          ]}
        />
        <Text style={styles.currentHealthText}>
          {playerHP} / {playerMaxHP}
        </Text>
      </View>
      <View
        style={styles.background}
        onLayout={event => {
          onLayoutBaseHud(event);
        }}>
        {/* Mana */}
        <View style={styles.manaWrapper}>
          <Text style={styles.manaText}>{mana}</Text>
          <SvgMana
            height={verticalScale(20)}
            width={verticalScale(20)}
            color={Colors.primary}
          />
        </View>

        {/* Reshuffle */}
        <View style={styles.reshuffleDotsAndButton}>
          <View style={styles.reshuffleDotsWrapper}>
            {Array.from({ length: maxReshuffle }).map((_, i) => {
              const isUsed = i < maxReshuffle - currentReshuffle;
              return (
                <View
                  key={i}
                  style={[
                    styles.reshuffleDot,
                    isUsed ? styles.reshuffleDotUsed : styles.reshuffleDotActive
                  ]}
                />
              );
            })}
          </View>
          <TouchableOpacity
            style={[styles.button, styles.buttonParent3DEffect]}
            onPress={onReshuffle}
            disabled={disableReshuffle}>
            <LinearGradient
              colors={reshuffleStyle}
              style={[styles.button, { bottom: 1.5 }]}>
              <IcReshuffle
                color="black"
                width={ACTION_ICON_SIZE}
                height={ACTION_ICON_SIZE}
                style={{
                  marginVertical: verticalScale(4),
                  marginHorizontal: scale(9)
                }}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Remove */}
        <TouchableOpacity
          style={[styles.button, styles.buttonParent3DEffect]}
          onPress={onCancel}>
          <LinearGradient
            colors={BUTTON_GRADIENT_SECONDARY}
            style={[styles.button, { bottom: 1.5 }]}>
            <IcCancel
              color="black"
              width={ACTION_ICON_SIZE}
              height={ACTION_ICON_SIZE}
              style={{
                marginVertical: verticalScale(4),
                marginHorizontal: scale(9)
              }}
            />
          </LinearGradient>
        </TouchableOpacity>

        {/* Rearrange */}
        <TouchableOpacity
          style={[styles.button, styles.buttonParent3DEffect]}
          onPress={onRearrange}>
          <LinearGradient
            colors={BUTTON_GRADIENT_SECONDARY}
            style={[styles.button, { bottom: 1.5 }]}>
            <IcRearrange
              color="black"
              width={ACTION_ICON_SIZE}
              height={ACTION_ICON_SIZE}
              style={{
                marginVertical: verticalScale(4),
                marginHorizontal: scale(9)
              }}
            />
          </LinearGradient>
        </TouchableOpacity>

        {/* Attack button */}
        <TouchableOpacity
          style={[styles.playButtonWrapper, styles.buttonParent3DEffect]}
          onPress={onPlay}>
          <LinearGradient
            colors={BUTTON_GRADIENT}
            style={[styles.playButtonWrapper, { bottom: verticalScale(3) }]}>
            <IcFight width={scale(16)} height={scale(16)} />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <Animated.Image
        source={characterImage}
        resizeMode="contain"
        style={[
          styles.character,
          {
            width: IMAGE_SIZE,
            height: IMAGE_SIZE
          },
          { transform: [{ translateX: playerShakeAnim }] }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%'
  },

  dmgModsContainer: {
    position: 'absolute',
    left: IMAGE_SIZE + scale(4),
    flexDirection: 'row',
    gap: scale(6),
    backgroundColor: 'black'
  },
  rectangle: {
    height: MOD_ICON_SIZE,
    width: MOD_ICON_SIZE,
    borderRadius: moderateScale(4)
  },

  maxHealthBar: {
    height: verticalScale(25),
    backgroundColor: Colors.neutralLight,
    borderTopRightRadius: moderateScale(4),
    borderBottomRightRadius: moderateScale(4),
    borderTopWidth: moderateScale(2.5),
    borderRightWidth: moderateScale(2.5),
    borderBottomWidth: moderateScale(2.5),
    borderColor: Colors.borderBlack,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  currentHealthBar: {
    height: verticalScale(25),
    backgroundColor: Colors.danger,
    overflow: 'hidden'
  },
  currentHealthText: {
    color: Colors.textWhite,
    textShadowColor: Colors.borderBlack,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: moderateScale(4),
    position: 'absolute',
    alignSelf: 'center',
    fontSize: verticalScale(16),
    fontFamily: 'SourGummy_800ExtraBold'
  },

  background: {
    width: '100%',
    paddingLeft: IMAGE_SIZE,
    backgroundColor: Colors.secondaryBg70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(4),
    justifyContent: 'space-around',
    borderBottomWidth: moderateScale(2.5),
    borderRightWidth: moderateScale(2.5),
    borderColor: Colors.borderBlack,
    borderRadius: moderateScale(4)
  },

  manaWrapper: {
    flexDirection: 'row',
    backgroundColor: Colors.neutralDark,
    paddingVertical: verticalScale(3),
    paddingHorizontal: scale(6),
    borderColor: Colors.borderBlack,
    borderWidth: 2,
    borderRadius: moderateScale(4),
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(4)
  },
  manaText: {
    color: Colors.neutralLight,
    fontFamily: 'ArchitectsDaughter_400Regular',
    fontSize: verticalScale(16)
  },

  reshuffleDotsAndButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  reshuffleDotsWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(4)
  },
  reshuffleDot: {
    width: scale(7),
    height: scale(7),
    borderRadius: scale(4),
    marginVertical: verticalScale(0.8),
    backgroundColor: Colors.neutralDark,
    borderWidth: 1,
    borderColor: Colors.borderBlack
  },
  reshuffleDotActive: {
    backgroundColor: Colors.primary,
    shadowOpacity: 0.5
  },
  reshuffleDotUsed: {
    backgroundColor: Colors.neutralDark,
    opacity: 0.4
  },

  button: {
    backgroundColor: Colors.calm,
    borderRadius: 8,
    borderColor: Colors.borderBlack,
    borderWidth: 0.5
  },
  buttonParent3DEffect: {
    backgroundColor: Colors.neutralDark
  },

  playButtonWrapper: {
    backgroundColor: Colors.primary,
    height: verticalScale(30),
    width: scale(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(10),
    borderColor: Colors.borderBlack,
    borderWidth: 0.5,
    marginTop: verticalScale(2)
  },

  character: {
    borderRadius: moderateScale(4),
    borderWidth: moderateScale(2.5),
    borderColor: Colors.borderBlack,
    backgroundColor: Colors.neutralDark,
    position: 'absolute',
    bottom: 0,
    left: 0
  }
});

export default BottomHUDBase;
