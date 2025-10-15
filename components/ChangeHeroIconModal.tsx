import { HeroIcons } from 'app/constants/heroIcons';
import React, { FC, memo, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

interface ChangeHeroIconModalProps {
  visible: boolean;
  // TODO: hero icon go to array 0 when first reloading
  initialHeroId?: string | null;
  onSelect: (heroId: string) => void;
  onCancel: () => void;
}

const HeroSelectModal: FC<ChangeHeroIconModalProps> = ({
  visible,
  initialHeroId,
  onSelect,
  onCancel
}) => {
  const [tempSelected, setTempSelected] = useState<string | null>(
    initialHeroId ?? null
  );

  function handleConfirm() {
    if (tempSelected) onSelect(tempSelected);
  }

  function handleCancel() {
    setTempSelected(initialHeroId ?? null);
    onCancel();
  }

  const renderHero = ({ item }: { item: (typeof HeroIcons)[0] }) => {
    const isSelected = tempSelected === item.id;
    return (
      <TouchableOpacity
        onPress={() => setTempSelected(item.id)}
        activeOpacity={0.8}
        style={[styles.heroWrapper, isSelected && styles.heroSelected]}>
        <Image
          source={item.icon}
          style={styles.heroImage}
          resizeMode="contain"
        />
        <Text style={styles.heroName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}>
      <Pressable style={styles.overlay} onPress={onCancel}>
        <Pressable style={styles.modalContainer}>
          <Text style={styles.title}>Choose Hero Icon</Text>

          <FlatList
            data={HeroIcons}
            renderItem={renderHero}
            keyExtractor={item => item.id}
            numColumns={3}
          />

          <TouchableOpacity
            style={[styles.button, !tempSelected && styles.buttonDisabled]}
            disabled={!tempSelected}
            onPress={handleConfirm}>
            <Text style={styles.buttonText}>Select</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default memo(HeroSelectModal);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#1e1e2f',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#ffe08a'
  },
  title: {
    fontSize: 22,
    color: '#ffe08a',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: '#ffcc00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8
  },
  heroWrapper: {
    flex: 1,
    marginBottom: 8,
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#111'
  },
  heroSelected: {
    borderColor: '#ffe08a'
  },
  heroImage: {
    width: '100%',
    height: 100
  },
  heroName: {
    color: '#fff',
    fontSize: 14,
    paddingVertical: 6,
    textAlign: 'center',
    fontFamily: 'SourGummy_800ExtraBold'
  },
  button: {
    backgroundColor: '#ffb347',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center'
  },
  secondaryButton: {
    backgroundColor: '#ffd580'
  },
  buttonDisabled: {
    backgroundColor: '#555'
  },
  buttonText: {
    fontSize: 18,
    color: '#1a1a1a',
    fontWeight: 'bold'
  }
});
