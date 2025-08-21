/* eslint-disable react-hooks/exhaustive-deps */
import {
  IcCancel,
  IcFight,
  IcRearrange,
  IcReshuffle
} from '@assets/icons/battle';
import { ActionBottomButton } from '@components/Battle/ActionBottomButton';
import { ConfirmBackHomeModal } from '@components/Battle/ConfirmBackHomeModal';
import { GameProgressModal } from '@components/Battle/GameProgressModal';
import { FloatingDamage } from '@components/FloatingDamage';
import { JourneyMapModal } from '@components/JourneyMapModal';
import { SvgCoins, SvgHeart, SvgSword } from 'app/assets/icons/svgs';
import AreaProgress from 'app/components/Battle/AreaProgress';
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

const tileBg = '';
const selectedtileBorder = '#00aaff';

export default function BattleScreen() {
  const { actions, states } = UseBattle();
  const {
    handleLetterPress,
    handleRearrange,
    handleReshuffle,
    handleSubmit,
    handleClear,
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
      source={require('@assets/bgbg.png')}>
      {/* Enemy Display */}
      <View style={styles.enemyArea}>
        <View style={styles.topStatusContainer}>
          <TouchableOpacity
            style={{
              // TODO: need to change to component
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#97c7a4',
              borderRadius: 8,
              paddingVertical: 8,
              paddingHorizontal: 16
            }}
            onPress={onGiveUp}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 12,
                marginRight: 8
              }}>
              Give up
            </Text>
          </TouchableOpacity>
          <View
            style={{
              // TODO: change to component
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'red',
              borderWidth: 1,
              borderColor: 'blue',
              borderRadius: 8,
              paddingVertical: 8,
              paddingHorizontal: 16
            }}>
            <Text
              style={{
                color: '#ffe08a',
                fontWeight: 'bold',
                fontSize: 12,
                marginRight: 8
              }}>{`Gold: ${gold}`}</Text>
          </View>
          <AreaProgress
            area={step}
            stage={stage}
            customStyle={{
              flex: 1
            }}
          />
        </View>
        <Text style={styles.enemyName}>{enemyView.name}</Text>
        {/* <View
          style={{
            flexDirection: 'row',
            width: '75%',
            justifyContent: 'space-between'
          }}>
          <View
            style={{
              flex: 1,
              gap: 6,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <SvgSword height={24} width={24} color="yellow" />
            <Text
              style={{
                color: 'white',

                fontFamily: 'SourGummy_400Regular'
              }}>{`${enemyMinDmg} - ${enemyMaxDmg} Damage`}</Text>
          </View>
          <View
            style={{
              flex: 1,
              gap: 6,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}>
            <SvgCoins height={24} width={24} color="green" />
            <Text
              style={{
                color: 'white',

                fontFamily: 'SourGummy_400Regular'
              }}>{`${enemyGold} Gold Reward`}</Text>
          </View>
        </View> */}
        <Animated.View
          style={[
            enemyStyle,
            { width: '60%', height: '60%' },
            { transform: [{ translateX: enemyShakeAnim }] }
          ]}>
          <Image
            source={enemyView.image}
            resizeMode="contain"
            style={{ width: '100%', height: '100%' }}
          />
        </Animated.View>

        <View style={styles.enemyStatusContainer}>
          <SvgHeart color="red" stroke="black" height={32} width={32} />
          <View style={styles.maxHealthBar}>
            <View
              style={[
                styles.currentHealthBar,
                { width: `${Math.max(0, (enemyHP / enemyMaxHp) * 100)}%` }
              ]}
            />
            <Text style={styles.enemyHP}>
              {enemyHP} / {enemyMaxHp}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '75%',
            justifyContent: 'space-between'
          }}>
          <View
            style={{
              flex: 1,
              gap: 6,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <SvgSword height={24} width={24} color="yellow" />
            <Text
              style={{
                color: 'white',

                fontFamily: 'SourGummy_400Regular'
              }}>{`${enemyMinDmg} - ${enemyMaxDmg} Damage`}</Text>
          </View>
          <View
            style={{
              flex: 1,
              gap: 6,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}>
            <SvgCoins height={24} width={24} color="green" />
            <Text
              style={{
                color: 'white',

                fontFamily: 'SourGummy_400Regular'
              }}>{`${enemyGold} Gold Reward`}</Text>
          </View>
        </View>
      </View>

      {/* Letters + Word Builder */}
      <View style={styles.playerArea}>
        <Animated.Text
          style={[
            { fontSize: 18, color: 'white', marginBottom: 6 },
            { transform: [{ translateX: playerShakeAnim }] }
          ]}>
          Player HP: {playerHP}
        </Animated.Text>

        <Text style={styles.currentWord}>
          {currentWord ? currentWord.toUpperCase() : '-'}
        </Text>

        {/* Damage breakdown */}
        {/* {currentWord.length > 0 && (
          <View style={{ marginBottom: 8 }}>
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

        {/* Controls */}
        <View style={styles.controls}>
          <ActionBottomButton
            icon={<IcReshuffle width={18} height={18} />}
            onPress={handleReshuffle}
            disabled={reshuffleCount === 0}
            counter={reshuffleCount}
            size={bottomIconSize}
          />
          <ActionBottomButton
            icon={<IcRearrange width={18} height={18} />}
            onPress={handleRearrange}
            size={bottomIconSize}
          />
          <ActionBottomButton
            icon={<IcCancel width={18} height={18} />}
            onPress={handleClear}
            size={bottomIconSize}
          />
          <ActionBottomButton
            icon={<IcFight width={18} height={18} />}
            onPress={handleSubmit}
            size={bottomIconSize}
          />
        </View>
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
    flex: 1,
    alignItems: 'center'
    // backgroundColor: '#2A1D16',
  },
  topStatusContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#522546',
    gap: 12,
    padding: 6
  },
  enemyName: {
    fontSize: 20,
    color: '#ffe08a',
    textAlign: 'center',
    textShadowColor: '#ffcc00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 1.2,
    fontFamily: 'ArchitectsDaughter_400Regular',
    marginTop: 52,
    marginBottom: 8
  },
  enemyHP: {
    color: '#222',
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 12,
    fontFamily: 'SourGummy_800ExtraBold'
  },
  playerArea: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 16
    // backgroundColor: '#001a33'
  },
  currentWord: {
    fontSize: diceTextSize,
    fontFamily: 'SourGummy_400Regular',
    color: '#ffe08a',
    marginBottom: 10,
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
  controls: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    gap: 16,
    position: 'absolute',
    bottom: 0,
    paddingTop: 8,
    paddingBottom: 16,
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
    alignItems: 'center',
    marginBottom: 6
  },
  maxHealthBar: {
    flex: 1,
    height: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'red',
    overflow: 'hidden',
    justifyContent: 'center'
  },
  currentHealthBar: {
    height: 20,
    backgroundColor: '#C53B2F',
    borderRadius: 10
  },
  damagePreview: {
    color: '#ffe08a',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  damagePreviewLabel: {
    color: '#ccc',
    fontSize: 12,
    textAlign: 'center'
  }
});
