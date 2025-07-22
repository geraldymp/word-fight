import { IStatistic } from 'app/types/IStatistic';
import React, { useMemo, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

interface IStatsModal {
  stats: IStatistic
  visible: boolean;
  onClose: () => void;
  onReset: () => void;
}

const _StatisticModal: React.FC<IStatsModal> = ({ stats, visible, onClose, onReset }) => {
  const [confirmReset, setConfirmReset] = useState<boolean>(false);

  function changeToConfirm() {
    setConfirmReset(true)
  }

  function revertConfirm() {
    setConfirmReset(false)
  }

  function onApplyReset() {
    onReset();
    setConfirmReset(false)
    onClose();
  }

  const showResetButton = useMemo(() => {
    if (stats.averageDamage === 0 && stats.averageLength === 0) {
      return false
    }
    return true
  }, [stats.averageDamage, stats.averageLength])

  return (
    <Modal visible={visible} transparent animationType="none">
      <TouchableOpacity style={{ flex: 1 }} onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitleText}>
                Statistic
              </Text>
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>
                  {`Avg Word Length: `}
                </Text>
                <Text style={styles.itemText}>
                  {stats.averageLength.toFixed(1)}
                </Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>
                  {`Avg Word Damage: `}
                </Text>
                <Text style={styles.itemText}>
                  {stats.averageDamage.toFixed(1)}
                </Text>
              </View>
             {showResetButton && <>
                {!confirmReset ? (
                  <TouchableOpacity style={styles.resetContainer} onPress={changeToConfirm}>
                    <Text style={styles.resetText}>Reset</Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <View style={styles.resetContainer}>
                      <Text style={styles.resetText}>Sure?</Text>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 24 }}>
                      <TouchableOpacity style={styles.resetContainer} onPress={onApplyReset}>
                        <Text style={styles.resetText}>Yes!</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.resetContainer} onPress={revertConfirm}>
                        <Text style={styles.resetText}>No!</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </>}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: '#7d2abd',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    alignItems: 'center',
    width: '80%'
  },
  modalTitleText: {
    fontFamily: 'MightySouly',
    color: 'white',
    fontSize: 24
  },
  itemContainer: {
    backgroundColor: '#2ec75c',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemText: {
    fontFamily: 'TechnoRaceItalic',
    color: 'white',
    fontSize: 18
  },
  resetContainer: {
    backgroundColor: 'red',
    borderRadius: 8,
    padding: 4,
  },
  resetText: {
    fontFamily: 'TechnoRaceItalic',
    color: 'white',
    fontSize: 12
  },
});

export const StatisticModal = React.memo(_StatisticModal);
