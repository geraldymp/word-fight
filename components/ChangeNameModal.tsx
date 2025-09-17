import { FontAwesome } from '@expo/vector-icons';
import Colors from 'app/foundation/colors';
import { useDebounce } from 'app/utils/useDebounce';
import leoProfanity from 'leo-profanity';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface IChangeNameModal {
  visible: boolean;
  title: string;
  confirmationText: string;
  onConfirm: (updatedName: string) => void;
  onClose: () => void;
}

const { width } = Dimensions.get('window');

export const _ChangeNameModal: React.FC<IChangeNameModal> = ({
  visible,
  title,
  confirmationText,
  onConfirm,
  onClose
}) => {
  const [newUsername, setNewUsername] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const debouncedUsername = useDebounce(newUsername, 800);
  const textInputRef = useRef<TextInput>(null);

  function onPressConfirm() {
    onConfirm(newUsername);
    setNewUsername('');
    setDisableSubmit(true);
    setIsLoadingSubmit(false);
    setErrorMessage('');
  }

  function onBgPress() {
    setNewUsername('');
    setDisableSubmit(true);
    setIsLoadingSubmit(false);
    setErrorMessage('');
    onClose();
  }

  useEffect(() => {
    leoProfanity.loadDictionary();
  }, []);

  useEffect(() => {
    const trimmed = debouncedUsername.trim();
    if (trimmed === '') {
      setErrorMessage('Username cannot be empty');
      setDisableSubmit(true);
      setIsLoadingSubmit(false);
      return;
    } else if (trimmed.length < 4) {
      setErrorMessage('Username minimal 4 letters');
      setDisableSubmit(true);
      setIsLoadingSubmit(false);
      return;
    } else if (trimmed.length > 16) {
      setErrorMessage('Username maximal 16 letters');
      setDisableSubmit(true);
      setIsLoadingSubmit(false);
      return;
    }

    const isBad = leoProfanity.check(trimmed);

    if (isBad) {
      setErrorMessage('Inappropriate username');
      setDisableSubmit(true);
    } else {
      setErrorMessage('');
      setDisableSubmit(false);
    }

    setIsLoadingSubmit(false);
  }, [debouncedUsername, visible]);

  useEffect(() => {
    if (newUsername !== debouncedUsername) {
      setIsLoadingSubmit(true);
    }
  }, [newUsername, debouncedUsername]);

  useEffect(() => {
    if (visible) {
      // Delay a tick so modal fully renders before focusing
      setTimeout(() => {
        textInputRef.current?.focus();
      }, 100);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onBgPress}>
        <Pressable style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <View
            style={{
              width: '80%',
              marginVertical: 16
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomColor: 'white',
                borderBottomWidth: 2
              }}>
              <TextInput
                ref={textInputRef}
                value={newUsername}
                onChangeText={setNewUsername}
                placeholder="New name"
                placeholderTextColor={Colors.disabled}
                style={{
                  flex: 1,
                  color: 'white',
                  marginRight: 20
                }}
              />
              <FontAwesome
                name={errorMessage ? 'times-circle' : 'check-circle'}
                size={24}
                color={errorMessage ? 'red' : 'green'}
              />
            </View>
            {errorMessage ? (
              <Text style={{ color: 'red' }}>{errorMessage}</Text>
            ) : null}
          </View>
          <TouchableOpacity
            style={disableSubmit ? styles.buttonDisabled : styles.button}
            disabled={disableSubmit}
            onPress={onPressConfirm}>
            {isLoadingSubmit ? (
              <ActivityIndicator size={20} />
            ) : (
              <Text style={styles.buttonText}>{confirmationText}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={onBgPress}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </Pressable>
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
    textShadowColor: '#ffcc00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8
  },
  buttonDisabled: {
    backgroundColor: Colors.disabled,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center'
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

export const ChangeNameModal = React.memo(_ChangeNameModal);
