import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useGameStore } from '../store/useGameStore';

export default function FireCamp() {
  const router = useRouter();
  const { increaseStep } = useGameStore();

  function handleNext() {
    increaseStep();
    router.replace('/choose_area');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rest by the Fire</Text>

      <View style={styles.animationWrapper}>
        <LottieView
          source={require('../assets/lottie/fire_camp.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>

      <Text style={styles.description}>
        You take a moment to rest and recover by the warmth of the fire.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111', // dark background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 28,
    color: '#ffe08a',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  animationWrapper: {
    width: 200,
    height: 200,
    marginBottom: 20
  },
  lottie: {
    width: '100%',
    height: '100%'
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 30
  },
  button: {
    backgroundColor: '#ffb347',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10
  },
  buttonText: {
    fontSize: 18,
    color: '#1a1a1a',
    fontWeight: 'bold'
  }
});
