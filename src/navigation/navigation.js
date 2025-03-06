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

                </Stack.Navigator>
            </DrawerComponent>
        </NavigationContainer>
    );
};

export default Navigation;
