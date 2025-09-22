/* eslint-disable react-hooks/exhaustive-deps */
import { ConfirmBackHomeModal } from '@components/Battle/ConfirmBackHomeModal';
import { GameProgressModal } from '@components/Battle/GameProgressModal';
import { FloatingDamage } from '@components/FloatingDamage';
import { Ionicons } from '@expo/vector-icons';
import AreaProgress from 'app/components/Battle/AreaProgress';
import EnemyStatusBar from 'app/components/Battle/EnemyStatusBar';
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
    enemyStyle,
    enemyName,
    enemyImage,
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
    showGameProgressModal,
    modalContent,
    showConfirmModal,
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
        {/* For damage number animation */}
        {damageEvents
          .filter(e => e.type === 'enemy')
          .map(event => (
            <FloatingDamage
              key={event.id}
              amount={event.amount}
              type={event.type}
              onComplete={() => onCompleteFloatingDamage(event)}
            />
          ))}
        <View style={styles.exitAndAreaWrapper}>
          <TouchableOpacity style={styles.exitButton} onPress={onGiveUp}>
            <Text style={{ fontSize: moderateScale(14) }}>Exit</Text>
            <Ionicons name="exit-outline" size={scale(20)} color="black" />
          </TouchableOpacity>
          <AreaProgress area={areaDetail?.name} stage={stage} />
        </View>
        <EnemyStatusBar
          name={enemyName}
          maxHealth={enemyMaxHp}
          currentHealth={enemyHP}
          minDmg={enemyMinDmg}
          maxDmg={enemyMaxDmg}
          minMana={enemyMinManaBounty}
          maxMana={enemyMaxManaBounty}
        />
        <Animated.View
          ref={states.enemyImageRef}
          style={[enemyStyle, styles.enemyImage]}>
          <Image
            source={enemyImage}
            resizeMode="contain"
            style={{ width: '100%', height: '100%' }}
          />
        </Animated.View>
      </View>

      {/* Word Builder + Damage Breakdown + HUD */}
      <View style={styles.playerArea}>
        {/* For damage number animation */}
        {damageEvents
          .filter(e => e.type === 'player')
          .map(event => (
            <FloatingDamage
              key={event.id}
              amount={event.amount}
              type={event.type}
              onComplete={() => onCompleteFloatingDamage(event)}
            />
          ))}
        <Text ref={states.playerWordRef} style={styles.currentWord}>
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
        showModal={showGameProgressModal}
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
      {states.showProjection && (
        <Animated.Image
          source={require('@assets/magic_projection.png')}
          style={[
            {
              position: 'absolute',
              width: 100,
              height: 100
            },
            states.projectionStyle
          ]}
        />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  exitAndAreaWrapper: {
    flexDirection: 'row',
    width: '100%',
    marginTop: verticalScale(8),
    paddingHorizontal: scale(8),
    justifyContent: 'space-between'
  },
  exitButton: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(8),
    backgroundColor: 'red',
    borderRadius: 8,
    borderColor: Colors.borderBlack,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4)
  },
  enemyArea: {
    flex: 3,
    alignItems: 'center'
  },
  enemyImage: {
    marginTop: verticalScale(12),
    flex: 0.85,
    width: '55%',
    marginBottom: verticalScale(8)
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
