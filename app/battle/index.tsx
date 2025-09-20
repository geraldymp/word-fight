/* eslint-disable react-hooks/exhaustive-deps */
import { ConfirmBackHomeModal } from '@components/Battle/ConfirmBackHomeModal';
import { GameProgressModal } from '@components/Battle/GameProgressModal';
import { FloatingDamage } from '@components/FloatingDamage';
import { JourneyMapModal } from '@components/JourneyMapModal';
import { Ionicons } from '@expo/vector-icons';
import AreaProgress from 'app/components/Battle/AreaProgress';
import { EnemyStatus } from 'app/components/Battle/EnemyStatus';
import BottomHUD from 'app/components/BottomHUD';
import { NormalTile } from 'app/components/LetterTile';
import Colors from 'app/foundation/colors';
import { moderateScale, scale, verticalScale } from 'app/utils/sizeScaling';
import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Animated from 'react-native-reanimated';
import UseBattle from './use_battle';

const screenHeight = Dimensions.get('window').height;

const diceSize = screenHeight / 20;
const diceTextSize = (diceSize * 3) / 6;

export default function BattleScreen() {
  const { actions, states } = UseBattle();
  const {
    handleLetterPress,
    handleRearrange,
    handleReshuffle,
    handleSubmit,
    onCancel,
    onCloseMap,
    onCompleteFloatingDamage,
    onConfirm,
    onPressBackToHome,
    onPressNextArea,
    onPressNextStage,
    onGiveUp
  } = actions;
  const {
    areaDetail,
    stage,
    enemyView,
    enemyStyle,
    enemyShakeAnim,
    enemyHP,
    enemyMaxHp,
    enemyMinDmg,
    enemyMaxDmg,
    enemyMinManaBounty,
    enemyMaxManaBounty,
    playerShakeAnim,
    playerMaxHP,
    playerHP,
    mana,
    currentWord,
    letters,
    selectedIndices,
    wrongWordShakeAnim,
    feedback,
    showGameOverModal,
    modalContent,
    showConfirmModal,
    mapVisible,
    journeyPath,
    damageEvents,
    maxReshuffle,
    reshuffleCount,
    getDmgBreakdown
  } = states;
  return (
    <ImageBackground
      style={styles.container}
      source={areaDetail?.battleBackground}>
      {/* Top Button + Area Progress + Enemy Detail */}
      <View style={styles.enemyArea}>
        <TouchableOpacity style={styles.exitButton} onPress={onGiveUp}>
          <Text style={{ fontSize: moderateScale(14) }}>Exit</Text>
          <Ionicons name="exit-outline" size={scale(20)} color="black" />
        </TouchableOpacity>
        <AreaProgress
          area={areaDetail?.name}
          stage={stage}
          customStyle={styles.areaProgressCustom}
        />
        <View
          style={[styles.enemyNameWrapper, { marginTop: verticalScale(55) }]}>
          <Text style={styles.enemyName}>{enemyView.name}</Text>
        </View>

        <EnemyStatus
          enemyHP={enemyHP}
          enemyMaxHp={enemyMaxHp}
          enemyMinDmg={enemyMinDmg}
          enemyMaxDmg={enemyMaxDmg}
          enemyMinManaBounty={enemyMinManaBounty}
          enemyMaxManaBounty={enemyMaxManaBounty}
        />

        <Animated.View
          style={[
            enemyStyle,
            { transform: [{ translateX: enemyShakeAnim }] },
            {
              flex: 1,
              width: '65%',
              marginBottom: verticalScale(8)
            }
          ]}>
          <Image
            source={enemyView.image}
            resizeMode="contain"
            style={{ width: '100%', height: '100%' }}
          />
        </Animated.View>
      </View>

      {/* Word Builder + Damage Breakdown + HUD */}
      <View style={styles.playerArea}>
        <Text style={styles.currentWord}>
          {currentWord ? currentWord.toUpperCase() : '-'}
        </Text>

        {/* Damage breakdown */}
        {/* <DamageBreakdown
          currentWord={currentWord}
          damageBreakdownNums={getDmgBreakdown}
        /> */}

        {/* Word Builder */}
        <Animated.FlatList
          data={letters}
          keyExtractor={(_, i) => i.toString()}
          numColumns={6}
          renderItem={({ item, index }) => (
            <NormalTile
              item={item}
              index={index}
              handleLetterPress={handleLetterPress}
              selectedIndices={selectedIndices}
            />
          )}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          style={[
            {
              flexGrow: 0
            },
            { transform: [{ translateX: wrongWordShakeAnim }] }
          ]}
        />

        {feedback === 'invalid' && (
          <Text style={styles.invalid}>Invalid word</Text>
        )}
        {feedback === 'short' && (
          <Text style={styles.invalid}>At least 3 letters</Text>
        )}

        <BottomHUD
          characterImage={require('@assets/hero_icon.png')}
          playerShakeAnim={playerShakeAnim}
          playerHP={playerHP}
          playerMaxHP={playerMaxHP}
          mana={mana}
          maxReshuffle={maxReshuffle}
          currentReshuffle={reshuffleCount}
          onPlay={handleSubmit}
          onRearrange={handleRearrange}
          onReshuffle={handleReshuffle}
          customStyle={styles.bottomBarContainer}
        />
      </View>
      <GameProgressModal
        showModal={showGameOverModal}
        modalContent={modalContent}
        onPressNextStage={onPressNextStage}
        onPressNextArea={onPressNextArea}
        onPressBackToHome={onPressBackToHome}
      />
      <ConfirmBackHomeModal
        visible={showConfirmModal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <JourneyMapModal
        visible={mapVisible}
        onClose={onCloseMap}
        journey={journeyPath}
      />
      {damageEvents.map(event => (
        <FloatingDamage
          key={event.id}
          amount={event.amount}
          type={event.type}
          onComplete={() => onCompleteFloatingDamage(event)}
        />
      ))}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  exitButton: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(8),
    backgroundColor: 'red',
    borderRadius: 8,
    borderColor: Colors.borderBlack,
    borderWidth: 2,
    position: 'absolute',
    top: verticalScale(8),
    left: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4)
  },
  areaProgressCustom: {
    position: 'absolute',
    top: verticalScale(8),
    right: scale(8)
  },
  enemyArea: {
    flex: 3,
    alignItems: 'center'
  },
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
  enemyName: {
    fontSize: moderateScale(18),
    color: Colors.textWhite,
    textAlign: 'center',
    textShadowColor: Colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    fontFamily: 'ArchitectsDaughter_400Regular'
  },
  playerArea: {
    flex: 2,
    alignItems: 'center',
    paddingTop: verticalScale(16)
  },
  currentWord: {
    fontSize: diceTextSize,
    fontFamily: 'SourGummy_400Regular',
    color: Colors.accent,
    marginBottom: verticalScale(16),
    letterSpacing: 2,
    backgroundColor: Colors.blackBg50,
    borderRadius: 8,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderWidth: 2,
    borderColor: Colors.borderBlue
  },
  invalid: {
    color: Colors.danger,
    backgroundColor: Colors.neutralLight,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.danger,
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(8),
    marginTop: verticalScale(12),
    fontWeight: 'bold',
    fontSize: moderateScale(12)
  },
  bottomBarContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0
  }
});
