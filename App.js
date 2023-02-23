import React from 'react'
import { SafeAreaView } from 'react-native'
import MyStack from './src/navigation/stack.navigator'
import { NavigationContainer } from '@react-navigation/native';

const App = () => {

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}

export default App
