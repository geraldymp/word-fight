import { WordEffectConfig } from 'app/constants/wordEffectTier';
import Colors from 'app/foundation/colors';
import { moderateScale, scale, verticalScale } from 'app/utils/sizeScaling';
import React, { memo, useEffect, useState } from 'react';
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

interface Props {
  visible: boolean;
  tier: string; // one of WordEffectTiers
  customStyle?: StyleProp<ViewStyle>;
}

const _HeroSpeechBubble: React.FC<Props> = ({ visible, tier, customStyle }) => {
  const progress = useSharedValue(0);
  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      progress.value = withTiming(1, {
        duration: 220,
        easing: Easing.out(Easing.back(1.6))
      });
    } else {
      progress.value = withTiming(
        0,
        { duration: 150, easing: Easing.in(Easing.quad) },
        finished => {
          if (finished) {
            runOnJS(setMounted)(false);
          }
        }
      );
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: 0.6 + progress.value * 0.4 }]
  }));

  if (!mounted) return null;

  const text = WordEffectConfig[tier]?.bubbleText ?? '';
  const borderColor = WordEffectConfig[tier]?.borderColor ?? Colors.primary;

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.bubble, { borderColor }, customStyle, animatedStyle]}>
      <Text style={[styles.text, { color: borderColor }]}>{text}</Text>
      <Animated.View style={[styles.tail, { borderTopColor: borderColor }]} />
    </Animated.View>
  );
};

export const HeroSpeechBubble = memo(_HeroSpeechBubble);

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    backgroundColor: Colors.neutralDark,
    borderRadius: moderateScale(14),
    borderWidth: 2,
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(12),
    zIndex: 5
  },
  text: {
    fontFamily: 'SourGummy_800ExtraBold',
    fontSize: verticalScale(13),
    textAlign: 'center'
  },
  tail: {
    position: 'absolute',
    bottom: -verticalScale(8),
    left: scale(18),
    width: 0,
    height: 0,
    borderLeftWidth: scale(8),
    borderLeftColor: 'transparent',
    borderRightWidth: scale(8),
    borderRightColor: 'transparent',
    borderTopWidth: verticalScale(8)
  }
});
