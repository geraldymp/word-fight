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
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Animated from 'react-native-reanimated';
import UseBattle from './use_battle';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const diceSize = screenHeight / 24;
const diceTextSize = (diceSize * 3) / 6;

const bottomIconSize = screenWidth / 10;

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
    onPressNextStage
  } = actions;
  const {
    enemyView,
    enemyStyle,
    enemyShakeAnim,
    enemyHP,
    enemyMaxHp,
    enemyMaxDmg,
    enemyMinDmg,
    playerShakeAnim,
    playerHP,
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
    currentStage,
    currentArea,
    getDmgBreakdown
  } = states;
  return (
    <View style={styles.container}>
      {/* Enemy Display */}
      <View style={styles.enemyArea}>
        <Text style={styles.areaText}>{currentArea}</Text>
        <Text style={styles.stageText}>{currentStage}</Text>
        <Text style={styles.enemyName}>{enemyView.name}</Text>
        <Animated.View style={[enemyStyle, { width: '60%', height: '60%' }]}>
          <Image
            source={enemyView.image}
            resizeMode="contain"
            style={{ width: '100%', height: '100%' }}
          />
        </Animated.View>
        <View style={styles.enemyStatusContainer}>
          <Text style={{ color: 'white', marginBottom: 6 }}>
            <Text>⚔ </Text>
            <Text>{`${enemyMinDmg} - ${enemyMaxDmg}`}</Text>
          </Text>
          <Animated.View
            style={[
              { width: '100%', paddingHorizontal: 32 },
              { transform: [{ translateX: enemyShakeAnim }] }
            ]}>
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
          </Animated.View>
        </View>

        {/* map hidden for now */}
        {/* <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 16,
            left: 16
          }}
          onPress={() => setMapVisible(true)}
        >
          <Image
            source={require('../assets/icons/battle/map.png')}
            resizeMode="contain"
            style={{ width: 32, height: 32 }}
          />
        </TouchableOpacity> */}
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

        <Animated.FlatList
          data={letters}
          keyExtractor={(_, i) => i.toString()}
          numColumns={5}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.letterTile,
                selectedIndices.includes(index) && styles.selectedTile
              ]}
              onPress={() => handleLetterPress(index)}
              testID={`letter-${item}`}>
              <Text style={styles.letter}>{item.toUpperCase()}</Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          style={[
            { flexGrow: 0 },
            { transform: [{ translateX: wrongWordShakeAnim }] }
          ]}
        />

        {currentWord.length > 0 && (
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
        )}

        {feedback === 'invalid' && (
          <Text style={styles.invalid}>Invalid word</Text>
        )}
        {feedback === 'short' && (
          <Text style={styles.invalid}>At least 4 letter</Text>
        )}

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  enemyArea: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#330000'
  },
  areaText: {
    fontSize: 18,
    color: 'white',
    position: 'absolute',
    top: 12,
    left: 16
  },
  stageText: {
    fontSize: 18,
    color: 'white',
    position: 'absolute',
    top: 12,
    right: 16
  },
  enemyName: {
    fontSize: 28,
    color: '#ffe08a',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#ffcc00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 1.2,
    fontFamily: 'Cinzel_700Bold',
    marginTop: 20,
    marginBottom: 8
  },
  enemyHP: {
    color: '#222',
    position: 'absolute',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  playerArea: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#001a33'
  },
  currentWord: {
    fontSize: diceTextSize,
    color: '#ffe08a',
    marginBottom: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    backgroundColor: 'rgba(0,26,51,0.7)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: '#00aaff'
  },
  letterTile: {
    width: diceSize,
    height: diceSize,
    margin: 4,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ffe08a'
  },
  selectedTile: {
    backgroundColor: '#00aaff',
    borderColor: '#fff'
  },
  letter: {
    fontSize: diceTextSize,
    fontWeight: 'bold',
    color: '#ffe08a'
  },
  controls: {
    flexDirection: 'row',
    gap: 16,
    position: 'absolute',
    bottom: 24
  },
  invalid: {
    color: '#ff4d4d',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16
  },
  enemyStatusContainer: {
    position: 'absolute',
    bottom: 16,
    alignItems: 'center',
    width: '100%'
  },
  maxHealthBar: {
    width: '100%',
    height: 32,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#222',
    overflow: 'hidden',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4
  },
  currentHealthBar: {
    height: 32,
    backgroundColor: '#ffe08a',
    borderRadius: 12
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
