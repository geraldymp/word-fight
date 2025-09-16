import { SvgBubbleChat, SvgMana } from 'app/assets/icons/svgs';
import RoundedRectButton from 'app/components/atoms/RoundedRectangleButton';
import { BoosterCard } from 'app/components/BoosterCard';
import { DialogModal } from 'app/components/DialogModal';
import { SingleModal } from 'app/components/SingleModal';
import { boosters } from 'app/constants/boosters';
import Colors from 'app/foundation/colors';
import { IBooster } from 'app/types/IBooster';
import React, { useMemo, useState } from 'react';
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
const BUBBLE_CHAT_WIDTH = screenWidth * 0.5;
const BUBBLE_CHAT_HEIGHT = screenHeight * 0.15;

const CARD_AREA_HEIGHT = screenHeight * 0.65;
const CARD_AREA_PADDING_VERTICAL = screenHeight / 30;
const CARD_WIDTH = screenWidth / 2 - 30;
const CARD_HEIGHT = CARD_AREA_HEIGHT / 2 - CARD_AREA_PADDING_VERTICAL * 2;

function getRandomPowerups(list: IBooster[], amount: number = 4) {
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, amount);
}

export default function MagicHutScreen() {
  const [selectedItem, setSelectedItem] = useState<IBooster>();

  const { actions, states } = UseMagicHut();
  const { handleSelect } = actions;

  function onClickItem(item: IBooster) {
    if (item.id === selectedItem?.id) {
      setSelectedItem(undefined);
    } else {
      setSelectedItem(item);
    }
  }

  function onConfirmShopping() {
    handleSelect(selectedItem);
  }

  const randomPowerups = useMemo(() => {
    return getRandomPowerups(boosters);
  }, []);

  const confirmButtonTitle = useMemo(() => {
    if (selectedItem === undefined) {
      return 'Skip Ahead';
    } else {
      return 'Buy & Resume';
    }
  }, [selectedItem]);

  return (
    <View style={styles.container}>
      {/* Wrapper for title, mage and bubble chat */}
      <View style={styles.topWrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>Magic Hut</Text>
        </View>
        <ImageBackground
          source={require('@assets/backgrounds/half_bg.png')}
          resizeMode="stretch"
          style={{ flex: 1 }}>
          <Image
            source={require('@assets/icons/shop/magician.png')}
            style={styles.mageImage}
            resizeMode="cover"
          />
          <View style={styles.bubbleChatWrapper}>
            <SvgBubbleChat
              height={BUBBLE_CHAT_HEIGHT}
              width={BUBBLE_CHAT_WIDTH}
              color={Colors.neutralDark}
              preserveAspectRatio="none"
            />
            <Text style={styles.bubbleChatText}>
              Let see how much magic you have gathered
            </Text>
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
          data={randomPowerups}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <BoosterCard
              item={item}
              onPress={onClickItem}
              selected={selectedItem === item}
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
          onPress={onConfirmShopping}
          type="tertiary"
          size="md"
          title={confirmButtonTitle}
          customStyle={{ marginBottom: 8 }}
        />
      </ImageBackground>
      <DialogModal
        visible={states.visibleAdConfirmationModal}
        title="Watch AD to restore 20 HP?"
        cancelationText="No"
        confirmationText="Yes"
        onCancel={actions.onCancelToWatchAd}
        onConfirm={actions.onConfirmToWatchAd}
      />
      <SingleModal
        visible={states.visibleAdDoneModal}
        title="Your HP restored by 20"
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
    top: MAGE_SIZE / 3.5
  },
  bubbleChatText: {
    position: 'absolute',
    padding: 20,
    textAlign: 'center'
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
