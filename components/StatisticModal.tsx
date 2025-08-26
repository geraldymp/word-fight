import Colors from 'app/foundation/colors';
import { IShowedStats } from 'app/types/IShowedStats';
import React, { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface IStatsModal {
  stats: IShowedStats;
  visible: boolean;
  onClose: () => void;
  onReset: () => void;
}

const _StatisticModal: React.FC<IStatsModal> = ({
  stats,
  visible,
  onClose,
  onReset
}) => {
  const [confirmReset, setConfirmReset] = useState<boolean>(false);

  function changeToConfirm() {
    setConfirmReset(true);
  }

  function revertConfirm() {
    setConfirmReset(false);
  }

  function onApplyReset() {
    onReset();
    setConfirmReset(false);
    onClose();
  }

  const showResetButton = useMemo(() => {
    if (
      stats.averageDamage === 0 &&
      stats.averageLength === 0 &&
      stats.totalBossBeaten === 0
    ) {
      return false;
    }
    return true;
  }, [stats]);

  return (
    <Modal
      visible={visible}
      transparent
      presentationStyle="overFullScreen"
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.dialog} pointerEvents="box-none">
          <Pressable style={styles.card} onPress={e => e.stopPropagation()}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitleText}>Statistic</Text>
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{`Avg Word Length: `}</Text>
                <Text style={styles.itemText}>
                  {stats.averageLength.toFixed(1)}
                </Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{`Avg Word Damage: `}</Text>
                <Text style={styles.itemText}>
                  {stats.averageDamage.toFixed(1)}
                </Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{`Boss Beaten: `}</Text>
                <Text style={styles.itemText}>{stats.totalBossBeaten}</Text>
              </View>
              {showResetButton && (
                <>
                  {!confirmReset ? (
                    <TouchableOpacity
                      style={styles.resetContainer}
                      onPress={changeToConfirm}>
                      <Text style={styles.resetText}>Reset</Text>
                    </TouchableOpacity>
                  ) : (
                    <>
                      <View style={styles.resetContainer}>
                        <Text style={styles.resetText}>Sure?</Text>
                      </View>
                      <View style={{ flexDirection: 'row', gap: 24 }}>
                        <TouchableOpacity
                          style={styles.resetContainer}
                          onPress={onApplyReset}>
                          <Text style={styles.resetText}>Yes!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.resetContainer}
                          onPress={revertConfirm}>
                          <Text style={styles.resetText}>No!</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                </>
              )}
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.secondary,
    padding: 16,
    borderRadius: 12,
    gap: 12,
    alignItems: 'center',
    width: '80%'
  },
  modalTitleText: {
    fontFamily: 'ArchitectsDaughter_400Regular',
    color: 'white',
    fontSize: 24
  },
  itemContainer: {
    backgroundColor: Colors.tertiary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemText: {
    fontFamily: 'SourGummy_800ExtraBold',
    color: Colors.textWhite,
    fontSize: 18
  },
  resetContainer: {
    backgroundColor: Colors.danger,
    borderRadius: 8,
    padding: 4
  },
  resetText: {
    fontFamily: 'TechnoRaceItalic',
    color: Colors.textWhite,
    fontSize: 12
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialog: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    borderRadius: 16,
    padding: 20
  }
});

export const StatisticModal = React.memo(_StatisticModal);
