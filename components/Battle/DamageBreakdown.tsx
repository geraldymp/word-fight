import Colors from 'app/foundation/colors';
import { moderateScale, scale, verticalScale } from 'app/utils/sizeScaling';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

interface DamageBreakdown {
  currentWord: string;
  damageBreakdownNums: { type: string; value: number }[];
  customStyle?: StyleProp<ViewStyle>;
}

const _DamageBreakdown: React.FC<DamageBreakdown> = ({
  currentWord,
  damageBreakdownNums,
  customStyle
}) => {
  return (
    <>
      <>
        <View style={[styles.damagePreviewWrapper, customStyle]}>
          {damageBreakdownNums.map((item, idx) => (
            <Text
              key={idx}
              style={
                item.type === 'letter'
                  ? styles.letter
                  : item.type === 'length'
                    ? styles.lengthBonus
                    : item.type === 'upgrades'
                      ? styles.upgrades
                      : styles.modifier
              }>
              {item.value}
              {idx < damageBreakdownNums.length - 1 ? ' + ' : ''}
            </Text>
          ))}
          <Text style={styles.letter}>{` = `}</Text>

          <Text style={styles.total}>
            {damageBreakdownNums.reduce((a, b) => a + b.value, 0)}
          </Text>
        </View>
        {/* <Text style={styles.damagePreviewLabel}>
            <Text style={styles.letter}>Letters</Text>

            {` + `}
            <Text style={styles.lengthBonus}>Length</Text>

            {` + `}
            <Text style={styles.modifier}>Modifier</Text>
          </Text> */}
      </>
    </>
  );
};

const DamageBreakdown = React.memo(_DamageBreakdown);
export default DamageBreakdown;

const styles = StyleSheet.create({
  damagePreviewWrapper: {
    color: Colors.primary,
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(8),
    borderRadius: 6,
    backgroundColor: Colors.blackBg50,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(4)
  },
  damagePreviewLabel: {
    color: Colors.neutralLight,
    fontSize: moderateScale(9),
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(8),
    borderRadius: moderateScale(24),
    backgroundColor: Colors.blackBg50
  },
  letter: {
    color: Colors.textWhite,
    fontSize: moderateScale(9),
    fontWeight: 'bold'
  },
  lengthBonus: {
    color: Colors.borderBlue,
    fontSize: moderateScale(9),
    fontWeight: 'bold'
  },
  modifier: {
    color: Colors.borderGold,
    fontSize: moderateScale(9),
    fontWeight: 'bold'
  },
  upgrades: {
    color: Colors.calm,
    fontSize: moderateScale(9),
    fontWeight: 'bold'
  },
  total: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: moderateScale(11)
  }
});
