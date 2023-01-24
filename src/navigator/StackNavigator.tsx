import React, { useState, useContext, useEffect } from 'react'

import { createStackNavigator } from "@react-navigation/stack";

import { AuthLoadingScreen } from '../screens/splash/splash.screen';
import { SignInScreen } from '../screens/sign-in/sign-in.screen';
import { LeftMenu } from "./LeftMenu";
import { AuthContext } from '../context/auth.context';

const Stack = createStackNavigator();

export const StackNavigator = () => {

  const [loadingSplash, setLoadingSplash] = useState(true);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      setLoadingSplash(false);
    }, 3000);
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
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          :
          <Stack.Screen name="Main" component={LeftMenu} />
      }

    </Stack.Navigator>
  );
}