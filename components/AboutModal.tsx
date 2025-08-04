import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

interface IAboutModal {
  visible: boolean;
  onClose: () => void;
}

const _AboutModal: React.FC<IAboutModal> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="none">
      <TouchableOpacity style={{ flex: 1 }} onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: '#7d2abd',
                padding: 16,
                flexDirection: 'row',
                borderRadius: 12,
                gap: 12,
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  fontFamily: 'MightySouly',
                  color: 'white',
                  fontSize: 24
                }}
              >
                Game by
              </Text>
              <View
                style={{
                  backgroundColor: '#2ec75c',
                  borderRadius: 8,
                  padding: 8
                }}
              >
                <Text
                  style={{
                    fontFamily: 'TechnoRaceItalic',
                    color: 'white',
                    fontSize: 24
                  }}
                >
                  Kiel Helix
                </Text>
              </View>
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
  }
});

export const AboutModal = React.memo(_AboutModal);
