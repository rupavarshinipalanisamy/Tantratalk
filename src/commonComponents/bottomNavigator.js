import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../utils/colors';
import { Images } from '../utils/images';
import AppIcon from './Icons/Icons';
import { ScreenName } from '../utils/screenName';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const HEIGHT = 70; // Height of the Bottom Navbar
const CURVE_RADIUS = 25; // Controls how round the curve is

const BottomNavigationBar = () => {
  const navigation =useNavigation()
  return (
    <View style={styles.container}>
      {/* SVG Background with a Smooth Center Curve */}
      <View style={styles.backgroundContainer}>
        <Svg width={width} height={HEIGHT} viewBox={`0 0 ${width} ${HEIGHT}`}>
          <Path
            fill="white"
            d={`
              M 0 0 
              H ${width / 2 - CURVE_RADIUS * 2} 
              Q ${width / 2 - CURVE_RADIUS} ${HEIGHT / 2} ${width / 2} ${HEIGHT / 2} 
              Q ${width / 2 + CURVE_RADIUS} ${HEIGHT / 2} ${width / 2 + CURVE_RADIUS * 2} 0 
              H ${width} 
              V ${HEIGHT} 
              H 0 
              Z
            `}
          />
        </Svg>
      </View>

      {/* Bottom Navigation Icons */}
      <View style={styles.iconRow}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate(ScreenName.chat)}>
          <AppIcon
            name="chatbubbles-outline"
            size={25}
            color={colors.grey6}
            library="Ionicons"

          />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.iconButton,{marginRight:50}]} onPress={() => navigation.navigate('Screen2')}>

          <AppIcon
            name="calendar-outline"
            size={25}
            color={colors.grey6}
            library="Ionicons"

          />
        </TouchableOpacity>

        {/* Floating Button */}
        <View style={styles.floatingButtonContainer}>
          <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate(ScreenName.Products)}>
            <AppIcon
              name="cart-outline"
              size={25}
              color={colors.white}
              library="Ionicons"

            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate(ScreenName.homeScreen)}>
          <AppIcon
            name="home-outline"
            size={25}
            color={colors.grey6}
            library="Ionicons"

          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate(ScreenName.wallet)}>
          {/* <Icon name="phone-outline" size={24} color="#8E8E8E" /> */}
          <AppIcon
            name="wallet-outline"
            size={25}
            color={colors.grey6}
            library="Ionicons"

          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundContainer: {
    position: 'absolute',
    width: '100%',
    height: HEIGHT,
    backgroundColor: 'transparent',
    borderRadius: 10
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width - 40,
    height: HEIGHT,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
  },
  iconButton: {
    padding: 10,
  },
  floatingButtonContainer: {
    position: 'absolute',
    top: -35,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  floatingButton: {
    width: 60,
    height: 60,
    backgroundColor: colors.red,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
});

export default BottomNavigationBar;
