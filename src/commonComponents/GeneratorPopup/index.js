import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { Images } from '../../utils/images';

const { height } = Dimensions.get('window');

// Map 0–9 and a–z images
const numberImages = {
  0: Images.num0, 1: Images.num1, 2: Images.num2, 3: Images.num3, 4: Images.num4,
  5: Images.num5, 6: Images.num6, 7: Images.num7, 8: Images.num8, 9: Images.num9,
  a: Images.aaplha, b: Images.baplha, c: Images.caplha, d: Images.daplha,
  e: Images.eaplha, f: Images.faplha, g: Images.gaplha, h: Images.haplha,
  i: Images.iaplha, j: Images.japlha, k: Images.kaplha, l: Images.laplha,
  m: Images.maplha, n: Images.naplha, o: Images.oaplha, p: Images.paplha,
  q: Images.qaplha, r: Images.raplha, s: Images.saplha, t: Images.taplha,
  u: Images.uaplha, v: Images.vaplha, w: Images.waplha, x: Images.xaplha,
  y: Images.yaplha, z: Images.zaplha,
};

const characters = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

const itemHeight = 50;
const scrollHeight = characters.length * itemHeight;

const PopupModal = ({ visible, onClose }) => {
  const animatedValues = useRef(
    Array.from({ length: 5}, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    let animations = [];

    if (visible) {
      animations = animatedValues.map((anim, index) => {
        const animation = Animated.loop(
          Animated.timing(anim, {
            toValue: scrollHeight,
            duration: 3000 + index * 400,
            useNativeDriver: true,
          })
        );
        animation.start();
        return animation;
      });
    } else {
      animatedValues.forEach(anim => {
        anim.stopAnimation(() => {
          anim.setValue(0); // Reset position
        });
      });
    }

    return () => {
      animations.forEach(anim => anim?.stop?.());
    };
  }, [visible]);

  const renderReel = (animatedValue, key) => (
    <View style={styles.reelFrame} key={key}>
      <Animated.View
        style={{
          transform: [{
            translateY: animatedValue.interpolate({
              inputRange: [0, scrollHeight],
              outputRange: [0, -scrollHeight],
            }),
          }],
        }}
      >
        {[...characters, ...characters].map((char, index) => (
          <Image
            key={index}
            source={numberImages[char]}
            style={styles.reelImage}
            resizeMode="contain"
          />
        ))}
      </Animated.View>
    </View>
  );

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <Image source={Images.boxImg} style={styles.boxImg} />
            <View style={styles.reelRow}>
              {animatedValues.map((val, idx) => renderReel(val, idx))}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PopupModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    height: "45%",
    width: "80%",
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxImg: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  reelRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
  },
  reelFrame: {
    height: itemHeight,
    width: 40,
    overflow: 'hidden',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reelImage: {
    height: itemHeight,
    width: 40,
  },
});
