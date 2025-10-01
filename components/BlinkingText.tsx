import React, { memo, useEffect } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';

type Props = {
  text: string;
  style?: StyleProp<TextStyle>;
  duration?: number; // ms for one fade cycle
};

const BlinkingText: React.FC<Props> = ({ text, style, duration = 500 }) => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(withTiming(0, { duration }), withTiming(1, { duration })),
      -1, // infinite loop
      true // reverse on repeat
    );
  }, [duration, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }));

  return (
    <Animated.Text
      style={[
        { fontSize: 18, color: 'white', fontFamily: 'SourGummy_800ExtraBold' },
        style,
        animatedStyle
      ]}>
      {text}
    </Animated.Text>
  );
};

export default memo(BlinkingText);
