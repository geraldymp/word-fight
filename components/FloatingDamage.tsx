/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

interface Props {
  amount: number;
  type: 'player' | 'enemy';
  onComplete: () => void;
}

export const FloatingDamage = ({ amount, type, onComplete }: Props) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -40,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start(onComplete);
  }, []);

  return (
    <Animated.Text
      style={[
        styles.floating,
        {
          transform: [{ translateY }],
          opacity,
          top: type === 'enemy' ? 100 : 500,
          left: type === 'enemy' ? 200 : 100,
        },
      ]}
    >
      -{amount}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  floating: {
    position: 'absolute',
    color: 'red',
    fontSize: 64,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowRadius: 2,
  },
});
