import { SvgMana, SvgSword } from 'app/assets/icons/svgs';
import Colors from 'app/foundation/colors'; // adjust path to your Colors
import { moderateScale, verticalScale } from 'app/utils/sizeScaling';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
  maxDmg,
  minMana,
  maxMana
}) => {
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
          <SvgSword width={18} height={18} />
          <Text style={styles.statText}>
            {minDmg} - {maxDmg} Damage
          </Text>
        </View>
        <View style={styles.statusItemBox}>
          <SvgMana width={18} height={18} color={Colors.primary} />
          <Text style={styles.statText}>
            {minMana} - {maxMana} Mana
          </Text>
        </View>
      </View>
    </View>
  );
};

export default React.memo(EnemyStatusBar);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 12,
    width: '75%'
  },
  nameWrapper: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 4,
    borderColor: Colors.borderBlack,
    borderWidth: 4,
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  name: {
    color: Colors.neutralDark,
    fontSize: 16,
    fontFamily: 'SourGummy_800ExtraBold'
  },
  maxHealthBar: {
    width: '100%',
    height: verticalScale(25),
    backgroundColor: Colors.neutralLight,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: Colors.borderBlack,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  currentHealthBar: {
    height: verticalScale(25),
    backgroundColor: Colors.danger,
    overflow: 'hidden'
  },
  currentHealthText: {
    color: Colors.textWhite,
    textShadowColor: Colors.borderBlack,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
    position: 'absolute',
    alignSelf: 'center',
    fontSize: moderateScale(16),
    fontFamily: 'SourGummy_800ExtraBold'
  },
  statusWrapper: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-between'
  },
  statusItemBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondaryBg70,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 4,
    borderRadius: 4,
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    gap: 4
  },
  statText: {
    color: Colors.neutralLight,
    fontSize: 12,
    fontWeight: 'bold'
  }
});
