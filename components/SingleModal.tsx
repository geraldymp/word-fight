import React from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface ISingleModal {
  visible: boolean;
  title: string;
  confirmationText: string;
  onConfirm: () => void;
}

const { width } = Dimensions.get('window');

export const _SingleModal: React.FC<ISingleModal> = ({
  visible,
  title,
  confirmationText = 'OK',
  onConfirm
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity style={styles.button} onPress={onConfirm}>
            <Text style={styles.buttonText}>{confirmationText}</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  modalContainer: {
    width: width * 0.85,
    backgroundColor: '#1e1e2f',
    padding: 24,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#ffe08a',
    alignItems: 'center',
    shadowColor: '#ffe08a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10
  },
  title: {
    fontSize: 24,
    color: '#ffe08a',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    textShadowColor: '#ffcc00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8
  },
  button: {
    backgroundColor: '#ffb347',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center'
  },
  secondaryButton: {
    backgroundColor: '#ffd580'
  },
  buttonText: {
    fontSize: 18,
    color: '#1a1a1a',
    fontWeight: 'bold'
  }
});

export const SingleModal = React.memo(_SingleModal);
