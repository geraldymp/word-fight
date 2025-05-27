import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useSettingsStore } from '../store/useSettingStore';


const SettingsScreen = () => {
  const {
    muteMusic,
    muteSound,
    setMuteMusic,
    setMuteSound
  } = useSettingsStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Mute Music</Text>
        <Switch
          value={muteMusic}
          onValueChange={setMuteMusic}
          thumbColor={muteMusic ? '#f00' : '#0f0'}
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingText}>Mute Sound</Text>
        <Switch
          value={muteSound}
          onValueChange={setMuteSound}
          thumbColor={muteSound ? '#f00' : '#0f0'}
        />
      </View>
    </View>

  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingText: {
    color: '#fff',
    fontSize: 18,
  },
});