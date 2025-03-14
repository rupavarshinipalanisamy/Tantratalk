import React from 'react';
import { View, StatusBar, SafeAreaView, StyleSheet, Platform } from 'react-native';
import Navigation from './src/navigation/navigation';
import { Provider } from 'react-redux';
import { store } from "./src/redux/store";
import { colors } from './src/utils/colors';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        {/* Explicitly setting the StatusBar */}
        <StatusBar 
          barStyle="dark-content" 
          backgroundColor="transparent" 
          translucent 
        />
        <View style={styles.innerContainer}>
          <Navigation />
        </View>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.red, // Ensures it matches the app background
  },
  innerContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, 
  },
});

export default App;
