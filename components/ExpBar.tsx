import Colors from 'app/foundation/colors';
import { moderateScale, verticalScale } from 'app/utils/sizeScaling';
import React, { FC, memo, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

interface ExpBarProps {
  level: number;
  exp: number;
  expNeeded: number;
}

const BAR_HEIGHT = verticalScale(24);

const ExpBar: FC<ExpBarProps> = ({ level, exp, expNeeded }) => {
  const progress = useSharedValue(0);
  const ratio = expNeeded > 0 ? exp / expNeeded : 0;

  useEffect(() => {
    progress.value = withTiming(ratio, {
      duration: 800,
      easing: Easing.out(Easing.cubic)
    });
  }, [ratio]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Level {level}</Text>
      <View style={styles.bar}>
        <Animated.View style={[styles.fill, animatedStyle]} />
        <Text style={styles.expText}>
          {Math.floor(exp)} / {expNeeded} EXP
        </Text>
      </View>
    </View>
  );
};

export default memo(ExpBar);

const styles = StyleSheet.create({
  container: {
    gap: verticalScale(4)
  },
  label: {
    color: Colors.textWhite,
    fontFamily: 'SourGummy_800ExtraBold',
    fontSize: 14
  },
  bar: {
    height: BAR_HEIGHT,
    backgroundColor: Colors.neutralLight,
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    justifyContent: 'center'
  },
  fill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.primary,
    borderRadius: moderateScale(8),
    shadowColor: '#4aa3ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 8
  },
  expText: {
    width: '100%',
    textAlign: 'center',
    color: Colors.textWhite,
    textShadowColor: Colors.textBlack,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: moderateScale(16),
    fontSize: verticalScale(12),
    fontFamily: 'SourGummy_400Regular'
  }
});
