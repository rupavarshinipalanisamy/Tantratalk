import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Drawer } from 'react-native-drawer-layout';
import { useSelector, useDispatch } from 'react-redux';
import { ScreenName } from '../utils/screenName';
import { navbarOpenState } from '../redux/slices/sideNavBar';
import HomeScreen from '../screens/HomeScreen/homeScreen';
import BookPooja from '../screens/bookPooja';
import OrderHistory from '../screens/orderHistory';
import Payment from '../screens/payment';
import ProfileScreen from '../screens/profileScreen';
import EditProfile from '../screens/editProfile';
import Consultation from '../screens/consultationScreen';
import ConsultationForm from '../screens/consultationForm';
import Astrologers from '../screens/astrologers';
import Products from '../screens/products';
import DailyHoroscope from '../screens/dailyHoroscope';
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
import LoginScreen from '../screens/loginScreen';
import UserName from '../screens/userName';
import Gender from '../screens/genderScreen';
import BirthDate from '../screens/birthScreen';
import BirthTimeScreen from '../screens/birthTimeScreen';
import BirthPlaceScreen from '../screens/birthPlace';
import { colors } from '../utils/colors';
import { Images } from '../utils/images';
import CustomDrawerContent from '../commonComponents/navBar';
import CartScreen from './cartScreen';
import AddressScreen from './AddAddress';
import Languages from './languages';
import Panjapatchi from './panjapatchi';

const Stack = createStackNavigator();

export const AppNavigation = ({ isLoggedIn }) => {
    console.log(isLoggedIn,"AppNavigation");
    
    const isOpen = useSelector((state) => state.sidenavbar.isOpen);
    const dispatch = useDispatch();

    return (
        <NavigationContainer>
            <Drawer
                open={isOpen}
                onOpen={() => dispatch(navbarOpenState(true))}
                onClose={() => dispatch(navbarOpenState(false))}
                swipeEnabled={false}
                drawerStyle={{ width: '75%' }}
                renderDrawerContent={() => (
                    <SafeAreaView style={{ flex: 1 }}>
                        <CustomDrawerContent />
                    </SafeAreaView>
                )}
            >
                <Stack.Navigator screenOptions={{ headerShown: false, animation: 'default' }}>
                    {
                        isLoggedIn ? (
                            <>
                                <Stack.Screen name={ScreenName.homeScreen} component={HomeScreen} />
                                <Stack.Screen name={ScreenName.bookPooja} component={BookPooja} />
                                <Stack.Screen name={ScreenName.orderHistory} component={OrderHistory} />
                                <Stack.Screen name={ScreenName.payment} component={Payment} />
                                <Stack.Screen name={ScreenName.profile} component={ProfileScreen} />
                                <Stack.Screen name={ScreenName.editProfile} component={EditProfile} />
                                <Stack.Screen name={ScreenName.consultation} component={Consultation} />
                                <Stack.Screen name={ScreenName.consultationForm} component={ConsultationForm} />
                                <Stack.Screen name={ScreenName.Astrologers} component={Astrologers} />
                                <Stack.Screen name={ScreenName.Products} component={Products} />
                                <Stack.Screen name={ScreenName.DailyHoro} component={DailyHoroscope} />
                                <Stack.Screen name={ScreenName.horoScope} component={HoroScope} />
                                <Stack.Screen name={ScreenName.freeKundli} component={FreeKundli} />
                                <Stack.Screen name={ScreenName.freeKudliDetails} component={FreeKudliDetails} />
                                <Stack.Screen name={ScreenName.matchingKundliForm} component={MatchingKundliForm} />
                                <Stack.Screen name={ScreenName.matchingKundliForm2} component={MatchingKundliForm2} />
                                <Stack.Screen name={ScreenName.CompatabilityScore} component={CompatabilityScore} />
                                <Stack.Screen name={ScreenName.wallet} component={Wallet} />
                                <Stack.Screen name={ScreenName.chat} component={ChatScreen} />
                                <Stack.Screen name={ScreenName.productDescription} component={ProductDescription} />
                                <Stack.Screen name={ScreenName.cartScreen} component={CartScreen} />
                                <Stack.Screen name={ScreenName.addressScreen} component={AddressScreen} />
                                <Stack.Screen name={ScreenName.languages} component={Languages} />
                                <Stack.Screen name={ScreenName.Panjapatchi} component={Panjapatchi} />


                            </>
                        ) : (
                            <>
                                <Stack.Screen name={ScreenName.login} component={LoginScreen} />
                                <Stack.Screen name={ScreenName.phonenum} component={Phonenum} />
                                <Stack.Screen name={ScreenName.UserName} component={UserName} />
                                <Stack.Screen name={ScreenName.genderScreen} component={Gender} />
                                <Stack.Screen name={ScreenName.birthScreen} component={BirthDate} />
                                <Stack.Screen name={ScreenName.birthtime} component={BirthTimeScreen} />
                                <Stack.Screen name={ScreenName.birthPlace} component={BirthPlaceScreen} />
                                <Stack.Screen name={ScreenName.password} component={Password} />
                            </>
                        )
                    }
                </Stack.Navigator>
            </Drawer>
        </NavigationContainer>
    );
};


const styles = StyleSheet.create({
    titleContainer: {
        alignItems: 'center',
    },
    titleText: {
        color: colors.red,
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileSection: {
        flexDirection: 'row',
        marginTop: 45,
        backgroundColor: colors.lightgrey,
        padding: 10,
        alignItems: 'center',
    },
    profileImage: {
        height: 50,
        width: 50,
        borderRadius: 50,
    },
    profileTextContainer: {
        marginLeft: 30,
        justifyContent: 'center',
    },
    profileText: {
        fontSize: 12,
        color: colors.black0,
    },
});
