import React, { useEffect, useReducer, useState } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthLoadingScreen from './src/screens/SplashScreen';
import { SignInScreen } from './src/screens/SignInScreen';
import { DrawerMenuContent } from './src/menus/DrawerMenu';
import { AuthManager } from './src/auth/AuthManager';
import { authReducer } from './src/context/authReducer';
import { AuthState } from './src/interfaces/AuthStateInterface';
import { AuthContext, AuthContextProps } from './src/context/AuthContext';


LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const Stack = createStackNavigator();

const authInitialState: AuthState = {
  isLoading: true,
  isSignOut: false,
  userToken: null
}

const App = () => {
  const [loading, setLoading] = useState(false);
  
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const bootstrapAsync = async (): Promise<void> => {
    const userToken = await AsyncStorage.getItem('userToken');
    dispatch({ type: 'RESTORE_TOKEN', token: userToken }); //isLoading: false
  };

  useEffect(() => {
    setTimeout(() => {
      bootstrapAsync();
    }, 2000);
  }, []);

  const authContext: AuthContextProps = {
    authState: state,
    signIn: async () => {
      try {
        setLoading(true);
        await AuthManager.signInAsync();
        const tokenReceived = await AuthManager.getAccessTokenAsync();
        dispatch({ type: 'SIGN_IN', token: tokenReceived });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
    signOut: async () => {
      setLoading(false);
      await AuthManager.signOutAsync();
      dispatch({ type: 'SIGN_OUT' });
    }
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            <Stack.Screen name='Loading' component={AuthLoadingScreen} /> //Este seria mi SpashScreen
          ) : state.userToken == null ? (
            <Stack.Screen name='SignIn'>
              {/* to thread props to an screen */}
              {(props) => <SignInScreen {...props} loginState={{ loading }} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen name='Main' component={DrawerMenuContent} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;