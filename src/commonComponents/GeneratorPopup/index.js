import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Images } from '../../utils/images';

const { height } = Dimensions.get('window');

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

const characters = Object.keys(numberImages);
const itemHeight = 50;
const scrollHeight = characters.length * itemHeight;

const PopupModal = ({ visible, onClose }) => {
  const animatedValues = useRef(
    Array.from({ length: 5 }, () => new Animated.Value(0))
  ).current;

  const [winnerCode, setWinnerCode] = useState('');
  const [loadingWinner, setLoadingWinner] = useState(false);

  const now = new Date();
  const date = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const is4th = date === 4;
  const is5thAfter6PM = date === 5 && (hours > 18 || (hours === 18 && minutes >= 0));
  const isBetween5th6PMandNext4th = (date > 5 || is5thAfter6PM || date < 4);

  const showAnimation = !is4th && isBetween5th6PMandNext4th;
  const showWinner =  is4th;
  const showMessage = !showAnimation && !showWinner;

  const winnerKey = `winner_${now.getMonth()}_${now.getFullYear()}`;
  // useEffect(() => {
  //   fetchWinnerFromAPI(); 
  // }, []);

  const fetchWinnerFromAPI = async () => {
    try {
      setLoadingWinner(true);
      // Replace this URL with your actual winner API endpoint
      console.log("Calling winner API...");

      const response = await fetch('http://192.168.1.8:5000/apiV1/backend/admin/Rewardofthismonth');
      const data = await response.json();
      console.log('====================================');
      console.log(data, "rewardcodess");
      console.log('====================================');
      const winner = data?.rewardCode || 'abc12'; // fallback dummy
      await AsyncStorage.setItem(winnerKey, winner);
      setWinnerCode(winner);
    } catch (error) {
      console.error('Error fetching winner:', error);
    } finally {
      setLoadingWinner(false);
    }
  };

  useEffect(() => {
    console.log(visible, showWinner, "visible,showWinner");
    if (visible && showWinner) {
      // loadWinner();
      fetchWinnerFromAPI();

    }
  }, [visible, showWinner]);

  useEffect(() => {
    let animations = [];

    if (visible && showAnimation) {
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
        anim.stopAnimation(() => anim.setValue(0));
      });
    }

    return () => {
      animations.forEach(anim => anim?.stop?.());
    };
  }, [visible, showAnimation]);

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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent:"center"

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

            {showAnimation && (
              <View style={styles.reelRow}>
                {animatedValues.map((val, idx) => renderReel(val, idx))}
              </View>
            )}

            {showWinner && (
              <View style={styles.reelRow}>
                {loadingWinner ? (
                  <ActivityIndicator size="large" color="#fff" />
                ) : (

                  <View style={styles.reelRowStatic}>
                    {winnerCode.toLowerCase().split('').map((char, idx) => {
                      const img = numberImages[char];
                      if (!img) return null;
                      return (
                        <View style={styles.reelFrameStatic} key={idx}>
                          <View style={styles.imageWrapperStatic}>
                            <Image source={img} style={styles.reelImageStatic} resizeMode="contain" />
                          </View>
                        </View>
                      );
                    })}
                  </View>

                  // winnerCode
                  //   .toLowerCase()
                  //   .split('')
                  //   .map((char, idx) => {
                  //     const img = numberImages[char];
                  //     if (!img) return null; // Skip if no image for this char
                  //     return (
                  //       <View style={styles.reelFrame} key={idx}>
                  //         <View style={styles.imageWrapper}>
                  //           <Image
                  //             source={img}
                  //             style={styles.reelImage}
                  //             resizeMode="contain"
                  //           />
                  //         </View>
                  //       </View>
                  //     );
                  //   })
                )}
              </View>
            )}

            {showMessage && (
              <Text style={{ color: '#fff', fontSize: 16, marginTop: 30 }}>
                Winner will be announced on 5th at 6 PM.
              </Text>
            )}
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
    height: '45%',
    width: '80%',
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


  reelRowStatic: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  reelFrameStatic: {
    height: itemHeight,
    width: 50, // match your spinner slot width
    overflow: 'hidden',
    marginHorizontal: 4,
    borderRadius: 12,
    marginTop: 20,
    // backgroundColor: 'white', // ensures clean slot look
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageWrapperStatic: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  reelImageStatic: {
    height: 50,     // this is the size of your letter images
    width: 50,
  },

});
