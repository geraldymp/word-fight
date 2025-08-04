import LottieView from 'lottie-react-native';
import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import UseLoading from './use_loading';

const LoadingScreen = () => {
  const { states } = UseLoading();
  const { fadeAnim, loadingText, tipText } = states;

  return (
    <View style={styles.container}>
      <LottieView
        source={require('@assets/lottie/loading.json')} // Place your fantasy Lottie JSON here
        autoPlay
        loop
        style={styles.lottie}
      />
      <Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
        {loadingText}
      </Animated.Text>

      <Text style={styles.tipTitle}>💡 Tip</Text>
      <Text style={styles.tipText}>{tipText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  lottie: {
    width: 200,
    height: 200
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    fontStyle: 'italic',
    marginTop: 20,
    textAlign: 'center'
  },
  tipTitle: {
    marginTop: 40,
    fontSize: 18,
    color: '#ffd700',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  tipText: {
    marginTop: 10,
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center'
  }
});

export default LoadingScreen;
