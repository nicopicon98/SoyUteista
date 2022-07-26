import React, { useState, useContext, useEffect } from 'react'

import { createStackNavigator } from "@react-navigation/stack";

import { AuthLoadingScreen } from '../screens/SplashScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { LeftMenu } from "./LeftMenu";
import { AuthContext } from '../context/AuthContext';

const Stack = createStackNavigator();

export const StackNavigator = () => {

  const [loadingSplash, setLoadingSplash] = useState(true);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      setLoadingSplash(false);
    }, 2000);
    console.log("Desde stack screen -> " + authState);
  }, [authState.status])

  if (loadingSplash === true || authState.status === 'checking') return (<AuthLoadingScreen />)

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      {
        (authState.status !== 'authenticated')
          ?
          <Stack.Screen name="SignInScreen" options={{ title: "Pagina SignInScreen" }} component={SignInScreen} />
          :
          <Stack.Screen name="Main" options={{ title: "Pagina 3" }} component={LeftMenu} />
      }

    </Stack.Navigator>
  );
}