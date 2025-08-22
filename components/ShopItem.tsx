import { IBooster } from 'app/types/IBooster';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface IShopItem {
  item: IBooster;
  onPress: (item: IBooster) => void;
  selected: boolean;
}

const _ShopItem: React.FC<IShopItem> = ({
  item,
  onPress,
  selected = false
}) => {
  const cardStyle = selected
    ? [styles.card, { borderColor: 'yellow' }]
    : styles.card;
  const price = item.type === 'lower' ? 30 : 60;
  return (
    <TouchableOpacity style={cardStyle} onPress={() => onPress(item)}>
      <Image source={item.image} style={styles.icon} resizeMode="contain" />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      <Text style={styles.desc}>Price: {price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: '100%',
    backgroundColor: '#222',
    borderRadius: 16,
    borderColor: 'black',
    borderWidth: 1,
    padding: 12,
    alignItems: 'center'
  },
  icon: {
    width: '70%',
    height: '50%',
    marginBottom: 8
  },
  name: {
    fontSize: 16,
    color: '#ffe08a',
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center'
  },
  desc: {
    color: '#ccc',
    fontSize: 13,
    textAlign: 'center'
  }
});

export const ShopItem = React.memo(_ShopItem);
