import React, { useEffect } from 'react';
import { Image, ImageStyle, StyleProp, TouchableOpacity } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';

const AnimatedTO = Animated.createAnimatedComponent(TouchableOpacity);

type Props = {
  source: any;
  customStyle?: StyleProp<ImageStyle>;
  onPress: () => void;
};

export default function MagicalReload({ source, customStyle, onPress }: Props) {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Spin
    rotation.value = withRepeat(
      withTiming(360, { duration: 3000, easing: Easing.linear }),
      -1,
      false
    );

    // Breathing
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }]
  }));

  return (
    <AnimatedTO style={[customStyle, animatedStyle]} onPress={onPress}>
      <Image
        source={source}
        style={{ height: '100%', width: '100%' }}
        resizeMode="cover"
      />
    </AnimatedTO>
  );
}
