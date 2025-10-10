import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useMusicStore } from '@store/useMusicStore';
import { usePremiumStore } from '@store/usePremiumStore';
import { useSfxStore } from '@store/useSFXStore';
import { useSubscriptionStore } from '@store/useSubscriptionStore';
import { ChangeNameModal } from 'app/components/ChangeNameModal';
import SettingCardSwitch from 'app/components/SettingCardSwitch';
import SettingHeader from 'app/components/SettingHeader';
import Colors from 'app/foundation/colors';
import { scale } from 'app/utils/sizeScaling';
import {
  getBattleTutorial,
  getMagicHutTutorial,
  setBattleTutorial,
  setMagicHutTutorial
} from 'app/utils/tutorialManager';
import {
  canChangeUsername,
  getNextChangeDate,
  getUsername,
  setUsername as setUsernameStorage
} from 'app/utils/usernameManager';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

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

  const [username, setUsername] = useState('');
  const [visibleChangeNameModal, setVisibleChangeNameModal] = useState(false);

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

  async function onPressChangeUsername() {
    const allowedToChangeName = await canChangeUsername();
    if (allowedToChangeName) {
      setVisibleChangeNameModal(true);
    } else {
      const nextDate = await getNextChangeDate();
      Alert.alert(
        `Name changeable every 7 days`,
        `You can change your name again on ${nextDate?.toLocaleDateString(
          'en-GB',
          {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }
        )}`
      );
    }
  }

  async function onConfirmChange(updatedName: string) {
    setUsername(updatedName);
    setVisibleChangeNameModal(false);
    await setUsernameStorage(updatedName);
  }

  function onCloseModal() {
    setVisibleChangeNameModal(false);
  }

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
      const currentName = await getUsername();
      const battleTutorialEnabled = await getBattleTutorial();
      const magicHutTutorialEnabled = await getMagicHutTutorial();
      setUsername(currentName);
      setBattleTutorEnabled(battleTutorialEnabled);
      setMagicHutTutorEnabled(magicHutTutorialEnabled);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <SettingHeader title="Settings" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <View style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingText}>{username}</Text>
              <Text style={styles.settingDesc}>Name for global highscore</Text>
            </View>
            <TouchableOpacity onPress={onPressChangeUsername}>
              <MaterialIcons
                name="drive-file-rename-outline"
                size={24}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
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
        <ChangeNameModal
          visible={visibleChangeNameModal}
          onConfirm={onConfirmChange}
          title="Input user name"
          confirmationText="OK"
          onClose={onCloseModal}
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
    marginTop: scale(8)
  },
  card: {
    backgroundColor: Colors.shallowBlue,
    borderRadius: scale(18),
    padding: scale(18),
    width: '90%',
    marginBottom: scale(16)
  },
  sectionTitle: {
    fontSize: scale(24),
    color: Colors.primary,
    fontWeight: 'bold',
    marginBottom: scale(18)
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(12)
  },
  settingText: {
    color: Colors.textWhite,
    fontSize: scale(18),
    fontWeight: '600'
  },
  settingDesc: {
    color: Colors.borderBlue,
    fontSize: scale(10),
    marginTop: scale(4),
    marginBottom: scale(0)
  }
});
