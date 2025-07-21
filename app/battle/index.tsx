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
  const { step,
    stage,
    enemyView,
    enemyStyle,
    enemyShakeAnim,
    enemyHP,
    enemyMaxHp,
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
    reshuffleCount
  } = states;
  return (
    <View style={styles.container}>
      {/* Enemy Display */}
      <View style={styles.enemyArea}>
        <Text
          style={styles.stageStyle}
        >{`Stage: ${step === 6 ? 'Final' : stage}`}</Text>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            padding: 16
          }}
        >
          <Text style={styles.enemyName}>{enemyView.name}</Text>
          <Animated.View style={[enemyStyle]}>
            <Image
              source={enemyView.image}
              resizeMode="cover"
              style={{ width: screenWidth / 2, height: screenHeight / 4 }}
            />
          </Animated.View>
        </View>
        <Animated.Text
          style={[
            styles.enemyHP,
            { transform: [{ translateX: enemyShakeAnim }] }
          ]}
        >
          Enemy HP: {enemyHP} / {enemyMaxHp}
        </Animated.Text>

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
            { fontSize: 18, color: 'white', marginVertical: 6 },
            { transform: [{ translateX: playerShakeAnim }] }
          ]}
        >
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
              testID={`letter-${item}`}
            >
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
          />
          <ActionBottomButton
            icon={<IcRearrange width={18} height={18} />}
            onPress={handleRearrange}
          />
          <ActionBottomButton
            icon={<IcCancel width={18} height={18} />}
            onPress={handleClear}
          />
          <ActionBottomButton
            icon={<IcFight width={18} height={18} />}
            onPress={handleSubmit}
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
  container: { flex: 1 },
  enemyArea: {
    flex: 1,
    backgroundColor: '#330000',
    padding: 16
  },
  stageStyle: {
    fontSize: 18,
    color: 'white'
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
    fontFamily: 'Cinzel_700Bold'
  },
  enemyHP: {
    fontSize: 18,
    color: '#ffaaaa',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    marginBottom: 16
  },
  playerArea: {
    flex: 1,
    padding: 10,
    backgroundColor: '#001a33',
    alignItems: 'center'
  },
  currentWord: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10
  },
  letterTile: {
    width: 28,
    height: 28,
    margin: 4,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6
  },
  selectedTile: {
    backgroundColor: '#aaf'
  },
  letter: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  controls: {
    flexDirection: 'row',
    gap: 16,
    position: 'absolute',
    bottom: 24
  },
  invalid: {
    color: 'salmon',
    marginTop: 10
  }
});
