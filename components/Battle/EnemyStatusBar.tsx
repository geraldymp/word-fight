import Colors from 'app/foundation/colors';
import { moderateScale, scale, verticalScale } from 'app/utils/sizeScaling';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface EnemyStatusBarProps {
  name: string;
  maxHealth: number;
  currentHealth: number;
  minDmg: number;
  maxDmg: number;
  minMana: number;
  maxMana: number;
}

const EnemyStatusBar: React.FC<EnemyStatusBarProps> = ({
  name,
  maxHealth,
  currentHealth,
  minDmg,
  maxDmg
  // minMana,
  // maxMana
}) => {
  const sameDmg = minDmg === maxDmg;
  const ICON_SIZE = verticalScale(16);
  return (
    <View style={styles.container}>
      {/* Name */}
      <View style={styles.nameWrapper}>
        <Text style={styles.name}>{name}</Text>
      </View>

      {/* Health Bar */}
      <View style={styles.maxHealthBar}>
        <View
          style={[
            styles.currentHealthBar,
            { width: `${Math.max(0, (currentHealth / maxHealth) * 100)}%` }
          ]}
        />
        <Text style={styles.currentHealthText}>
          {currentHealth} / {maxHealth}
        </Text>
      </View>

      {/* Status Damage and Mana */}
      <View style={styles.statusWrapper}>
        <View style={styles.statusItemBox}>
          <Image
            source={require('@assets/icons/battle/sword.png')}
            style={{
              width: ICON_SIZE,
              height: ICON_SIZE
            }}
          />
          {sameDmg ? (
            <Text style={styles.statText}>{minDmg} Damage</Text>
          ) : (
            <Text style={styles.statText}>
              {minDmg} - {maxDmg}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default React.memo(EnemyStatusBar);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: verticalScale(12),
    width: '40%'
  },
  nameWrapper: {
    backgroundColor: Colors.primary,
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
    borderRadius: moderateScale(4),
    borderColor: Colors.borderBlack,
    borderWidth: moderateScale(2.5),
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: -0.5 //to close a gap, dont know why there is a gap tho
  },
  name: {
    color: Colors.neutralDark,
    fontSize: verticalScale(12),
    fontFamily: 'SourGummy_800ExtraBold'
  },
  maxHealthBar: {
    width: '100%',
    height: verticalScale(22),
    backgroundColor: Colors.neutralLight,
    borderRadius: moderateScale(4),
    borderWidth: moderateScale(2.5),
    borderColor: Colors.borderBlack,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  currentHealthBar: {
    height: verticalScale(22),
    backgroundColor: Colors.danger,
    overflow: 'hidden'
  },
  currentHealthText: {
    color: Colors.textWhite,
    textShadowColor: Colors.borderBlack,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: moderateScale(4),
    position: 'absolute',
    alignSelf: 'center',
    fontSize: verticalScale(12),
    fontFamily: 'SourGummy_800ExtraBold'
  },
  statusWrapper: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  statusItemBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondaryBg70,
    paddingHorizontal: scale(4),
    paddingVertical: verticalScale(2),
    borderWidth: moderateScale(2.5),
    borderRadius: moderateScale(4),
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    gap: scale(3)
  },
  statText: {
    color: Colors.neutralLight,
    fontSize: verticalScale(12),
    fontFamily: 'SourGummy_800ExtraBold'
  }
});
