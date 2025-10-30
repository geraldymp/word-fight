import { SvgArrowLeft, SvgArrowRight } from 'app/assets/icons/svgs';
import Colors from 'app/foundation/colors';
import { IHelperContent } from 'app/types/IHelperContent';
import React, { memo, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';

type Props = {
  visible: boolean;
  onClose: () => void;
  slides: IHelperContent[];
};

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const MODAL_CONTENT_HEIGHT = height * 0.8 - (32 + 120);

const HelpModal: React.FC<Props> = ({ visible, onClose, slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  const renderItem = ({ item }: { item: IHelperContent }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const goPrev = () => {
    if (activeIndex > 0) {
      carouselRef.current?.scrollTo({ index: activeIndex - 1, animated: true });
    }
  };

  const goNext = () => {
    if (activeIndex < slides.length - 1) {
      carouselRef.current?.scrollTo({ index: activeIndex + 1, animated: true });
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
          <Carousel
            ref={carouselRef}
            width={width * 0.8}
            height={MODAL_CONTENT_HEIGHT}
            data={slides}
            renderItem={renderItem}
            onSnapToItem={setActiveIndex}
            loop={false}
          />

          <View style={{ alignItems: 'center' }}>
            {/* Dots */}
            <View style={styles.dots}>
              {slides.map((_, i) => (
                <View
                  key={i}
                  style={[styles.dot, activeIndex === i && styles.dotActive]}
                />
              ))}
            </View>
            {/* Bottom Controls */}
            <View style={styles.controls}>
              <Pressable style={styles.btn} onPress={goPrev}>
                <SvgArrowLeft height={20} width={20} />
              </Pressable>

              <Pressable
                style={[styles.btn, styles.btnClose]}
                onPress={onClose}>
                <Text style={styles.btnText}>X</Text>
              </Pressable>

              <Pressable style={styles.btn} onPress={goNext}>
                <SvgArrowRight height={20} width={20} />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(HelpModal);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.modalBg,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: '90%',
    height: '80%',
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: 220,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: Colors.borderBlack,
    backgroundColor: Colors.neutralLight
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.textWhite,
    textAlign: 'center'
  },
  description: {
    width: '100%',
    fontSize: 14,
    color: Colors.neutralLight,
    textAlign: 'left',
    lineHeight: 20
  },
  dots: {
    flexDirection: 'row',
    marginBottom: 14,
    alignItems: 'center'
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.neutralLight,
    marginHorizontal: 4
  },
  dotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%'
  },
  btn: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnClose: {
    backgroundColor: '#ff6666'
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  }
});
