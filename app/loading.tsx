import { getRandomInt } from '@/utils/getRandomInt';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { loadingTexts, tips } from '../constants/loading_text';
import { useGameStore } from '../store/useGameStore';

const LoadingScreen = () => {
  const router = useRouter();
  const resetGame = useGameStore(state => state.resetGame);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const getRandomText = (arr: string[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  const randomizedTime = getRandomInt(1500, 4000)

  const [loadingText, setLoadingText] = useState('');
  const [tipText, setTipText] = useState('');

  useEffect(() => {
    setLoadingText(getRandomText(loadingTexts));
    setTipText(getRandomText(tips));
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        })
      ])
    ).start();

    const timeout = setTimeout(() => {
      resetGame();
      router.replace('/choose_area'); // Replace with your actual game screen route
    }, randomizedTime);

    return () => clearTimeout(timeout);
  }, [fadeAnim, resetGame, router, randomizedTime]); // dep from Copilot

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/lottie/loading.json')} // Place your fantasy Lottie JSON here
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
