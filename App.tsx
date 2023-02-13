import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { AuthContext, AuthProvider } from '@src/context/auth.context';
import { useNotifications } from '@src/hooks/use-notifications';
import { StackNavigator } from '@src/navigator/stack.navigator';
import { colores } from '@src/theme/app.theme';
import { useContext, useRef } from 'react';
import { LogBox, Platform } from 'react-native';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { Provider as PaperProvider } from 'react-native-paper';
import SpInAppUpdates, { IAUUpdateKind, StartUpdateOptions } from 'sp-react-native-in-app-updates';


// const inAppUpdates = new SpInAppUpdates(
//   true // isDebug
// );

// // curVersion is optional if you don't provide it will automatically take from the app using react-native-device-info
// inAppUpdates.checkNeedsUpdate().then((result) => {
//   if (result.shouldUpdate) {
//     let updateOptions: StartUpdateOptions = {};
//     if (Platform.OS === 'android') {
//       // android only, on iOS the user will be promped to go to your app store page
//       updateOptions = {
//         updateType: IAUUpdateKind.FLEXIBLE,
//       };
//     }
//     inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
//   }
// });

LogBox.ignoreLogs(["EventEmitter.removeListener"]);
LogBox.ignoreAllLogs();

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

import React from 'react';

const NavigationContainerCustom = () => {

  const navigationRef = useRef<NavigationContainerRef<ReactNavigation.RootParamList> | null>(null);
  const { authState: { user } } = useContext(AuthContext)

  return (
    <NavigationContainer
    // ref={navigationRef}
    // onStateChange={async () => {
    //   const actualScreen = (navigationRef.current?.getCurrentRoute()?.name) ?? "No screen"
    //   firebase
    //     .app()
    //     .database('https://soyuteista-cf8a2-default-rtdb.firebaseio.com/')
    //     .ref('/entrys')
    //     .push()
    //     .set({
    //       screen: actualScreen,
    //       email: user?.userEmail,
    //       time: moment().format()
    //     }).then((e) => console.log(e))
    //   // console.log(resp)
    // }}
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