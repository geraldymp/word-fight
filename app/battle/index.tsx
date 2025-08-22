/* eslint-disable react-hooks/exhaustive-deps */
import { ConfirmBackHomeModal } from '@components/Battle/ConfirmBackHomeModal';
import { GameProgressModal } from '@components/Battle/GameProgressModal';
import { FloatingDamage } from '@components/FloatingDamage';
import { JourneyMapModal } from '@components/JourneyMapModal';
import { SvgCoins, SvgFlag, SvgHeart, SvgSword } from 'app/assets/icons/svgs';
import RoundedButton from 'app/components/atoms/RoundedButton';
import AreaProgress from 'app/components/Battle/AreaProgress';
import BottomMenu from 'app/components/BottomMenu';
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

const selectedtileBorder = '#00aaff';

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
    step,
    stage,
    enemyView,
    enemyStyle,
    enemyShakeAnim,
    enemyHP,
    enemyMaxHp,
    enemyMaxDmg,
    enemyMinDmg,
    enemyGold,
    playerShakeAnim,
    playerHP,
    gold,
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
    reshuffleCount,
    getDmgBreakdown
  } = states;
  return (
    <ImageBackground
      style={styles.container}
      source={require('@assets/main_background.png')}>
      {/* Enemy Display */}
      <View style={styles.enemyArea}>
        <RoundedButton
          icon={<SvgFlag width={20} height={20} />}
          customStyle={{ position: 'absolute', top: 8, left: 8 }}
          onPress={onGiveUp}
        />
        <AreaProgress
          area={step}
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
              <Text style={styles.enemyHP}>
                {enemyHP} / {enemyMaxHp}
              </Text>
            </View>
          </View>
          <View style={styles.enemyStatusWrapper}>
            <View style={styles.enemyStatusItemWrapper}>
              <SvgSword height={20} width={20} color="yellow" />
              <Text
                style={
                  styles.enemyStatusText
                }>{`${enemyMinDmg} - ${enemyMaxDmg} Damage`}</Text>
            </View>
            <View
              style={[
                styles.enemyStatusItemWrapper,
                { justifyContent: 'flex-end' }
              ]}>
              <SvgCoins height={20} width={20} color="green" />
              <Text
                style={
                  styles.enemyStatusText
                }>{`${enemyGold} Gold Bounty`}</Text>
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

      {/* Letters + Word Builder */}
      <View style={styles.playerArea}>
        <Text style={styles.currentWord}>
          {currentWord ? currentWord.toUpperCase() : '-'}
        </Text>

        {/* Damage breakdown */}
        {/* {currentWord.length > 3 && (
          <View style={{ marginBottom: 8, paddingHorizontal: 12 }}>
            <Text style={styles.damagePreview}>
              {getDmgBreakdown.map((val, idx) => (
                <Text key={idx}>
                  {val}
                  {idx < getDmgBreakdown.length - 1 ? ' + ' : ''}
                </Text>
              ))}
              {` = ${getDmgBreakdown.reduce((a, b) => a + b)}`}
            </Text>
            <Text
              style={
                styles.damagePreviewLabel
              }>{`(letters + length bonus + modifier)`}</Text>
          </View>
        )} */}

        {feedback === 'invalid' && (
          <Text style={styles.invalid}>Invalid word</Text>
        )}
        {feedback === 'short' && (
          <Text style={styles.invalid}>At least 4 letter</Text>
        )}

        <Animated.FlatList
          data={letters}
          keyExtractor={(_, i) => i.toString()}
          numColumns={6}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[styles.letterTile, { backgroundColor: 'white' }]}
              onPress={() => handleLetterPress(index)}
              testID={`letter-${item}`}>
              <View
                style={[
                  styles.letterTile,
                  { bottom: 0.8 },
                  selectedIndices.includes(index) && styles.selectedTile
                ]}>
                <Text style={styles.letter}>{item.toUpperCase()}</Text>
              </View>
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
        <BottomMenu
          characterImage={require('@assets/hero_icon.png')}
          playerShakeAnim={playerShakeAnim}
          playerHP={playerHP}
          playerMaxHP={50}
          gold={gold}
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
    backgroundColor: 'rgba(0, 128, 128, 0.8)',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4
  },
  enemyName: {
    fontSize: 20,
    color: '#ffe08a',
    textAlign: 'center',
    textShadowColor: '#ffcc00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 1.2,
    fontFamily: 'ArchitectsDaughter_400Regular'
  },
  enemyHP: {
    color: '#222',
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 16,
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
    color: 'white',
    fontFamily: 'SourGummy_400Regular'
  },
  currentWord: {
    fontSize: diceTextSize,
    fontFamily: 'SourGummy_400Regular',
    color: '#ffe08a',
    marginBottom: 8,
    letterSpacing: 2,
    backgroundColor: 'rgba(0,26,51,0.7)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: selectedtileBorder
  },
  letterTile: {
    width: diceSize,
    height: diceSize,
    margin: 4,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  selectedTile: {
    borderWidth: 2,
    borderColor: selectedtileBorder,
    bottom: 0
  },
  letter: {
    fontSize: diceTextSize,
    color: '#ffe08a',
    fontFamily: 'SourGummy_800ExtraBold'
  },
  bottomBarContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#522546'
  },
  invalid: {
    color: '#ff4d4d',
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
    height: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    overflow: 'hidden',
    justifyContent: 'center'
  },
  enemyCurrentHealthBar: {
    height: 20,
    backgroundColor: '#C53B2F',
    borderRadius: 10
  },
  damagePreview: {
    color: '#ffe08a',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  damagePreviewLabel: {
    color: '#ccc',
    fontSize: 12,
    textAlign: 'center'
  }
});
