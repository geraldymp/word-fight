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
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Carousel
            ref={carouselRef}
            width={width * 0.8}
            height={420}
            data={slides}
            renderItem={renderItem}
            onSnapToItem={setActiveIndex}
            loop={false}
          />

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
              <Text style={styles.btnText}>←</Text>
            </Pressable>

            <Pressable style={[styles.btn, styles.btnClose]} onPress={onClose}>
              <Text style={styles.btnText}>X</Text>
            </Pressable>

            <Pressable style={styles.btn} onPress={goNext}>
              <Text style={styles.btnText}>→</Text>
            </Pressable>
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
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: '90%',
    height: '65%',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
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
    borderRadius: 12
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center'
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22
  },
  dots: {
    flexDirection: 'row',
    marginVertical: 14,
    alignItems: 'center'
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#bbb',
    marginHorizontal: 4
  },
  dotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#333'
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
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
