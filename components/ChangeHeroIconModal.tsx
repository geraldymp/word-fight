import { HeroIcons } from 'app/constants/heroIcons';
import Colors from 'app/foundation/colors';
import { moderateScale, scale, verticalScale } from 'app/utils/sizeScaling';
import React, { FC, memo, useEffect, useState } from 'react';
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
  initialHeroId: string;
  onSelect: (heroId: string) => void;
  onCancel: () => void;
}

const HeroSelectModal: FC<ChangeHeroIconModalProps> = ({
  visible,
  initialHeroId,
  onSelect,
  onCancel
}) => {
  const [tempSelected, setTempSelected] = useState<string>(initialHeroId);

  useEffect(() => {
    setTempSelected(initialHeroId ?? null);
  }, [initialHeroId]);

  function handleConfirm() {
    if (tempSelected) onSelect(tempSelected);
  }

  function handleCancel() {
    setTempSelected(initialHeroId);
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
            contentContainerStyle={styles.flatlistContainer}
          />

          <TouchableOpacity style={styles.button} onPress={handleConfirm}>
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
    backgroundColor: Colors.blackBg50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: '85%',
    backgroundColor: Colors.shallowBlue,
    padding: scale(16),
    borderRadius: moderateScale(16),
    borderWidth: 2,
    borderColor: Colors.primary
  },
  title: {
    fontSize: moderateScale(24),
    color: Colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: Colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: moderateScale(8)
  },
  flatlistContainer: {
    marginVertical: verticalScale(16)
  },
  heroWrapper: {
    flex: 1,
    marginBottom: verticalScale(8),
    marginHorizontal: scale(4),
    borderWidth: 2,
    borderColor: Colors.deeperDark,
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    backgroundColor: Colors.deeperDark
  },
  heroSelected: {
    borderColor: Colors.primary
  },
  heroImage: {
    width: '100%',
    height: verticalScale(100)
  },
  heroName: {
    color: Colors.textWhite,
    fontSize: moderateScale(14),
    paddingVertical: verticalScale(6),
    textAlign: 'center',
    fontFamily: 'SourGummy_800ExtraBold'
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(16),
    width: '100%',
    alignItems: 'center'
  },
  secondaryButton: {
    backgroundColor: Colors.quarternary
  },
  buttonText: {
    fontSize: moderateScale(18),
    color: Colors.deeperDark,
    fontWeight: 'bold'
  }
});
