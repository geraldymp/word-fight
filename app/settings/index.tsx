import { useMusicStore } from '@store/useMusicStore';
import { usePremiumStore } from '@store/usePremiumStore';
import { useSfxStore } from '@store/useSFXStore';
import { useSubscriptionStore } from '@store/useSubscriptionStore';
import SettingCardSwitch from 'app/components/SettingCardSwitch';
import SettingHeader from 'app/components/SettingHeader';
import Colors from 'app/foundation/colors';
import { verticalScale } from 'app/utils/sizeScaling';
import {
  getBattleTutorial,
  getMagicHutTutorial,
  setBattleTutorial,
  setMagicHutTutorial
} from 'app/utils/tutorialManager';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const SettingsScreen = () => {
  const { muted: mutedSfx, setMuted: setMutedSfx } = useSfxStore();
  const { muted: mutedMusic, setMuted: setMutedMusic } = useMusicStore();

  const isPremium = useSubscriptionStore(s => s.isPremium);

  const {
    showNumberedTiles,
    toggleNumberedTiles,
    showDamageBreakdown,
    toggleDamageBreakdown
  } = usePremiumStore();

  const [battleTutorEnabled, setBattleTutorEnabled] = useState(true);
  const [magicHutTutorEnabled, setMagicHutTutorEnabled] = useState(true);

  const musicState = useMemo(() => {
    if (mutedMusic) {
      return 'Music Muted';
    } else {
      return 'Music Enabled';
    }
  }, [mutedMusic]);

  const soundState = useMemo(() => {
    if (mutedSfx) {
      return 'Sound Muted';
    } else {
      return 'Sound Enabled';
    }
  }, [mutedSfx]);

  const tileState = useMemo(() => {
    if (showNumberedTiles) {
      return 'Numbered tile';
    } else {
      return 'Default tile';
    }
  }, [showNumberedTiles]);

  const dmgBreakdownState = useMemo(() => {
    if (showDamageBreakdown) {
      return 'Breakdown Visible';
    } else {
      return 'Breakdown Hidden';
    }
  }, [showDamageBreakdown]);

  const battleTutorState = useMemo(() => {
    if (battleTutorEnabled) {
      return 'Tutorial Enabled';
    } else {
      return 'Tutorial Disabled';
    }
  }, [battleTutorEnabled]);

  const shopTutorState = useMemo(() => {
    if (magicHutTutorEnabled) {
      return 'Tutorial Enabled';
    } else {
      return 'Tutorial Disabled';
    }
  }, [magicHutTutorEnabled]);

  const toggleBattleTutor = async (value: boolean) => {
    setBattleTutorEnabled(value);
    await setBattleTutorial(value);
  };

  const toggleMagicHutTutor = async (value: boolean) => {
    setMagicHutTutorEnabled(value);
    await setMagicHutTutorial(value);
  };

  useEffect(() => {
    (async () => {
      const battleTutorialEnabled = await getBattleTutorial();
      const magicHutTutorialEnabled = await getMagicHutTutorial();
      setBattleTutorEnabled(battleTutorialEnabled);
      setMagicHutTutorEnabled(magicHutTutorialEnabled);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <SettingHeader title="Settings" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {isPremium && (
          <SettingCardSwitch
            title="Premium Settings"
            contents={[
              {
                title: tileState,
                description: 'Type of tile in Battle screen',
                value: showNumberedTiles,
                onPress: toggleNumberedTiles
              },
              {
                title: dmgBreakdownState,
                description: `Damage breakdown visibility`,
                value: showDamageBreakdown,
                onPress: toggleDamageBreakdown
              }
            ]}
          />
        )}
        <SettingCardSwitch
          title="Audio"
          contents={[
            {
              title: musicState,
              description: 'Background Music',
              value: !mutedMusic,
              onPress: v => setMutedMusic(!v)
            },
            {
              title: soundState,
              description: `Sound effects (hit or beaten sound)`,
              value: !mutedSfx,
              onPress: v => setMutedSfx(!v)
            }
          ]}
        />
        <SettingCardSwitch
          title="Tutorial"
          contents={[
            {
              title: battleTutorState,
              description: 'Tutorial in battle screen',
              value: battleTutorEnabled,
              onPress: toggleBattleTutor
            },
            {
              title: shopTutorState,
              description: `Tutorial in Magic Hut`,
              value: magicHutTutorEnabled,
              onPress: toggleMagicHutTutor
            }
          ]}
        />
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.deeperDark
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: Colors.deeperDark,
    padding: 0,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: verticalScale(8)
  }
});
