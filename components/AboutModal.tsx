import Colors from 'app/foundation/colors';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface IAboutModal {
  visible: boolean;
  onClose: () => void;
}

const _AboutModal: React.FC<IAboutModal> = ({ visible, onClose }) => {
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
              <Text style={styles.gameByText}>Game by</Text>
              <View style={styles.nameWrapper}>
                <Text style={styles.nameText}>Kiel Helix</Text>
              </View>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  },
  modalContainer: {
    backgroundColor: Colors.primary,
    padding: 16,
    flexDirection: 'row',
    borderRadius: 12,
    gap: 12,
    alignItems: 'center'
  },
  gameByText: {
    fontFamily: 'SourGummy_800ExtraBold',
    color: Colors.textWhite,
    fontSize: 24
  },
  nameWrapper: {
    backgroundColor: Colors.neutralDark,
    borderRadius: 8,
    padding: 8
  },
  nameText: {
    fontFamily: 'SourGummy_800ExtraBold',
    color: Colors.neutralLight,
    fontSize: 24,
    textAlignVertical: 'center'
  }
});

export const AboutModal = React.memo(_AboutModal);
