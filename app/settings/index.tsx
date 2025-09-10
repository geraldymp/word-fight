import { useMusicStore } from 'app/store/useMusicStore';
import { useSfxStore } from 'app/store/useSFXStore';
import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

const SettingsScreen = () => {
  const { muted: mutedSfx, setMuted: setMutedSfx } = useSfxStore();
  const { muted: mutedMusic, setMuted: setMutedMusic } = useMusicStore();
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.header}>Settings</Text>
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
