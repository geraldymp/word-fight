/* eslint-disable react-hooks/exhaustive-deps */
import {
  SvgAchievement,
  SvgGraph,
  SvgHelp,
  SvgInformation,
  SvgSetting
} from '@assets/icons/svgs';
import { AboutModal } from '@components/AboutModal';
import { useMusicStore } from '@store/useMusicStore';
import { useGameStore } from 'app/store/useGameStore';
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
import { Entypo } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import RoundedButton from 'app/components/atoms/RoundedButton';
import RoundedRectButton from 'app/components/atoms/RoundedRectangleButton';
import HelpModal from 'app/components/HelpModal';
import PremiumModal from 'app/components/PremiumModal';
import { StatisticModal } from 'app/components/StatisticModal';
import { HelperContents } from 'app/constants/helperContents';
import Colors from 'app/foundation/colors';
import {
  getLowestHighscore,
  isHighscoreFilled
} from 'app/lib/highscoreFunctions';
import { useSubscriptionStore } from 'app/store/useSubscriptionStore';
import { IShowedStats } from 'app/types/IShowedStats';
import { scale as scaling, verticalScale } from 'app/utils/sizeScaling';
import { getAllStats } from 'app/utils/Statistic/getAllStatistics';
import { resetAllStats } from 'app/utils/Statistic/resetAllStatistics';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function HomeScreen() {
  const router = useRouter();
  const isFocused = useIsFocused();

  const isPremium = useSubscriptionStore(s => s.isPremium);
  const [showModal, setShowModal] = useState(false);

  const { setLowestHighScore, setHighScoreFilled } = useGameStore();

  const { playMusic, stopMusic } = useMusicStore();

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const BottomIconSize = scaling(24);

  const [stats, setStats] = useState<IShowedStats>({
    averageLength: 0,
    averageDamage: 0,
    totalBossBeaten: 0
  });
  const [visibleAboutModal, setVisibleAboutModal] = useState<boolean>(false);
  const [visibleStatsModal, setVisibleStatsModal] = useState<boolean>(false);
  const [visibleHelpModal, setVisibleHelpModal] = useState<boolean>(false);

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
    setHiScore();
  }, []);

  useEffect(() => {
    loadStats();
  }, [visibleStatsModal]);

  useEffect(() => {
    if (isFocused) {
      playMusic('home');
    }
  }, [isFocused]);

  return (
    <ImageBackground
      style={styles.mainContainer}
      source={require('@assets/backgrounds/home_background.jpg')}
      resizeMode="cover">
      <RoundedButton
        onPress={() => setVisibleStatsModal(true)}
        customStyle={[styles.topButtonsContainer, { left: scaling(24) }]}
        icon={
          <SvgGraph
            width={scaling(20)}
            height={scaling(20)}
            color={Colors.neutralDark}
          />
        }
      />
      <RoundedButton
        onPress={() => setVisibleAboutModal(true)}
        customStyle={[styles.topButtonsContainer, { right: scaling(24) }]}
        icon={
          <SvgInformation
            width={scaling(36)}
            height={scaling(36)}
            color={Colors.neutralDark}
          />
        }
      />
      <AnimatedImage
        source={require('@assets/word_fight_title.png')}
        style={[
          {
            width: '80%',
            height: verticalScale(200),
            marginTop: verticalScale(120)
          },
          animatedStyle
        ]}
        resizeMode="cover"
      />

      <RoundedRectButton
        testID="home-start-btn"
        title="PLAY"
        onPress={() => {
          stopMusic();
          router.replace('/loading');
        }}
        type="primary"
        size="lg"
      />
      <View style={styles.bottomButtonsContainer}>
        <RoundedButton
          onPress={() => setVisibleHelpModal(true)}
          icon={
            <SvgHelp
              width={BottomIconSize}
              height={BottomIconSize}
              color={Colors.neutralDark}
            />
          }
        />
        <RoundedButton
          onPress={() => router.push('/leaderboard')}
          icon={
            <SvgAchievement
              width={BottomIconSize}
              height={BottomIconSize}
              color={Colors.neutralDark}
            />
          }
        />
        <RoundedButton
          onPress={() => router.push('/settings')}
          icon={
            <SvgSetting
              width={BottomIconSize}
              height={BottomIconSize}
              color={Colors.neutralDark}
            />
          }
        />
        <RoundedButton
          onPress={() => setShowModal(true)}
          icon={<Entypo name="shop" size={BottomIconSize} />}
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
      <HelpModal
        visible={visibleHelpModal}
        onClose={() => setVisibleHelpModal(false)}
        slides={HelperContents}
      />
      <PremiumModal visible={showModal} onClose={() => setShowModal(false)} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center'
  },
  topButtonsContainer: {
    top: verticalScale(24),
    position: 'absolute'
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: verticalScale(36),
    gap: scaling(28)
  }
});
