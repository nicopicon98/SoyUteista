import React, { useEffect, useReducer, useState } from 'react';

import { LogBox, Platform } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { StackNavigator } from './src/navigator/StackNavigator';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { Alert } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import SpInAppUpdates, {
  NeedsUpdateResponse,
  IAUUpdateKind,
  StartUpdateOptions,
} from 'sp-react-native-in-app-updates';
import { colores } from './src/theme/appTheme';
import { useNotifications } from './src/hooks/useNotifications';

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

  useNotifications()

  return (
    <NavigationContainer>
      <AppState>
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
      </AppState>
    </NavigationContainer>
  )
}

export default App;