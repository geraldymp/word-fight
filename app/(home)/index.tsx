/* eslint-disable react-hooks/exhaustive-deps */
import {
  SvgAchievement,
  SvgGraph,
  SvgHelp,
  SvgInformation,
  SvgSetting
} from '@assets/icons/svgs';
import { AboutModal } from '@components/AboutModal';
import { useSettingsStore } from '@store/useSettingStore';
import { useGameStore } from 'app/store/useGameStore';
import { useAudioPlayer } from 'expo-audio';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// @ts-ignore
import homeBgMusic from '@assets/sounds/home_screen.mp3';
import RoundedButton from 'app/components/atoms/RoundedButton';
import RoundedRectButton from 'app/components/atoms/RoundedRectangleButton';
import { StatisticModal } from 'app/components/StatisticModal';
import {
  getLowestHighscore,
  isHighscoreFilled
} from 'app/lib/highscoreFunctions';
import { IStatistic } from 'app/types/IStatistic';
import { getStats } from 'app/utils/Statistic/getStatistic';
import { resetStats } from 'app/utils/Statistic/resetStatistic';

export default function HomeScreen() {
  const router = useRouter();

  const { muteMusic, loadSettings, currentSrc, shouldPlay, setAudio, stop } =
    useSettingsStore();
  const { setLowestHighScore, setHighScoreFilled } = useGameStore();
  const bgMusic = useAudioPlayer(homeBgMusic);

  const [stats, setStats] = useState<IStatistic>({
    averageLength: 0,
    averageDamage: 0
  });
  const [visibleAboutModal, setVisibleAboutModal] = useState<boolean>(false);
  const [visibleStatsModal, setVisibleStatsModal] = useState<boolean>(false);

  async function loadStats() {
    const stats = await getStats();
    setStats({
      averageDamage: stats?.averageDamage,
      averageLength: stats?.averageLength
    });
  }

  async function setHiScore() {
    const highscoreFilled = await isHighscoreFilled();
    const lowestHiScoreSupabase: number = (await getLowestHighscore()) ?? 0;
    setHighScoreFilled(highscoreFilled);
    if (highscoreFilled) {
      setLowestHighScore(lowestHiScoreSupabase);
    } else {
      setLowestHighScore(0);
    }
  }

  useEffect(() => {
    loadSettings();
    setHiScore();
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
  }, [visibleStatsModal]);

  return (
    <View style={styles.mainContainer}>
      <RoundedButton
        onPress={() => setVisibleStatsModal(true)}
        customStyle={[styles.topButtonsContainer, { left: 24 }]}
        icon={<SvgGraph width={20} height={20} color="#FFD166" />}
      />
      <RoundedButton
        onPress={() => setVisibleAboutModal(true)}
        customStyle={[styles.topButtonsContainer, { right: 24 }]}
        icon={<SvgInformation width={36} height={36} color="#FFD166" />}
      />
      <View style={{ width: '80%', marginTop: 100, alignItems: 'center' }}>
        <Text
          style={{
            fontFamily: 'GoblinOne_400Regular',
            fontSize: 32
          }}>
          Word Fight
        </Text>
      </View>
      <LottieView
        source={require('@assets/lottie/home_sword.json')}
        autoPlay
        loop
        style={{ width: '80%', height: 200, marginTop: 20 }}
      />

      <RoundedRectButton
        testID="home-start-btn"
        title="PLAY"
        onPress={() => {
          stop();
          router.replace('/loading');
        }}
        type="tertiary"
        size="md"
      />

      <View style={styles.bottomButtonsContainer}>
        <RoundedButton
          onPress={() => router.push('/help')}
          icon={<SvgHelp width={24} height={24} color="#FFD166" />}
        />
        <RoundedButton
          onPress={() => router.push('/leaderboard')}
          icon={<SvgAchievement width={24} height={24} color="#FFD166" />}
        />
        <RoundedButton
          onPress={() => router.push('/settings')}
          icon={<SvgSetting width={24} height={24} color="#FFD166" />}
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
    backgroundColor: '#1B263B',
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
    top: 24,
    position: 'absolute'
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
