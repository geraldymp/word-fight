/* eslint-disable react-hooks/exhaustive-deps */
import { ConfirmBackHomeModal } from '@components/Battle/ConfirmBackHomeModal';
import { GameProgressModal } from '@components/Battle/GameProgressModal';
import { FloatingDamage } from '@components/FloatingDamage';
import { EnemyImages } from '@constants/enemyImages';
import { Ionicons } from '@expo/vector-icons';
import RoundedRectButton from 'app/components/atoms/RoundedRectangleButton';
import AreaProgress from 'app/components/Battle/AreaProgress';
import DamageBreakdown from 'app/components/Battle/DamageBreakdown';
import EnemyStatusBar from 'app/components/Battle/EnemyStatusBar';
import { LetterTile } from 'app/components/Battle/LetterTiles';
import BottomHUD from 'app/components/BottomHUD';
import FinishGameModal from 'app/components/FinishGameModal';
import TutorialModal from 'app/components/TutorialModal';
import { battleBackgrounds } from 'app/constants/battleBackgrounds';
import { BattleTutorialContents } from 'app/constants/tutorials/battleTutorialContents';
import Colors from 'app/foundation/colors';
import { moderateScale, scale, verticalScale } from 'app/utils/sizeScaling';
import React from 'react';
import {
  Dimensions,
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
    handleCancel,
    handleSubmit,
    onCancelToHome,
    onCompleteFloatingDamage,
    onConfirmToHome,
    onPressBackToHome,
    onPressNextArea,
    onPressNextStage,
    onGiveUp
  } = actions;
  const {
    areaDetail,
    stage,
    enemyStyle,
    enemyId,
    enemyName,
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
      source={battleBackgrounds[areaDetail?.id ?? '']}>
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
            <Text style={{ fontSize: verticalScale(12) }}>Exit</Text>
            <Ionicons
              name="exit-outline"
              size={verticalScale(14)}
              color="black"
            />
          </TouchableOpacity>
          <AreaProgress area={areaDetail?.name} stage={stage} />
        </View>
        {__DEV__ && (
          <View style={styles.skipButtonContainer}>
            <RoundedRectButton
              title="Skip Area"
              onPress={actions.onPressNextArea}
              type="secondary"
              size="mini"
            />
            <RoundedRectButton
              title="Skip Stage"
              onPress={actions.onPressNextStage}
              type="secondary"
              size="mini"
            />
          </View>
        )}
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
          <Animated.Image
            source={EnemyImages[enemyId]}
            resizeMode="contain"
            style={{ width: '100%', height: '100%' }}
            tintColor={states.enemyFlashActive ? 'white' : undefined} // needs a derived boolean/state, not ideal with reanimated directly
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
        <View style={{ alignItems: 'center' }}>
          <Text ref={states.playerWordRef} style={styles.currentWord}>
            {currentWord ? currentWord.toUpperCase() : '-'}
          </Text>

          <DamageBreakdown
            currentWord={currentWord}
            damageBreakdownNums={getDmgBreakdown}
            customStyle={{ opacity: states.showDamageBreakdown ? 1 : 0 }} // turn to 1 if subscribing later
          />
        </View>

        {/* Word Builder */}
        <LetterTile
          letters={letters}
          showNumberedTiles={states.showNumberedTiles}
          isReshuffling={states.isReshuffling}
          selectedIndices={selectedIndices}
          handleLetterPress={handleLetterPress}
          wrongWordShakeAnim={wrongWordShakeAnim}
        />

        <BottomHUD
          characterImage={states.selectedHero?.icon}
          playerShakeAnim={playerShakeAnim}
          playerHP={playerHP}
          playerMaxHP={playerMaxHP}
          mana={mana}
          maxReshuffle={maxReshuffle}
          currentReshuffle={reshuffleCount}
          disableReshuffle={states.disableReshuffle}
          disablePlayBtn={states.disablePlayBtn}
          onPlay={handleSubmit}
          onRearrange={handleRearrange}
          onReshuffle={handleReshuffle}
          onCancel={handleCancel}
          damageModifiers={states.damageModifier}
        />
      </View>
      <GameProgressModal
        showModal={showGameProgressModal}
        modalContent={modalContent}
        onPressNextStage={onPressNextStage}
        onPressNextArea={onPressNextArea}
        onPressBackToHome={onPressBackToHome}
      />
      <FinishGameModal
        visible={states.modalFinishedGame}
        onClose={actions.handleCloseModalFinishedGame}
        stats={states.currentRunStatistic}
      />
      <ConfirmBackHomeModal
        visible={showConfirmModal}
        onConfirm={onConfirmToHome}
        onCancel={onCancelToHome}
      />
      <TutorialModal
        visible={states.showTutorial}
        onClose={actions.handleCloseTutorial}
        slides={BattleTutorialContents}
      />
      {states.showProjection && (
        <Animated.Image
          source={require('@assets/magic_projection.png')}
          style={[
            {
              position: 'absolute',
              width: 100, // if W & H changed, projection movement need some change as well
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
    marginTop: verticalScale(6),
    paddingHorizontal: scale(6),
    justifyContent: 'space-between'
  },
  exitButton: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(8),
    backgroundColor: 'red',
    borderRadius: moderateScale(6),
    borderColor: Colors.borderBlack,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4)
  },
  enemyArea: {
    flex: 1,
    alignItems: 'center'
  },
  enemyImage: {
    marginTop: verticalScale(2),
    flex: 0.95,
    width: '75%'
  },
  playerArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  currentWord: {
    fontSize: diceTextSize,
    fontFamily: 'SourGummy_400Regular',
    color: Colors.accent,
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
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(2),
    borderColor: Colors.danger,
    paddingVertical: verticalScale(3),
    paddingHorizontal: scale(8),
    marginTop: verticalScale(3),
    fontWeight: 'bold',
    fontSize: moderateScale(8)
  },
  skipButtonContainer: {
    position: 'absolute',
    top: verticalScale(36),
    left: scale(6)
  }
});
