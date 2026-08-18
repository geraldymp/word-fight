import Colors from 'app/foundation/colors';
import { moderateScale, scale, verticalScale } from 'app/utils/sizeScaling';
import LottieView from 'lottie-react-native';
import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import UseLoading from './use_loading';

const LoadingScreen = () => {
  const { states } = UseLoading();
  const { fadeAnim, loadingText, tipText } = states;

  // TODO: Edit to proper loading screen with fantasy theme and Lottie animation
  return (
    <View style={styles.container}>
      <LottieView
        source={require('@assets/lottie/balls_loading.json')} // Place your fantasy Lottie JSON here
        autoPlay
        loop
        style={styles.lottie}
      />
      <Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
        {loadingText}
      </Animated.Text>

      <Text style={styles.tipTitle}>Tip</Text>
      <Text style={styles.tipText}>{tipText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.neutralDark
  },
  lottie: {
    width: scale(200),
    height: verticalScale(200)
  },
  loadingText: {
    color: Colors.redHealth,
    textShadowColor: Colors.textWhite,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: scale(10),
    fontSize: moderateScale(20),
    fontFamily: 'SourGummy_800ExtraBold',
    marginTop: verticalScale(20),
    textAlign: 'center',
    paddingHorizontal: scale(24)
  },
  tipTitle: {
    marginTop: verticalScale(40),
    fontSize: moderateScale(16),
    color: Colors.borderBlack,
    textAlign: 'center',
    fontFamily: 'SourGummy_800ExtraBold'
  },
  tipText: {
    marginTop: verticalScale(10),
    fontSize: moderateScale(22),
    color: Colors.borderBlack,
    textAlign: 'center',
    fontFamily: 'SourGummy_400Regular',
    paddingHorizontal: scale(24)
  }
});

export default LoadingScreen;
