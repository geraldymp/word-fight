import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ChangeNameModal } from 'app/components/ChangeNameModal';
import { useMusicStore } from 'app/store/useMusicStore';
import { useSfxStore } from 'app/store/useSFXStore';
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
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const SettingsScreen = () => {
  const { muted: mutedSfx, setMuted: setMutedSfx } = useSfxStore();
  const { muted: mutedMusic, setMuted: setMutedMusic } = useMusicStore();

  const [username, setUsername] = useState('');
  const [visibleChangeNameModal, setVisibleChangeNameModal] = useState(false);

  const [battleTutorEnabled, setBattleTutorEnabled] = useState(true);
  const [magicHutTutorEnabled, setMagicHutTutorEnabled] = useState(true);

  async function onPressChangeUsername() {
    const allowed = await canChangeUsername();
    if (allowed) {
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.header}>Settings</Text>
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
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Audio</Text>
        <View style={styles.settingRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingText}>Mute Music</Text>
            <Text style={styles.settingDesc}>Turn off background music</Text>
          </View>
          <Switch
            value={mutedMusic}
            onValueChange={setMutedMusic}
            thumbColor={mutedMusic ? '#ffb347' : '#3eab5e'}
            trackColor={{ false: '#444', true: '#ffe08a' }}
          />
        </View>
        <View style={styles.settingRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingText}>Mute Sound</Text>
            <Text style={styles.settingDesc}>Mute sound effects</Text>
          </View>
          <Switch
            value={mutedSfx}
            onValueChange={setMutedSfx}
            thumbColor={mutedSfx ? '#ffb347' : '#3eab5e'}
            trackColor={{ false: '#444', true: '#ffe08a' }}
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Tutorial</Text>
        <View style={styles.settingRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingText}>Battle screen</Text>
            <Text style={styles.settingDesc}>Enable tutorial</Text>
          </View>
          <Switch
            value={battleTutorEnabled}
            onValueChange={toggleBattleTutor}
            thumbColor={mutedSfx ? '#ffb347' : '#3eab5e'}
            trackColor={{ false: '#444', true: '#ffe08a' }}
          />
        </View>
        <View style={styles.settingRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingText}>Magic Hut screen</Text>
            <Text style={styles.settingDesc}>Enable tutorial</Text>
          </View>
          <Switch
            value={magicHutTutorEnabled}
            onValueChange={toggleMagicHutTutor}
            thumbColor={mutedSfx ? '#ffb347' : '#3eab5e'}
            trackColor={{ false: '#444', true: '#ffe08a' }}
          />
        </View>
      </View>
      <ChangeNameModal
        visible={visibleChangeNameModal}
        onConfirm={onConfirmChange}
        title="Input user name"
        confirmationText="OK"
        onClose={onCloseModal}
      />
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#121212',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  header: {
    fontSize: 32,
    color: '#ffe08a',
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 24,
    fontFamily: 'KnightWarrior',
    letterSpacing: 1.5
  },
  card: {
    backgroundColor: '#1e1e2f',
    borderRadius: 18,
    padding: 24,
    width: '90%',
    shadowColor: '#ffe08a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 32
  },
  sectionTitle: {
    fontSize: 20,
    color: '#ffe08a',
    fontWeight: '600',
    marginBottom: 18,
    fontFamily: 'KnightWarrior'
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24
  },
  settingText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'MightySouly',
    fontWeight: '600'
  },
  settingDesc: {
    color: '#ffe08a',
    fontSize: 13,
    fontFamily: 'SpaceMono-Regular',
    marginTop: 2,
    marginBottom: 0
  }
});
