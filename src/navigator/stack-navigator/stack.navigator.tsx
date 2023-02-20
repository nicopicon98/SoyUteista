import { createStackNavigator } from "@react-navigation/stack";
import { LeftDrawerNavigator } from '../left-drawer-navigator';
import { AuthLoadingScreen } from '@src/screens/splash';
import { useState, useContext, useEffect } from 'react'
import { SignInScreen } from '@src/screens/sign-in';
import { AuthContext } from '@src/context/auth';

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
          <>
            <Stack.Screen name="Main" component={LeftDrawerNavigator} />
            {/* <Stack.Screen name="PushNotification" component={PushNotificationScreen} /> */}
          </>
      }

    </Stack.Navigator>
  );
}