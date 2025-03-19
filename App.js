import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import Navigation from './src/navigation/navigation';
import { Provider } from 'react-redux';
import { store } from "./src/redux/store";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './src/utils/colors';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        {/* Safe area only for status bar (keeps status bar white) */}
        <SafeAreaView style={styles.safeArea} edges={['top']} />
        {/* Status bar with white background */}
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        {/* Main UI content */}
        <View style={styles.container}>
          <Navigation />
        </View>
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 0, 
    backgroundColor: 'white', // Status bar area stays white
  },
  container: {
    flex: 1,
    backgroundColor: colors.red, // Apply red background to the main UI only
  },
});

export default App;
