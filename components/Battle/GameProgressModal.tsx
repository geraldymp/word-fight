import React from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface IGameProgressModal {
  showModal: boolean;
  modalContent: {
    modalText: string;
    showNextStageBtn: boolean;
    showNextAreaBtn: boolean;
  };
  onPressNextStage: () => void;
  onPressNextArea: () => void;
  onPressBackToHome: () => void;
}

const { width } = Dimensions.get('window');

const _GameProgressModal: React.FC<IGameProgressModal> = ({
  showModal,
  modalContent,
  onPressNextArea,
  onPressNextStage,
  onPressBackToHome
}) => {
  const { modalText, showNextStageBtn, showNextAreaBtn } = modalContent;
  return (
    <Modal visible={showModal} transparent animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.6)'
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{modalText}</Text>

          {showNextStageBtn && (
            <TouchableOpacity style={styles.button} onPress={onPressNextStage}>
              <Text style={styles.buttonText}>Next Stage</Text>
            </TouchableOpacity>
          )}

          {showNextAreaBtn && (
            <TouchableOpacity style={styles.button} onPress={onPressNextArea}>
              <Text style={styles.buttonText}>Next Area</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={onPressBackToHome}
          >
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 10, 20, 0.85)',
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

export const GameProgressModal = React.memo(_GameProgressModal);
