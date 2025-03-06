import { View, Text } from 'react-native'
import React from 'react'
import Navigation from './src/navigation/navigation'
import { Provider } from 'react-redux';
import { store } from "./src/redux/store"

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>

  )
}

export default App