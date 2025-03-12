import React from 'react';
import { View, StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import Navigation from './src/navigation/navigation';
import { Provider } from 'react-redux';
import { store } from "./src/redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Navigation />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: (StatusBar.currentHeight || 0) + 0,
  },
});

export default App;
