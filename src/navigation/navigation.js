import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ScreenName } from '../utils/screenName';
import LoginScreen from '../screens/loginScreen';
import UserName from '../screens/userName';
import Gender from '../screens/genderScreen';
import BirthDate from '../screens/birthScreen';
// import HomeScreen from '../screens/HomeScreen/homescreen';
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
import ChatScreen from '../screens/chatScreen';
import ProductDescription from '../screens/productsDescription';
import Password from '../screens/password';
import Phonenum from '../screens/phonenumber';
import CustomDrawerContent from '../commonComponents/navBar';
import HomeScreen from '../screens/HomeScreen/homeScreen';
import CartScreen from '../screens/cartScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Create a dedicated Drawer Navigator that uses your custom drawer component.
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            // Use your custom drawer content
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Drawer.Screen name={ScreenName.homeScreen} component={HomeScreen} />
            <Drawer.Screen name={ScreenName.bookPooja} component={BookPooja} />
            <Drawer.Screen name={ScreenName.orderHistory} component={OrderHistory} />
            <Drawer.Screen name={ScreenName.payment} component={Payment} />
            <Drawer.Screen name={ScreenName.profile} component={ProfileScreen} />
            <Drawer.Screen name={ScreenName.editProfile} component={EditProfile} />
            <Drawer.Screen name={ScreenName.consultation} component={Consultation} />
            <Drawer.Screen name={ScreenName.consultationForm} component={ConsultationForm} />
            <Drawer.Screen name={ScreenName.Astrologers} component={Astrologers} />
            <Drawer.Screen name={ScreenName.Products} component={Products} />
            <Drawer.Screen name={ScreenName.DailyHoro} component={DailyHoroscope} />
            <Drawer.Screen name={ScreenName.horoScope} component={HoroScope} />
            <Drawer.Screen name={ScreenName.freeKundli} component={FreeKundli} />
            <Drawer.Screen name={ScreenName.freeKudliDetails} component={FreeKudliDetails} />
            <Drawer.Screen name={ScreenName.matchingKundliForm} component={MatchingKundliForm} />
            <Drawer.Screen name={ScreenName.matchingKundliForm2} component={MatchingKundliForm2} />
            <Drawer.Screen name={ScreenName.CompatabilityScore} component={CompatabilityScore} />
            <Drawer.Screen name={ScreenName.wallet} component={Wallet} />
            <Drawer.Screen name={ScreenName.chat} component={ChatScreen} />
            <Drawer.Screen name={ScreenName.productDescription} component={ProductDescription} />
            <Drawer.Screen name={ScreenName.cartScreen} component={CartScreen} />

        </Drawer.Navigator>
    );
};

// Main Navigation
const Navigation = ({ isLoggedIn }) => {
    console.log(isLoggedIn, "isLoggedinnn");

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={isLoggedIn ? "DrawerNavigator" : ScreenName.login}
                screenOptions={{ headerShown: false, animation: 'none' }}
            >
                {!isLoggedIn ? (
                    <>
                        <Stack.Screen name={ScreenName.login} component={LoginScreen} />
                        <Stack.Screen name={ScreenName.UserName} component={UserName} />
                        <Stack.Screen name={ScreenName.genderScreen} component={Gender} />
                        <Stack.Screen name={ScreenName.birthScreen} component={BirthDate} />
                        <Stack.Screen name={ScreenName.birthtime} component={BirthTimeScreen} />
                        <Stack.Screen name={ScreenName.birthPlace} component={BirthPlaceScreen} />
                        <Stack.Screen name={ScreenName.password} component={Password} />
                        <Drawer.Screen name={ScreenName.phonenum} component={Phonenum} />

                    </>
                ) : (
                    <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;








