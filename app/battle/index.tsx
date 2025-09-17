/* eslint-disable react-hooks/exhaustive-deps */
import { ConfirmBackHomeModal } from '@components/Battle/ConfirmBackHomeModal';
import { GameProgressModal } from '@components/Battle/GameProgressModal';
import { FloatingDamage } from '@components/FloatingDamage';
import { JourneyMapModal } from '@components/JourneyMapModal';
import { SvgHeart, SvgMana, SvgSword } from 'app/assets/icons/svgs';
import RoundedRectButton from 'app/components/atoms/RoundedRectangleButton';
import AreaProgress from 'app/components/Battle/AreaProgress';
import BottomHUD from 'app/components/BottomHUD';
import Colors from 'app/foundation/colors';
import { LinearGradient } from 'expo-linear-gradient';
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
const screenWidth = Dimensions.get('window').width;

const diceSize = screenHeight / 20;
const diceTextSize = (diceSize * 3) / 6;

const bottomIconSize = screenWidth / 12;

const BUTTON_GRADIENT = ['#f7e7c6', '#f5ce64ff'] as const; // light gold gradient for buttons

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
        <RoundedRectButton
          title="Give up"
          customStyle={{ position: 'absolute', top: 8, left: 8 }}
          onPress={onGiveUp}
          type="warning"
          size="sm"
        />
        <AreaProgress
          area={areaDetail?.name}
          stage={stage}
          customStyle={{
            position: 'absolute',
            top: 8,
            right: 8
          }}
        />
        <View style={styles.enemyNameWrapper}>
          <Text style={styles.enemyName}>{enemyView.name}</Text>
        </View>

        <View style={styles.enemyNameWrapper}>
          <View style={styles.enemyStatusContainer}>
            <SvgHeart color="red" stroke="black" height={32} width={32} />
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
              <SvgSword height={20} width={20} color={Colors.borderBlack} />
              {enemyMinDmg === enemyMaxDmg ? (
                <Text
                  style={
                    styles.enemyStatusText
                  }>{`${enemyMinDmg} Damage`}</Text>
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
              <SvgMana height={20} width={20} color={Colors.primary} />
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

        <Animated.View
          style={[
            enemyStyle,
            { transform: [{ translateX: enemyShakeAnim }] },
            { width: '60%', height: '60%', marginVertical: 8 }
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

        {feedback === 'invalid' && (
          <Text style={styles.invalid}>Invalid word</Text>
        )}
        {feedback === 'short' && (
          <Text style={styles.invalid}>At least 4 letter</Text>
        )}

        {/* Word Builder */}
        <Animated.FlatList
          data={letters}
          keyExtractor={(_, i) => i.toString()}
          numColumns={6}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.letterTile,
                { backgroundColor: Colors.neutralDark } // There is View inside to make shadowing effect
              ]}
              onPress={() => handleLetterPress(index)}
              testID={`letter-${item}`}>
              <LinearGradient
                colors={BUTTON_GRADIENT}
                style={[
                  styles.letterTile,
                  { bottom: 2 },
                  selectedIndices.includes(index) && styles.selectedTile
                ]}>
                <Text style={styles.letter}>{item.toUpperCase()}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          style={[
            {
              flexGrow: 0,
              position: 'absolute',
              bottom: bottomIconSize + 42
            },
            { transform: [{ translateX: wrongWordShakeAnim }] }
          ]}
        />

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
  enemyArea: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 12
  },
  enemyNameWrapper: {
    backgroundColor: Colors.secondaryBg70,
    borderColor: Colors.borderBlack,
    borderWidth: 0.5,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4
  },
  enemyName: {
    fontSize: 20,
    color: Colors.textWhite,
    textAlign: 'center',
    textShadowColor: Colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    fontFamily: 'ArchitectsDaughter_400Regular'
  },
  enemyHPText: {
    color: Colors.textWhite,
    textShadowColor: Colors.borderBlack,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 18,
    fontFamily: 'SourGummy_800ExtraBold'
  },
  playerArea: {
    flex: 2,
    alignItems: 'center',
    paddingTop: 16
  },
  enemyStatusWrapper: {
    flexDirection: 'row',
    width: '75%',
    justifyContent: 'space-between'
  },
  enemyStatusItemWrapper: {
    flex: 1,
    gap: 6,
    flexDirection: 'row',
    alignItems: 'center'
  },
  enemyStatusText: {
    color: Colors.neutralLight,
    fontFamily: 'SourGummy_400Regular'
  },
  currentWord: {
    fontSize: diceTextSize,
    fontFamily: 'SourGummy_400Regular',
    color: Colors.accent,
    marginBottom: 8,
    letterSpacing: 2,
    backgroundColor: Colors.blackBg50,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: Colors.borderBlue
  },
  letterTile: {
    width: diceSize,
    height: diceSize,
    margin: 3,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  selectedTile: {
    borderWidth: 3,
    borderColor: Colors.borderBlue,
    bottom: 0
  },
  letter: {
    fontSize: diceTextSize,
    color: Colors.neutralDark,
    fontFamily: 'SourGummy_800ExtraBold'
  },
  bottomBarContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  invalid: {
    color: Colors.danger,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16
  },
  enemyStatusContainer: {
    width: '60%',
    gap: 6,
    flexDirection: 'row',
    alignItems: 'center'
  },
  enemyMaxHealthBar: {
    flex: 1,
    height: 25,
    backgroundColor: Colors.neutralLight,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.borderBlack,
    overflow: 'hidden',
    justifyContent: 'center'
  },
  enemyCurrentHealthBar: {
    height: 25,
    backgroundColor: Colors.danger,
    borderRadius: 10
  }
});
