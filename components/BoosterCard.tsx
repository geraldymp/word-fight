import Colors from 'app/foundation/colors';
import { IBooster } from 'app/types/IBooster';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IBoosterCard {
  item: IBooster;
  onPress: (item: IBooster) => void;
  selected: boolean;
  cardHeight: number;
  cardWidth: number;
}

const CARD_GRADIENT = ['#efc87bff', '#ebab2cff'] as const;

const _BoosterCard: React.FC<IBoosterCard> = ({
  item,
  onPress,
  selected = false,
  cardHeight,
  cardWidth
}) => {
  const iconHeight = (cardHeight * 40) / 100;
  const iconWidth = (cardWidth * 75) / 100;
  const iconSize = { height: iconHeight, width: iconWidth };
  const cardSize = { height: cardHeight, width: cardWidth };

  const cardStyle = StyleSheet.flatten([
    styles.card,
    cardSize,
    selected && styles.selectedCardStyle
  ]);

  const gradStyle = StyleSheet.flatten([
    styles.grad,
    cardSize,
    selected && styles.selectedGradStyle
  ]);

  const price = item.type === 'lower' ? 30 : 60;

  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={cardStyle}>
        <LinearGradient colors={CARD_GRADIENT} style={gradStyle}>
          <Text style={styles.name}>{item.name}</Text>
          <Image
            source={item.image}
            style={[styles.icon, iconSize]}
            resizeMode="contain"
          />
          <Text style={styles.desc}>{item.description}</Text>
          <Text style={styles.price}>Price: {price}</Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'black',
    overflow: 'hidden',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    backgroundColor: Colors.secondaryBg50,
    marginBottom: 6,
    marginTop: 3,
    marginHorizontal: 3
  },
  selectedCardStyle: {
    borderColor: Colors.borderBlue,
    borderWidth: 3.5
  },
  grad: {
    borderWidth: 1,
    borderColor: 'black',
    overflow: 'hidden',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    bottom: 3,
    position: 'absolute'
  },
  selectedGradStyle: {
    bottom: 0,
    borderWidth: 0
  },
  icon: {
    marginBottom: 8
  },
  name: {
    fontSize: 14,
    color: Colors.neutralDark,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center'
  },
  desc: {
    color: Colors.neutralDark,
    fontSize: 10,
    textAlign: 'center'
  },
  price: {
    color: Colors.neutralDark,
    fontSize: 12,
    textAlign: 'center',
    position: 'absolute',
    bottom: 12
  }
});

export const BoosterCard = React.memo(_BoosterCard);
