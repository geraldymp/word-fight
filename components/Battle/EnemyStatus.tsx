import { SvgHeart, SvgMana, SvgSword } from 'app/assets/icons/svgs';
import Colors from 'app/foundation/colors';
import { moderateScale, scale, verticalScale } from 'app/utils/sizeScaling';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IEnemyStatus {
  enemyHP: number;
  enemyMaxHp: number;
  enemyMinDmg: number;
  enemyMaxDmg: number;
  enemyMinManaBounty: number;
  enemyMaxManaBounty: number;
}

export const _EnemyStatus: React.FC<IEnemyStatus> = ({
  enemyHP,
  enemyMaxHp,
  enemyMinDmg,
  enemyMaxDmg,
  enemyMinManaBounty,
  enemyMaxManaBounty
}) => {
  return (
    <View style={styles.enemyNameWrapper}>
      <View style={styles.enemyHealthContainer}>
        <SvgHeart
          color="red"
          stroke="black"
          height={verticalScale(32)}
          width={verticalScale(32)}
        />
        <View style={styles.enemyMaxHealthBar}>
          <View
            style={[
              styles.enemyCurrentHealthBar,
              { width: `${Math.max(0, (enemyHP / enemyMaxHp) * 100)}%` }
            ]}
          />
          <Text style={styles.enemyHPText}>
            {enemyHP} / {enemyMaxHp}
          </Text>
        </View>
      </View>
      <View style={styles.enemyStatusWrapper}>
        <View style={styles.enemyStatusItemWrapper}>
          <SvgSword
            height={scale(20)}
            width={scale(20)}
            color={Colors.borderBlack}
          />
          {enemyMinDmg === enemyMaxDmg ? (
            <Text
              style={styles.enemyStatusText}>{`${enemyMinDmg} Damage`}</Text>
          ) : (
            <Text
              style={
                styles.enemyStatusText
              }>{`${enemyMinDmg} - ${enemyMaxDmg} Damage`}</Text>
          )}
        </View>
        <View
          style={[
            styles.enemyStatusItemWrapper,
            { justifyContent: 'flex-end' }
          ]}>
          <SvgMana
            height={scale(20)}
            width={scale(20)}
            color={Colors.primary}
          />
          {enemyMinManaBounty === enemyMaxManaBounty ? (
            <Text
              style={
                styles.enemyStatusText
              }>{`${enemyMinManaBounty} Mana bounty`}</Text>
          ) : (
            <Text
              style={
                styles.enemyStatusText
              }>{`${enemyMinManaBounty} - ${enemyMaxManaBounty} Mana bounty`}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export const EnemyStatus = React.memo(_EnemyStatus);

const styles = StyleSheet.create({
  enemyNameWrapper: {
    backgroundColor: Colors.secondaryBg70,
    borderColor: Colors.borderBlack,
    borderWidth: 0.5,
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(6),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(4)
  },
  enemyHealthContainer: {
    width: '60%',
    gap: scale(6),
    flexDirection: 'row',
    alignItems: 'center'
  },
  enemyMaxHealthBar: {
    flex: 1,
    height: verticalScale(25),
    backgroundColor: Colors.neutralLight,
    borderRadius: moderateScale(15),
    borderWidth: 2,
    borderColor: Colors.borderBlack,
    overflow: 'hidden',
    justifyContent: 'center'
  },
  enemyCurrentHealthBar: {
    height: verticalScale(25),
    backgroundColor: Colors.danger,
    borderRadius: moderateScale(10)
  },
  enemyHPText: {
    color: Colors.textWhite,
    textShadowColor: Colors.borderBlack,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
    position: 'absolute',
    alignSelf: 'center',
    fontSize: moderateScale(16),
    fontFamily: 'SourGummy_800ExtraBold'
  },
  enemyStatusWrapper: {
    flexDirection: 'row',
    width: '75%',
    justifyContent: 'space-between'
  },
  enemyStatusItemWrapper: {
    flex: 1,
    gap: scale(6),
    flexDirection: 'row',
    alignItems: 'center'
  },
  enemyStatusText: {
    color: Colors.neutralLight,
    fontFamily: 'SourGummy_400Regular',
    fontSize: moderateScale(12)
  }
});
