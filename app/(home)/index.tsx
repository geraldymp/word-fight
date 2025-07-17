/* eslint-disable react-hooks/exhaustive-deps */
import { AboutModal } from '@components/AboutModal';
import { CircleIcon } from '@components/Home/CircleIcon';
import { useSettingsStore } from '@store/useSettingStore';
import { useAudioPlayer } from 'expo-audio';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// @ts-ignore
import homeBgMusic from '@assets/sounds/home_screen.mp3';

export default function HomeScreen() {
  const router = useRouter();

  const { muteMusic, loadSettings, currentSrc, shouldPlay, setAudio, stop } = useSettingsStore();
  const bgMusic = useAudioPlayer(homeBgMusic);

  const [visibleAboutModal, setVisibleAboutModal] = useState<boolean>(false);

  useEffect(() => {
    loadSettings();
    setAudio(homeBgMusic, true);
  }, []);

  useEffect(() => {
    if (currentSrc === homeBgMusic && shouldPlay && !muteMusic) {
      bgMusic.loop = true;
      bgMusic.play();
    } else {
      bgMusic.pause();
    }
  }, [currentSrc, shouldPlay, muteMusic, bgMusic]);

  return (
    <View style={{ flex: 1, backgroundColor: '#777fa8', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => setVisibleAboutModal(true)}
        style={{
          height: 32,
          width: 32,
          borderRadius: 16,
          borderColor: '#3eab5e',
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          right: 24,
          top: 24,
          backgroundColor: 'white'
        }}
      >
        <Text
          style={{ fontFamily: 'MightySouly', fontSize: 26, color: '#3eab5e' }}
        >
          i
        </Text>
      </TouchableOpacity>
      <Image
        source={require('@assets/title_logo2.png')}
        style={{ width: '80%', marginTop: 100 }}
        resizeMode="contain"
      />
      <LottieView
        source={require('@assets/lottie/home_sword.json')}
        autoPlay
        loop
        style={{ width: '80%', height: 200, marginTop: 20 }}
      />
      <TouchableOpacity
        style={{
          width: '80%',
          height: 150,
          backgroundColor: '#777fa8',
          alignItems: 'center',
          paddingTop: 48
        }}
        testID='home-start-btn'
        onPress={() => {
          stop();
          router.replace('/loading');
        }}
      >
        <Text style={styles.buttonText}>Tap to Start</Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 42,
          gap: 32
        }}
      >
        <CircleIcon
          icon={require('@assets/icons/home/question_mark.png')}
          onPress={() => router.push('/help')}
        />
        <CircleIcon
          icon={require('@assets/icons/home/achievement.png')}
          onPress={() => router.push('/leaderboard')}
        />
        <CircleIcon
          icon={require('@assets/icons/home/setting.png')}
          onPress={() => router.push('/settings')}
        />
      </View>
      <AboutModal
        visible={visibleAboutModal}
        onClose={() => setVisibleAboutModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'KnightWarrior'
  }
});
