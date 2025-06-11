import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './src/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from './src/navigation/navigation';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './src/utils/colors';
import { login, logout } from "./src/redux/slices/authStateSice/index";
import { AppNavigation } from './src/screens/AppNavigation';
import Orientation from 'react-native-orientation-locker';
import { SnackbarProvider } from './src/commonComponents/Snackbar';


const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        dispatch(login({ token: userToken }));
      }
    };
    checkLoginStatus();
  }, [dispatch]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top']} >
        < SnackbarProvider>
          {/* <StatusBar barStyle="dark-content" backgroundColor={colors.red} /> */}
          <AppNavigation isLoggedIn={isLoggedIn} />
        </SnackbarProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
