import BlinkingText from 'app/components/BlinkingText';
import { NormalTile } from 'app/components/LetterTile/NormalTile';
import { NumberedTile } from 'app/components/LetterTile/NumberedTile';
import Colors from 'app/foundation/colors';
import { ILetter } from 'app/types/ILetter';
import { verticalScale } from 'app/utils/sizeScaling';
import LottieView from 'lottie-react-native';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';

interface Props {
  letters: ILetter[];
  showNumberedTiles: boolean;
  isReshuffling: boolean;
  selectedIndices: number[];
  handleLetterPress: (i: number) => void;
  wrongWordShakeAnim: SharedValue<number>;
}

const _LetterTile: React.FC<Props> = ({
  letters,
  showNumberedTiles,
  isReshuffling,
  selectedIndices,
  handleLetterPress,
  wrongWordShakeAnim
}) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Animated.FlatList
        data={letters}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) =>
          showNumberedTiles ? (
            <NumberedTile
              item={item}
              index={index}
              handleLetterPress={handleLetterPress}
              selectedIndices={selectedIndices}
            />
          ) : (
            <NormalTile
              item={item}
              index={index}
              handleLetterPress={handleLetterPress}
              selectedIndices={selectedIndices}
            />
          )
        }
        style={[
          {
            flexGrow: 0,
            marginTop: verticalScale(10),
            opacity: isReshuffling ? 0 : 1
          },
          { transform: [{ translateX: wrongWordShakeAnim }] }
        ]}
        numColumns={6}
        initialNumToRender={18}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      />

      {isReshuffling && (
        <View style={styles.overlay} pointerEvents="none">
          <View style={{ height: '80%', width: '100%' }}>
            <LottieView
              source={require('@assets/lottie/reshuffle_loading.json')}
              autoPlay
              loop
              style={{ height: '100%', width: '100%' }}
              resizeMode="contain"
            />
          </View>
          <View style={{ height: '20%' }}>
            <BlinkingText text="Preparing new set of letters..." />
          </View>
        </View>
      )}
    </View>
  );
};

export const LetterTile = memo(_LetterTile);

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondaryBg70,
    padding: 16,
    borderRadius: 6
  }
});
