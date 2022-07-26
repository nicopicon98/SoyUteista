import React, { useEffect, useReducer, useState } from 'react';

import { LogBox } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/context/AuthContext';
import { StackNavigator } from './src/navigator/StackNavigator';


LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const AppState = ({ children }: { children: JSX.Element | JSX.Element[] }) => { //le puedo pasar children como un elmento jsx o como muchos
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <StackNavigator />
      </AppState>
    </NavigationContainer>
  )
}

export default App;