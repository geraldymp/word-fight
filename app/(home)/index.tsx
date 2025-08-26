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
import { useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';

// @ts-ignore
import homeBgMusic from '@assets/sounds/home_screen.mp3';
import RoundedButton from 'app/components/atoms/RoundedButton';
import RoundedRectButton from 'app/components/atoms/RoundedRectangleButton';
import { StatisticModal } from 'app/components/StatisticModal';
import Colors from 'app/foundation/colors';
import {
  getLowestHighscore,
  isHighscoreFilled
} from 'app/lib/highscoreFunctions';
import { IShowedStats } from 'app/types/IShowedStats';
import { getAllStats } from 'app/utils/Statistic/getAllStatistics';
import { resetAllStats } from 'app/utils/Statistic/resetAllStatistics';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function HomeScreen() {
  const router = useRouter();

  const { muteMusic, loadSettings, currentSrc, shouldPlay, setAudio, stop } =
    useSettingsStore();
  const { setLowestHighScore, setHighScoreFilled } = useGameStore();
  const bgMusic = useAudioPlayer(homeBgMusic);

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const [stats, setStats] = useState<IShowedStats>({
    averageLength: 0,
    averageDamage: 0,
    totalBossBeaten: 0
  });
  const [visibleAboutModal, setVisibleAboutModal] = useState<boolean>(false);
  const [visibleStatsModal, setVisibleStatsModal] = useState<boolean>(false);

  async function loadStats() {
    const stats = await getAllStats();
    setStats({
      averageDamage: stats?.averageDamage,
      averageLength: stats?.averageLength,
      totalBossBeaten: stats?.totalBossBeaten
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
    // subtle “breathing”: 1.0 → 1.05 → 1.0, repeat forever
    const duration = 2000; // slower = calmer
    const target = 1.05; // 5% growth (keep subtle)

    scale.value = withRepeat(
      withSequence(
        withTiming(target, { duration, easing: Easing.inOut(Easing.quad) }),
        withTiming(1, { duration, easing: Easing.inOut(Easing.quad) })
      ),
      -1, // infinite
      true
    );
  }, [scale]);

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
    <ImageBackground
      style={styles.mainContainer}
      source={require('@assets/home_background.png')}
      resizeMode="cover">
      <RoundedButton
        onPress={() => setVisibleStatsModal(true)}
        customStyle={[styles.topButtonsContainer, { left: 24 }]}
        icon={<SvgGraph width={20} height={20} color={Colors.primary} />}
      />
      <RoundedButton
        onPress={() => setVisibleAboutModal(true)}
        customStyle={[styles.topButtonsContainer, { right: 24 }]}
        icon={<SvgInformation width={36} height={36} color={Colors.primary} />}
      />
      <AnimatedImage
        source={require('@assets/word_fight_title.png')}
        style={[
          {
            width: '80%',
            height: 200,
            marginTop: 120
          },
          animatedStyle
        ]}
        resizeMode="cover"
      />

      <RoundedRectButton
        testID="home-start-btn"
        title="PLAY"
        onPress={() => {
          stop();
          router.replace('/loading');
        }}
        type="primary"
        size="lg"
      />

      <View style={styles.bottomButtonsContainer}>
        <RoundedButton
          onPress={() => router.push('/help')}
          icon={<SvgHelp width={24} height={24} color={Colors.primary} />}
        />
        <RoundedButton
          onPress={() => router.push('/leaderboard')}
          icon={
            <SvgAchievement width={24} height={24} color={Colors.primary} />
          }
        />
        <RoundedButton
          onPress={() => router.push('/settings')}
          icon={<SvgSetting width={24} height={24} color={Colors.primary} />}
        />
      </View>
      <StatisticModal
        stats={stats}
        visible={visibleStatsModal}
        onClose={() => setVisibleStatsModal(false)}
        onReset={resetAllStats}
      />
      <AboutModal
        visible={visibleAboutModal}
        onClose={() => setVisibleAboutModal(false)}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1B263B',
    alignItems: 'center'
  },
  topButtonsContainer: {
    top: 24,
    position: 'absolute'
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 42,
    gap: 32
  }
});
