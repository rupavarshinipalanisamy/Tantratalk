import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenName } from '../utils/screenName';
import LoginScreen from '../screens/loginScreen';
import UserName from '../screens/userName';
import Gender from '../screens/genderScreen';
import BirthDate from '../screens/birthScreen';
import HomeScreen from '../screens/homeScreen';
import BookPooja from '../screens/bookPooja';
import OrderHistory from '../screens/orderHistory';
import Payment from '../screens/payment';
import ProfileScreen from '../screens/profileScreen';
import DrawerComponent from '../commonComponents/navBar';
import EditProfile from '../screens/editProfile';
import Consultation from '../screens/consultationScreen';
import ConsultationForm from '../screens/consultationForm';
import Astrologers from '../screens/astrologers';
import Products from '../screens/products';
import DailyHoroscope from '../screens/dailyHoroscope';
import BirthTimeScreen from '../screens/birthTimeScreen';
import BirthPlaceScreen from '../screens/birthPlace';
import HoroScope from '../screens/horoscope';
import FreeKundli from '../screens/freeKundli';
import FreeKudliDetails from '../screens/freeKundliDetails';
import MatchingKundliForm from '../screens/matchingKundliForm';
import MatchingKundliForm2 from '../screens/MatchingKundliForm2';
import CompatabilityScore from '../screens/compatabilityScore';
import Wallet from '../screens/wallet';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <DrawerComponent>
                <Stack.Navigator initialRouteName={ScreenName?.login} screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={ScreenName?.login} component={LoginScreen} />
                    <Stack.Screen name={ScreenName?.UserName} component={UserName} />
                    <Stack.Screen name={ScreenName?.genderScreen} component={Gender} />
                    <Stack.Screen name={ScreenName?.birthScreen} component={BirthDate} />
                    <Stack.Screen name={ScreenName?.bookPooja} component={BookPooja} />
                    <Stack.Screen name={ScreenName?.orderHistory} component={OrderHistory} />
                    <Stack.Screen name={ScreenName?.payment} component={Payment} />
                    <Stack.Screen name={ScreenName?.profile} component={ProfileScreen} />
                    <Stack.Screen name={ScreenName?.homeScreen} component={HomeScreen} />
                    <Stack.Screen name={ScreenName?.editProfile} component={EditProfile} />
                    <Stack.Screen name={ScreenName?.consultation} component={Consultation} />
                    <Stack.Screen name={ScreenName?.consultationForm} component={ConsultationForm} />
                    <Stack.Screen name={ScreenName?.Astrologers} component={Astrologers} />
                    <Stack.Screen name={ScreenName?.Products} component={Products} />
                    <Stack.Screen name={ScreenName?.DailyHoro} component={DailyHoroscope} />
                    <Stack.Screen name={ScreenName?.birthtime} component={BirthTimeScreen} />
                    <Stack.Screen name={ScreenName?.birthPlace} component={BirthPlaceScreen} />
                    <Stack.Screen name={ScreenName?.horoScope} component={HoroScope} />
                    <Stack.Screen name={ScreenName?.freeKundli} component={FreeKundli} />
                    <Stack.Screen name={ScreenName?.freeKudliDetails} component={FreeKudliDetails} />
                    <Stack.Screen name={ScreenName?.matchingKundliForm} component={MatchingKundliForm} />
                    <Stack.Screen name={ScreenName?.matchingKundliForm2} component={MatchingKundliForm2} />
                    <Stack.Screen name={ScreenName?.CompatabilityScore} component={CompatabilityScore} />
                    <Stack.Screen name={ScreenName?.wallet} component={Wallet} />


                </Stack.Navigator>
            </DrawerComponent>
        </NavigationContainer>
    );
};

export default Navigation;
