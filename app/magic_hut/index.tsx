import { SvgMana } from 'app/assets/icons/svgs';
import RoundedRectButton from 'app/components/atoms/RoundedRectangleButton';
import { BoosterCard } from 'app/components/BoosterCard';
import { DialogModal } from 'app/components/DialogModal';
import MagicalReload from 'app/components/MagicReload';
import { SingleModal } from 'app/components/SingleModal';
import { KeyValues } from 'app/constants/key_values';
import Colors from 'app/foundation/colors';
import { moderateScale, scale, verticalScale } from 'app/utils/sizeScaling';
import React from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import UseMagicHut from './use_magic_hut';

const { ad } = KeyValues;

const TOP_AREA_FLEX = 1;
const BOTTOM_AREA_FLEX = 2;

// Mage size relative to width
const MAGE_SIZE = scale(220);

const MAGE_RELOAD_SIZE = MAGE_SIZE / 2.5;

// Card area is still flexed, so only card size is scaled
const CARD_WIDTH = scale(150);
const CARD_HEIGHT = verticalScale(200);

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
          {states.isReloadVisible && (
            <MagicalReload
              source={require('@assets/icons/shop/magician_reload.png')}
              customStyle={styles.mageReloadImage}
              onPress={actions.onRefreshItems}
            />
          )}
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
              <SvgMana
                height={moderateScale(20)}
                width={moderateScale(20)}
                color={Colors.primary}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
      <ImageBackground
        source={require('@assets/backgrounds/table_bg.jpg')}
        resizeMode="cover"
        style={styles.bottomWrapper}>
        <FlatList
          data={states.randomizedItems}
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
          customStyle={{ marginBottom: verticalScale(8) }}
        />
      </ImageBackground>
      <DialogModal
        visible={states.visibleAdConfirmationModal}
        title={`Watch AD to restore ${ad.restore_hp} HP ?`}
        cancelationText="No"
        confirmationText="Yes"
        onCancel={actions.onCancelToWatchAd}
        onConfirm={actions.onConfirmToWatchAd}
      />
      <SingleModal
        visible={states.visibleAdDoneModal}
        title={`Your HP restored by ${ad.restore_hp}`}
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
    top: verticalScale(16),
    backgroundColor: Colors.secondaryBg70,
    borderColor: Colors.borderBlack,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(6),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 2
  },
  titleText: {
    fontSize: moderateScale(20),
    color: Colors.textWhite,
    textAlign: 'center',
    textShadowColor: Colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: scale(10),
    fontFamily: 'ArchitectsDaughter_400Regular'
  },
  mageImage: {
    height: MAGE_SIZE,
    width: MAGE_SIZE,
    position: 'absolute',
    bottom: verticalScale(-20)
  },
  mageReloadImage: {
    height: MAGE_RELOAD_SIZE,
    width: MAGE_RELOAD_SIZE,
    position: 'absolute',
    bottom: verticalScale(-12),
    left: MAGE_SIZE / 2 - MAGE_RELOAD_SIZE / 2
  },
  bubbleChatWrapper: {
    position: 'absolute',
    right: scale(16),
    top: MAGE_SIZE / 2.5,
    maxWidth: '50%'
  },
  bubble: {
    backgroundColor: Colors.neutralLight,
    borderRadius: moderateScale(16),
    padding: moderateScale(12),
    borderWidth: 2,
    borderColor: Colors.neutralDark
  },
  bubbleText: {
    fontSize: moderateScale(14),
    color: Colors.neutralDark,
    textAlign: 'center'
  },
  bubbleTail: {
    position: 'absolute',
    top: '50%',
    left: scale(-9.5),
    width: 0,
    height: 0,
    borderLeftWidth: scale(10),
    borderLeftColor: 'transparent',
    borderRightWidth: scale(10),
    borderRightColor: 'transparent',
    borderBottomWidth: verticalScale(10),
    borderBottomColor: Colors.neutralLight
  },
  manaAndAdWrapper: {
    position: 'absolute',
    bottom: verticalScale(4),
    right: scale(16),
    flexDirection: 'row',
    gap: scale(6)
  },
  adPotionWrapper: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(8),
    backgroundColor: Colors.secondary
  },
  manaWrapper: {
    height: moderateScale(40),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.neutralDark,
    paddingHorizontal: scale(4),
    borderColor: Colors.borderBlack,
    borderWidth: 2,
    borderRadius: moderateScale(4)
  },
  manaText: {
    fontSize: moderateScale(18),
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
    paddingTop: verticalScale(28),
    paddingBottom: verticalScale(14),
    paddingHorizontal: scale(12)
  }
});
