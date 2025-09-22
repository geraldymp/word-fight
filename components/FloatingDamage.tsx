/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

interface Props {
  amount: number;
  type: 'player' | 'enemy';
  onComplete: () => void;
}

export const FloatingDamage = ({ amount, type, onComplete }: Props) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    translateY.value = withTiming(-40, { duration: 2000 });
    opacity.value = withTiming(0, { duration: 2000 }, () => {
      runOnJS(onComplete)();
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value
  }));

  return (
    <Animated.Text
      style={[
        styles.floating,
        animatedStyle,
        {
          top: type === 'enemy' ? 100 : 50,
          left: type === 'enemy' ? 200 : 50
        }
      ]}>
      -{amount}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  floating: {
    position: 'absolute',
    color: '#eb1052',
    fontSize: 72,
    fontWeight: 'bold',
    textShadowColor: 'white',
    textShadowRadius: 16,
    zIndex: 2
  }
});
