import Colors from 'app/foundation/colors';
import { moderateScale, verticalScale } from 'app/utils/sizeScaling';
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
              <Text style={styles.subtitleText}>Game by</Text>
              <View
                style={[
                  styles.nameWrapper,
                  { marginBottom: verticalScale(12) }
                ]}>
                <Text style={styles.nameText}>Kiel Helix</Text>
              </View>
              <Text style={styles.subtitleText}>Supported by</Text>
              <View style={styles.nameWrapper}>
                <Text style={styles.nameText}>YoHom Bing</Text>
              </View>
              <View style={styles.nameWrapper}>
                <Text style={styles.nameText}>Lionheart</Text>
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
    backgroundColor: Colors.modalBg,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialog: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    borderRadius: moderateScale(16),
    padding: verticalScale(20)
  },
  modalContainer: {
    backgroundColor: Colors.secondary,
    padding: verticalScale(16),
    borderRadius: moderateScale(12),
    gap: verticalScale(12),
    alignItems: 'center'
  },
  subtitleText: {
    fontFamily: 'SourGummy_800ExtraBold',
    color: Colors.textWhite,
    fontSize: verticalScale(18)
  },
  nameWrapper: {
    backgroundColor: Colors.neutralDark,
    borderRadius: moderateScale(8),
    padding: verticalScale(8)
  },
  nameText: {
    fontFamily: 'SourGummy_800ExtraBold',
    color: Colors.primary,
    fontSize: verticalScale(24),
    textAlignVertical: 'center'
  }
});

export const AboutModal = React.memo(_AboutModal);
