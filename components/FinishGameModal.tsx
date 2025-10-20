import Colors from 'app/foundation/colors';
import React, { memo, useEffect, useMemo, useState } from 'react';
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface FinishGameModalProps {
  visible: boolean;
  onClose: () => void;
  stats: {
    hpLeft: number;
    manaLeft: number;
    highestDamage: number;
    longestWord: number;
    totalWords: number;
    totalDamage: number;
  };
}

const FinishGameModal: React.FC<FinishGameModalProps> = ({
  visible,
  onClose,
  stats
}) => {
  const [scaleAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 6
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible]);

  const scoreRank = useMemo(() => {
    const { hpLeft, manaLeft, highestDamage, totalDamage } = stats;
    const rawScore =
      hpLeft * 0.4 + manaLeft * 0.3 + highestDamage * 0.2 + totalDamage * 0.1;

    if (rawScore > 400) return 'S';
    if (rawScore > 300) return 'A';
    if (rawScore > 200) return 'B';
    if (rawScore > 100) return 'C';
    return 'D';
  }, [stats]);

  const rankColor = useMemo(() => {
    switch (scoreRank) {
      case 'S':
        return '#FFD700'; // gold
      case 'A':
        return '#ff7f50'; // orange
      case 'B':
        return '#1e90ff'; // blue
      case 'C':
        return '#32cd32'; // green
      default:
        return '#999'; // grey
    }
  }, [scoreRank]);

  return (
    <Modal
      visible={visible}
      transparent
      presentationStyle="overFullScreen"
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.dialog} pointerEvents="box-none">
          <Animated.View
            style={[
              styles.modalContainer,
              { transform: [{ scale: scaleAnim }] }
            ]}>
            <Text style={styles.title}>Victory!</Text>

            <View style={styles.rankBadgeContainer}>
              <View style={[styles.rankBadge, { borderColor: rankColor }]}>
                <Text style={[styles.rankText, { color: rankColor }]}>
                  {scoreRank}
                </Text>
              </View>
              <Text style={styles.rankLabel}>Your Rank</Text>
            </View>

            <View style={styles.statsContainer}>
              <StatRow label="HP Left" value={stats.hpLeft.toString()} />
              <StatRow label="Mana Left" value={stats.manaLeft.toString()} />
              <StatRow
                label="Highest Damage"
                value={stats.highestDamage.toString()}
              />
              <StatRow
                label="Longest Word"
                value={`${stats.longestWord} letters`}
              />
              <StatRow label="Words Used" value={stats.totalWords.toString()} />
              <StatRow
                label="Total Damage"
                value={stats.totalDamage.toString()}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Pressable>
    </Modal>
  );
};

const StatRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.statRow}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

export default memo(FinishGameModal);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialog: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: Colors.secondary,
    borderWidth: 2,
    borderColor: Colors.tertiary,
    borderRadius: 16,
    padding: 20,
    width: '85%',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10
  },
  title: {
    fontFamily: 'TechnoRaceItalic',
    fontSize: 28,
    color: Colors.textWhite,
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4
  },
  rankBadgeContainer: {
    alignItems: 'center',
    gap: 4
  },
  rankBadge: {
    borderWidth: 3,
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.tertiary
  },
  rankText: {
    fontFamily: 'SourGummy_800ExtraBold',
    fontSize: 42
  },
  rankLabel: {
    fontFamily: 'ArchitectsDaughter_400Regular',
    color: Colors.textWhite,
    fontSize: 16
  },
  statsContainer: {
    width: '100%',
    backgroundColor: Colors.tertiary,
    borderRadius: 12,
    padding: 12,
    gap: 6
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.borderBlack,
    paddingVertical: 4
  },
  statLabel: {
    fontFamily: 'SourGummy_800ExtraBold',
    color: Colors.textWhite,
    fontSize: 16
  },
  statValue: {
    fontFamily: 'ArchitectsDaughter_400Regular',
    color: Colors.textWhite,
    fontSize: 16
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 8
  },
  buttonText: {
    fontFamily: 'TechnoRaceItalic',
    color: 'white',
    fontSize: 18
  }
});
