/* eslint-disable react-hooks/exhaustive-deps */
import { ConfirmBackHomeModal } from '@components/Battle/ConfirmBackHomeModal';
import { GameProgressModal } from '@components/Battle/GameProgressModal';
import { FloatingDamage } from '@components/FloatingDamage';
import { Ionicons } from '@expo/vector-icons';
import AreaProgress from 'app/components/Battle/AreaProgress';
import DamageBreakdown from 'app/components/Battle/DamageBreakdown';
import EnemyStatusBar from 'app/components/Battle/EnemyStatusBar';
import { LetterTile } from 'app/components/Battle/LetterTiles';
import BottomHUD from 'app/components/BottomHUD';
import TutorialModal from 'app/components/TutorialModal';
import { BattleTutorialContents } from 'app/constants/battleTutorialContents';
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

        {feedback === 'invalid' && (
          <Text style={styles.invalid}>Invalid word</Text>
        )}
        {feedback === 'short' && (
          <Text style={styles.invalid}>At least 3 letters</Text>
        )}

        <BottomHUD
          characterImage={states.selectedHero?.icon}
          playerShakeAnim={playerShakeAnim}
          playerHP={playerHP}
          playerMaxHP={playerMaxHP}
          mana={mana}
          maxReshuffle={maxReshuffle}
          currentReshuffle={reshuffleCount}
          disabledReshuffle={states.isReshuffling}
          onPlay={handleSubmit}
          onRearrange={handleRearrange}
          onReshuffle={handleReshuffle}
          damageModifiers={states.damageModifier}
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
    paddingTop: verticalScale(8)
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
  bottomBarContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0
  }
});
