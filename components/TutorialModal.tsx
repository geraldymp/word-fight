import Colors from 'app/foundation/colors';
import { IHelperContent } from 'app/types/IHelperContent';
import { moderateScale, verticalScale } from 'app/utils/sizeScaling';
import React, { memo, useRef, useState } from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text, View } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import RoundedRectButton from './atoms/RoundedRectangleButton';

type Props = {
  visible: boolean;
  onClose: () => void;
  slides: IHelperContent[];
};

const { width, height } = Dimensions.get('window');
const MODAL_WIDTH = width * 0.9;
const MODAL_HEIGHT = height * 0.85;
const CAROUSEL_HEIGHT = MODAL_HEIGHT * 0.75;

const TutorialModal: React.FC<Props> = ({ visible, onClose, slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  const renderItem = ({ item }: { item: IHelperContent }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const onDone = () => {
    setActiveIndex(0);
    onClose();
  };

  const goNext = () => {
    if (activeIndex < slides.length - 1) {
      carouselRef.current?.scrollTo({ index: activeIndex + 1, animated: true });
    } else {
      onDone();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDone}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Carousel
            ref={carouselRef}
            width={MODAL_WIDTH * 0.85}
            height={CAROUSEL_HEIGHT}
            data={slides}
            renderItem={renderItem}
            onSnapToItem={setActiveIndex}
            loop={false}
          />
          <RoundedRectButton
            onPress={goNext}
            title={activeIndex === slides.length - 1 ? 'Done' : 'Next'}
            type={'primary'}
            size={'lg'}
          />
        </View>
      </View>
    </Modal>
  );
};

export default memo(TutorialModal);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.modalBg,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: MODAL_WIDTH,
    height: MODAL_HEIGHT,
    borderRadius: moderateScale(20),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(15),
    backgroundColor: Colors.secondary,
    borderWidth: 2,
    borderColor: Colors.borderBlack
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: verticalScale(220),
    marginBottom: verticalScale(12)
  },
  description: {
    width: '90%',
    fontSize: verticalScale(16),
    color: Colors.neutralLight,
    lineHeight: verticalScale(20),
    fontFamily: 'DMSans_500Medium'
  }
});
