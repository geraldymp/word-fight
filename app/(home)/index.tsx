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
import { StatisticModal } from 'app/components/StatisticModal';
import { IStatistic } from 'app/types/IStatistic';
import { getStats } from 'app/utils/Statistic/getStatistic';
import { resetStats } from 'app/utils/Statistic/resetStatistic';

export default function HomeScreen() {
  const router = useRouter();

  const { muteMusic, loadSettings, currentSrc, shouldPlay, setAudio, stop } = useSettingsStore();
  const bgMusic = useAudioPlayer(homeBgMusic);

  const [stats, setStats] = useState<IStatistic>({ averageLength: 0, averageDamage: 0 })
  const [visibleAboutModal, setVisibleAboutModal] = useState<boolean>(false);
  const [visibleStatsModal, setVisibleStatsModal] = useState<boolean>(false);

  async function loadStats() {
    const stats = await getStats();
    setStats({ averageDamage: stats?.averageDamage, averageLength: stats?.averageLength })
  };

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

  useEffect(() => {
    loadStats();
  }, [visibleStatsModal])

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={() => setVisibleAboutModal(true)} style={styles.topButtonsContainer}>
        <Text style={styles.topButtonsText}>
          i
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setVisibleStatsModal(true)} style={[styles.topButtonsContainer, { right: 0, left: 24 }]} >
        <Text style={styles.topButtonsText}>
          G
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
        style={styles.startButtonContainer}
        testID='home-start-btn'
        onPress={() => {
          stop();
          router.replace('/loading');
        }}
      >
        <Text style={styles.startButtonText}>Tap to Start</Text>
      </TouchableOpacity>

      <View style={styles.bottomButtonsContainer}>
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
      <StatisticModal
        stats={stats}
        visible={visibleStatsModal}
        onClose={() => setVisibleStatsModal(false)}
        onReset={resetStats}
      />
      <AboutModal
        visible={visibleAboutModal}
        onClose={() => setVisibleAboutModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#777fa8',
    alignItems: 'center'
  },
  startButtonContainer: {
    width: '80%',
    height: 150,
    backgroundColor: '#777fa8',
    alignItems: 'center',
    paddingTop: 48
  },
  startButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'KnightWarrior'
  },
  topButtonsContainer: {
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
  },
  topButtonsText: {
    fontFamily: 'MightySouly',
    fontSize: 26,
    color: '#3eab5e'
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 42,
    gap: 32
  }
});
