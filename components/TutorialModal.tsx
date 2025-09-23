import Colors from 'app/foundation/colors';
import { IHelperContent } from 'app/types/IHelperContent';
import { moderateScale, scale, verticalScale } from 'app/utils/sizeScaling';
import React, { memo, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';

type Props = {
  visible: boolean;
  onClose: () => void;
  slides: IHelperContent[];
};

const { width, height } = Dimensions.get('window');
const MODAL_WIDTH = width * 0.9;
const MODAL_HEIGHT = height * 0.7;
const CAROUSEL_HEIGHT = MODAL_HEIGHT * 0.65;

const TutorialModal: React.FC<Props> = ({ visible, onClose, slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  const renderItem = ({ item }: { item: IHelperContent }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const goNext = () => {
    if (activeIndex < slides.length - 1) {
      carouselRef.current?.scrollTo({ index: activeIndex + 1, animated: true });
    } else {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ImageBackground
            source={require('@assets/tutorial/tutorial_modal_bg.png')}
            style={styles.bg}
            resizeMode="stretch">
            <Carousel
              ref={carouselRef}
              width={MODAL_WIDTH * 0.85}
              height={CAROUSEL_HEIGHT}
              data={slides}
              renderItem={renderItem}
              onSnapToItem={setActiveIndex}
              loop={false}
            />

            <TouchableOpacity style={styles.nextBtn} onPress={goNext}>
              <ImageBackground
                source={require('@assets/buttons/silver_normal.png')}
                style={styles.nextBtnBg}
                resizeMode="stretch">
                <Text style={styles.nextBtnText}>
                  {activeIndex === slides.length - 1 ? 'Done' : 'Next'}
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

export default memo(TutorialModal);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: MODAL_WIDTH,
    height: MODAL_HEIGHT,
    borderRadius: moderateScale(20),
    overflow: 'hidden'
  },
  bg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(30)
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: verticalScale(180),
    marginBottom: verticalScale(12),
    borderRadius: moderateScale(12),
    borderWidth: scale(3),
    borderColor: Colors.borderBlack,
    backgroundColor: Colors.neutralLight
  },
  description: {
    width: '90%',
    fontSize: moderateScale(20),
    color: Colors.neutralLight,
    textAlign: 'center',
    lineHeight: verticalScale(24),
    fontFamily: 'Chilanka_400Regular'
  },
  nextBtn: {
    width: '30%'
  },
  nextBtnBg: {
    width: '100%',
    paddingVertical: verticalScale(10),
    alignItems: 'center'
  },
  nextBtnText: {
    fontSize: moderateScale(18),
    fontFamily: 'DaysOne_400Regular',
    color: 'black'
  }
});
