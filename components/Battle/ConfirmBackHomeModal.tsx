import Colors from 'app/foundation/colors';
import { moderateScale, scale, verticalScale } from 'app/utils/sizeScaling';
import React from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface IConfirmBackHomeModal {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const { width } = Dimensions.get('window');

export const _ConfirmBackHomeModal: React.FC<IConfirmBackHomeModal> = ({
  visible,
  onConfirm,
  onCancel
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Back to Home and save progress?</Text>
          <TouchableOpacity style={styles.button} onPress={onConfirm}>
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={onCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  modalContainer: {
    width: width * 0.85,
    backgroundColor: '#1e1e2f',
    padding: verticalScale(24),
    borderRadius: moderateScale(16),
    borderWidth: moderateScale(2),
    borderColor: '#ffe08a',
    alignItems: 'center',
    shadowColor: '#ffe08a',
    shadowOffset: { width: 0, height: moderateScale(10) },
    shadowOpacity: 0.4,
    shadowRadius: moderateScale(20),
    elevation: moderateScale(10)
  },
  title: {
    fontSize: verticalScale(24),
    color: '#ffe08a',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: verticalScale(24),
    textShadowColor: '#ffcc00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: moderateScale(8)
  },
  button: {
    backgroundColor: '#ffb347',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(32),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(16),
    width: '100%',
    alignItems: 'center'
  },
  secondaryButton: {
    backgroundColor: '#ffd580'
  },
  buttonText: {
    fontSize: verticalScale(18),
    color: '#1a1a1a',
    fontWeight: 'bold'
  }
});

export const ConfirmBackHomeModal = React.memo(_ConfirmBackHomeModal);
