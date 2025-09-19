import { SvgMana } from 'app/assets/icons/svgs';
import Colors from 'app/foundation/colors';
import { IBooster } from 'app/types/IBooster';
import { scale, verticalScale } from 'app/utils/sizeScaling';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IBoosterCard {
  item: IBooster;
  onPress: (item: IBooster) => void;
  selected: boolean;
  cardHeight: number;
  cardWidth: number;
  disabled: boolean;
}

const CARD_GRADIENT = ['#efc87bff', '#ebab2cff'] as const;
const DISABLED_CARD_GRADIENT = ['#898987ff', '#686867ff'] as const;

const _BoosterCard: React.FC<IBoosterCard> = ({
  item,
  onPress,
  selected = false,
  cardHeight,
  cardWidth,
  disabled
}) => {
  const iconHeight = (cardHeight * 40) / 100;
  const iconWidth = (cardWidth * 50) / 100;
  const iconSize = { height: iconHeight, width: iconWidth };
  const cardSize = { height: cardHeight, width: cardWidth };

  const cardStyle = StyleSheet.flatten([
    styles.card,
    cardSize,
    selected && styles.selectedCardStyle,
    disabled && styles.disabledCardStyle
  ]);

  const gradStyle = StyleSheet.flatten([
    styles.grad,
    cardSize,
    selected && styles.selectedGradStyle,
    disabled && styles.disabledGradStyle
  ]);

  const cardGradient = disabled ? DISABLED_CARD_GRADIENT : CARD_GRADIENT;

  return (
    <TouchableOpacity onPress={() => onPress(item)} disabled={disabled}>
      <View style={cardStyle}>
        <LinearGradient colors={cardGradient} style={gradStyle}>
          <Text style={styles.name}>{item.name}</Text>
          <Image
            source={item.image}
            style={[styles.icon, iconSize]}
            resizeMode="cover"
          />
          <Text style={styles.desc}>{item.description}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.priceText}>{item.price}</Text>
            <SvgMana
              height={scale(20)}
              width={scale(20)}
              color={Colors.primary}
            />
          </View>
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
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(12),
    alignItems: 'center',
    backgroundColor: Colors.secondaryBg50,
    marginBottom: verticalScale(6),
    marginTop: verticalScale(3),
    marginHorizontal: scale(3)
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
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(12),
    alignItems: 'center',
    bottom: verticalScale(3),
    position: 'absolute'
  },
  selectedGradStyle: {
    bottom: 0,
    borderWidth: 0
  },
  disabledCardStyle: {
    borderColor: '#888'
  },
  disabledGradStyle: {
    backgroundColor: '#888'
  },
  icon: {
    marginBottom: 8
  },
  name: {
    fontSize: scale(14),
    color: Colors.neutralDark,
    fontWeight: 'bold',
    marginBottom: verticalScale(4),
    textAlign: 'center'
  },
  desc: {
    color: Colors.neutralDark,
    fontSize: scale(10),
    textAlign: 'center'
  },
  priceWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: verticalScale(12),
    alignItems: 'center'
  },
  priceText: {
    color: Colors.neutralDark,
    fontSize: scale(14),
    textAlign: 'center',
    fontFamily: 'ArchitectsDaughter_400Regular'
  }
});

export const BoosterCard = React.memo(_BoosterCard);
