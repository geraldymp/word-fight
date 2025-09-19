import { SvgMana } from 'app/assets/icons/svgs';
import RoundedRectButton from 'app/components/atoms/RoundedRectangleButton';
import { BoosterCard } from 'app/components/BoosterCard';
import { DialogModal } from 'app/components/DialogModal';
import { SingleModal } from 'app/components/SingleModal';
import Colors from 'app/foundation/colors';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import UseMagicHut from './use_magic_hut';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const TOP_AREA_FLEX = 1;
const BOTTOM_AREA_FLEX = 2;

const MAGE_SIZE = screenWidth * 0.55;

const CARD_AREA_HEIGHT = screenHeight * 0.65;
const CARD_AREA_PADDING_VERTICAL = screenHeight / 30;
const CARD_WIDTH = screenWidth / 2 - 30;
const CARD_HEIGHT = CARD_AREA_HEIGHT / 2 - CARD_AREA_PADDING_VERTICAL * 2;

export default function MagicHutScreen() {
  const { actions, states } = UseMagicHut();

  return (
    <View style={styles.container}>
      {/* Wrapper for title, mage and bubble chat */}
      <View style={styles.topWrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>Magic Hut</Text>
        </View>
        <ImageBackground
          source={require('@assets/backgrounds/half_bg.jpg')}
          resizeMode="stretch"
          style={{ flex: 1 }}>
          {/* Magician */}
          <Image
            source={require('@assets/icons/shop/magician.png')}
            style={styles.mageImage}
            resizeMode="cover"
          />
          {/* Bubble Chat */}
          <View style={styles.bubbleChatWrapper}>
            <View style={styles.bubble}>
              <Text style={styles.bubbleText}>{states.magicianText}</Text>
              <View style={styles.bubbleTail} />
            </View>
          </View>

          <View style={styles.manaAndAdWrapper}>
            {states.visibleAdPotion && (
              <TouchableOpacity onPress={actions.onPressAdButton}>
                <Image
                  source={require('@assets/icons/shop/ad_potion.png')}
                  style={styles.adPotionWrapper}
                />
              </TouchableOpacity>
            )}
            <View style={styles.manaWrapper}>
              <Text style={styles.manaText}>{states.mana}</Text>
              <SvgMana height={20} width={20} color={Colors.primary} />
            </View>
          </View>
        </ImageBackground>
      </View>
      <ImageBackground
        source={require('@assets/backgrounds/table_bg.png')}
        resizeMode="cover"
        style={styles.bottomWrapper}>
        <FlatList
          data={states.randomPowerups}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <BoosterCard
              item={item}
              onPress={actions.onClickItem}
              selected={states.selectedItem === item}
              cardHeight={CARD_HEIGHT}
              cardWidth={CARD_WIDTH}
              disabled={item.price > states.mana}
            />
          )}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapperStyle}
          style={styles.flatListStyle}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
        <RoundedRectButton
          onPress={actions.onConfirmShopping}
          type="tertiary"
          size="md"
          title={states.confirmButtonTitle}
          customStyle={{ marginBottom: 8 }}
        />
      </ImageBackground>
      <DialogModal
        visible={states.visibleAdConfirmationModal}
        title="Watch AD to restore 10 HP?"
        cancelationText="No"
        confirmationText="Yes"
        onCancel={actions.onCancelToWatchAd}
        onConfirm={actions.onConfirmToWatchAd}
      />
      <SingleModal
        visible={states.visibleAdDoneModal}
        title="Your HP restored by 10"
        onConfirm={actions.onCloseAdDoneModal}
        confirmationText="OK"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topWrapper: {
    flex: TOP_AREA_FLEX,
    backgroundColor: Colors.neutralDark
  },
  titleWrapper: {
    position: 'absolute',
    top: 16,
    backgroundColor: Colors.secondaryBg70,
    borderColor: Colors.borderBlack,
    borderWidth: 0.5,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 2
  },
  titleText: {
    fontSize: 20,
    color: Colors.textWhite,
    textAlign: 'center',
    textShadowColor: Colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    fontFamily: 'ArchitectsDaughter_400Regular'
  },
  mageImage: {
    height: MAGE_SIZE,
    width: MAGE_SIZE,
    position: 'absolute',
    bottom: -20
  },
  bubbleChatWrapper: {
    position: 'absolute',
    right: 16,
    top: MAGE_SIZE / 2.5,
    maxWidth: screenWidth * 0.5
  },
  bubble: {
    backgroundColor: Colors.neutralLight,
    borderRadius: 16,
    padding: 12,
    borderWidth: 2,
    borderColor: Colors.neutralDark
  },
  bubbleText: {
    fontSize: 16,
    color: Colors.neutralDark,
    textAlign: 'center'
  },
  bubbleTail: {
    position: 'absolute',
    top: 30,
    left: -9.5,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderBottomWidth: 10,
    borderBottomColor: Colors.neutralLight
  },
  manaAndAdWrapper: {
    position: 'absolute',
    bottom: 4,
    right: 24,
    flexDirection: 'row',
    gap: 6
  },
  adPotionWrapper: {
    height: 40,
    width: 40,
    borderRadius: 8,
    backgroundColor: Colors.secondary
  },
  manaWrapper: {
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.neutralDark,
    paddingHorizontal: 9,
    borderColor: Colors.borderBlack,
    borderWidth: 2,
    borderRadius: 4,
    gap: 4
  },
  manaText: {
    color: Colors.neutralLight,
    fontFamily: 'ArchitectsDaughter_400Regular'
  },
  bottomWrapper: {
    flex: BOTTOM_AREA_FLEX,
    width: '100%',
    alignItems: 'center'
  },
  columnWrapperStyle: {
    flex: 1,
    justifyContent: 'center'
  },
  flatListStyle: {
    flexGrow: 0,
    paddingVertical: CARD_AREA_PADDING_VERTICAL,
    paddingHorizontal: 12
  }
});
