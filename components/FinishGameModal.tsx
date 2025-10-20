import Colors from 'app/foundation/colors';
import { moderateScale, scale, verticalScale } from 'app/utils/sizeScaling';
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
    longestWordLength: number;
    wordsUsed: number;
    damageDealt: number;
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

  const multipliers = {
    hpLeft: 7,
    manaLeft: 3,
    highestDamage: 2,
    longestWord: 5,
    totalWords: 3,
    totalDamage: 0.3
  };

  const scoreDetails = useMemo(() => {
    const hp = stats.hpLeft * multipliers.hpLeft;
    const mana = stats.manaLeft * multipliers.manaLeft;
    const highest = stats.highestDamage * multipliers.highestDamage;
    const longest = stats.longestWordLength * multipliers.longestWord;
    const words = stats.wordsUsed * multipliers.totalWords;
    const totalDmg = Math.round(stats.damageDealt * multipliers.totalDamage);

    const total = hp + mana + highest + longest + words + totalDmg;

    return {
      hp,
      mana,
      highest,
      longest,
      words,
      totalDmg,
      total
    };
  }, [stats]);

  const scoreRank = useMemo(() => {
    const total = scoreDetails.total;
    if (total > 500) return 'S';
    if (total > 400) return 'A';
    if (total > 300) return 'B';
    if (total > 200) return 'C';
    return 'D';
  }, [scoreDetails]);

  const rankColor = useMemo(() => {
    switch (scoreRank) {
      case 'S':
        return '#FFD700';
      case 'A':
        return '#ff7f50';
      case 'B':
        return '#1e90ff';
      case 'C':
        return '#32cd32';
      default:
        return '#999';
    }
  }, [scoreRank]);

  const title = useMemo(() => {
    if (stats.hpLeft > 0) {
      return 'Victory!';
    } else {
      return 'Game Over!';
    }
  }, [stats.hpLeft]);

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
            <Text style={styles.title}>{title}</Text>

            {/* Rank + total points */}
            <View style={styles.rankBadgeContainer}>
              <View style={[styles.rankBadge, { borderColor: rankColor }]}>
                <Text style={[styles.rankText, { color: rankColor }]}>
                  {scoreRank}
                </Text>
              </View>
              <Text style={styles.totalPointsText}>
                {scoreDetails.total} pts
              </Text>
            </View>

            {/* Detailed Breakdown */}
            <View style={styles.statsContainer}>
              <StatRow
                label="HP Left"
                base={stats.hpLeft}
                mult={multipliers.hpLeft}
                total={scoreDetails.hp}
              />
              <StatRow
                label="Mana Left"
                base={stats.manaLeft}
                mult={multipliers.manaLeft}
                total={scoreDetails.mana}
              />
              <StatRow
                label="Highest Damage"
                base={stats.highestDamage}
                mult={multipliers.highestDamage}
                total={scoreDetails.highest}
              />
              <StatRow
                label="Longest Word"
                base={stats.longestWordLength}
                mult={multipliers.longestWord}
                total={scoreDetails.longest}
              />
              <StatRow
                label="Words Used"
                base={stats.wordsUsed}
                mult={multipliers.totalWords}
                total={scoreDetails.words}
              />
              <StatRow
                label="Total Damage"
                base={stats.damageDealt}
                mult={multipliers.totalDamage}
                total={scoreDetails.totalDmg}
              />

              {/* Total points calculation */}
              <View style={styles.totalRow}>
                <Text style={styles.totalValue}>
                  {scoreDetails.total} points
                </Text>
              </View>
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

const StatRow = ({
  label,
  base,
  mult,
  total
}: {
  label: string;
  base: number;
  mult: number;
  total: number;
}) => (
  <View style={styles.statRow}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statMult}>
      {base} x {mult}
    </Text>
    <Text style={styles.statTotal}>{total}</Text>
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
    borderRadius: moderateScale(16),
    padding: moderateScale(20),
    width: '90%',
    alignItems: 'center',
    gap: scale(16)
  },
  title: {
    fontFamily: 'TechnoRaceItalic',
    fontSize: moderateScale(28),
    color: Colors.textWhite,
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4
  },
  rankBadgeContainer: {
    alignItems: 'center',
    gap: moderateScale(4)
  },
  rankBadge: {
    borderWidth: moderateScale(3),
    borderRadius: scale(40),
    width: scale(80),
    height: scale(80),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.tertiary
  },
  rankText: {
    fontFamily: 'TechnoRaceItalic',
    fontSize: moderateScale(42)
  },
  totalPointsText: {
    fontFamily: 'TechnoRaceItalic',
    color: Colors.textWhite,
    fontSize: moderateScale(18)
  },
  statsContainer: {
    width: '100%',
    backgroundColor: Colors.tertiary,
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    gap: scale(6)
  },
  statRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Colors.borderBlack,
    paddingVertical: scale(4),
    width: '100%',
    gap: scale(8)
  },
  statLabel: {
    fontFamily: 'SourGummy_800ExtraBold',
    color: Colors.textWhite,
    fontSize: moderateScale(16),
    flex: 4
  },
  statMult: {
    fontFamily: 'ArchitectsDaughter_400Regular',
    color: Colors.textWhite,
    fontSize: moderateScale(16),
    flex: 2,
    textAlign: 'center'
  },
  statTotal: {
    fontFamily: 'SourGummy_800ExtraBold',
    color: Colors.textWhite,
    fontSize: moderateScale(16),
    flex: 1,
    textAlign: 'right'
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderBlack,
    marginTop: verticalScale(6)
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: verticalScale(4)
  },
  totalLabel: {
    fontFamily: 'SourGummy_800ExtraBold',
    color: Colors.textWhite,
    fontSize: moderateScale(18)
  },
  totalValue: {
    fontFamily: 'TechnoRaceItalic',
    color: Colors.textWhite,
    fontSize: moderateScale(18)
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(24),
    paddingVertical: verticalScale(8)
  },
  buttonText: {
    fontFamily: 'TechnoRaceItalic',
    color: 'white',
    fontSize: moderateScale(18)
  }
});
