import SpInAppUpdates, { IAUUpdateKind, StartUpdateOptions } from 'sp-react-native-in-app-updates';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { StackNavigator } from '@src/navigator/stack.navigator';
import { useNotifications } from '@src/hooks/use-notifications';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import crashlytics from '@react-native-firebase/crashlytics';
import { AuthContext, AuthProvider } from '@src/context/auth.context';
import { LogBox, Platform } from 'react-native';
import { colores } from '@src/theme/app.theme';
import { useContext, useRef } from 'react';


const inAppUpdates = new SpInAppUpdates(
  true // isDebug
);

// curVersion is optional if you don't provide it will automatically take from the app using react-native-device-info
inAppUpdates.checkNeedsUpdate().then((result) => {
  if (result.shouldUpdate) {
    let updateOptions: StartUpdateOptions = {};
    if (Platform.OS === 'android') {
      // android only, on iOS the user will be promped to go to your app store page
      updateOptions = {
        updateType: IAUUpdateKind.FLEXIBLE,
      };
    }
    inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
  }
});

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

export const AppState = ({ children }: { children: JSX.Element | JSX.Element[] }) => { //le puedo pasar children como un elmento jsx o como muchos
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

const App = () => {
  console.log(Platform.OS)
  if (Platform.OS === 'android') {
    useNotifications()
  }

  return (
    <AppState>
      <NavigationContainerCustom />
    </AppState>
  )
}

import React from 'react'

const NavigationContainerCustom = () => {
  const navigationRef = useRef<NavigationContainerRef<ReactNavigation.RootParamList> | null>(null);
  const { authState: { user } } = useContext(AuthContext)

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={async () => {
        const actualScreen = (navigationRef.current?.getCurrentRoute()?.name) ?? "No screen"

          crashlytics().setAttributes({
            screen: actualScreen,
          }).then(e =>{
            console.log(e)
          }).catch((e) => {
            console.log(e, "catc")
          })
          // console.log(resp)


      }}

    >
      <PaperProvider>
        <AlertNotificationRoot
          colors={[{
            label: 'white',
            card: 'black',
            overlay: 'red',
            success: colores.Pantone_383_C,
            danger: 'red',
            warning: colores.Blue_Rey,
          },
          {
            label: 'labelExampleLight',
            card: 'cardExampleLight',
            overlay: 'overlayExampleLight',
            success: 'red',
            danger: 'red',
            warning: 'yellow',
          }]}
          theme='light'
        >
          <StackNavigator />
        </AlertNotificationRoot>
      </PaperProvider>
    </NavigationContainer>
  )
}

export default App;