import { ShopItem } from '@components/ShopItem';
import { boosters } from 'app/constants/boosters';
import { IBooster } from 'app/types/IBooster';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import UseChooseSafeZone from './use_choose_safe_zone';

function getRandomPowerups(list: IBooster[]) {
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4);
}

export default function ChooseBoosterScreen() {
  const [selectedItem, setSelectedItem] = useState<string>('');

  const { actions } = UseChooseSafeZone();
  const { handleSelect } = actions;

  function onClickItem(id: string) {
    setSelectedItem(id);
  }

  function onConfirmShopping() {
    handleSelect(selectedItem);
  }

  const randomPowerups = useMemo(() => {
    return getRandomPowerups(boosters);
  }, []);

  return (
    <View style={styles.gameContainer}>
      <Text style={styles.title}>Shop</Text>
      <Text style={{ color: 'white', marginBottom: 12 }}>
        You can only buy 1 from these items
      </Text>
      {/* <View style={styles.houseContainer}>
        <Image
          source={IcFight}
          style={styles.houseImage}
          resizeMode="contain"
        />
      </View> */}
      <View style={styles.powerupGrid}>
        {/* Top Row */}
        <View style={styles.row}>
          <ShopItem
            onPress={onClickItem}
            item={randomPowerups[0]}
            selected={selectedItem === randomPowerups[0].id}
          />
          <View style={styles.separatorVertical} />
          <ShopItem
            onPress={onClickItem}
            item={randomPowerups[1]}
            selected={selectedItem === randomPowerups[1].id}
          />
        </View>
        <View style={styles.separatorHorizontal} />
        {/* Bottom Row */}
        <View style={styles.row}>
          <ShopItem
            onPress={onClickItem}
            item={randomPowerups[2]}
            selected={selectedItem === randomPowerups[2].id}
          />
          <View style={styles.separatorVertical} />
          <ShopItem
            onPress={onClickItem}
            item={randomPowerups[3]}
            selected={selectedItem === randomPowerups[3].id}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.confirmButton}
        disabled={selectedItem === ''}
        onPress={onConfirmShopping}
      >
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    backgroundColor: '#18181a',
    paddingTop: 32,
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  title: {
    color: '#ffe08a',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
    letterSpacing: 1.2,
    textShadowColor: '#ffcc00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    fontFamily: 'Cinzel_700Bold'
  },
  houseContainer: {
    marginBottom: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  houseImage: {
    width: 100,
    height: 80,
    opacity: 0.85
  },
  powerupGrid: {
    width: '100%',
    height: '65%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  separatorVertical: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  separatorHorizontal: {
    height: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  confirmButton: {
    backgroundColor: '#ffe08a',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 48,
    marginTop: 32,
    elevation: 2
  },
  confirmText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1.1
  }
});
