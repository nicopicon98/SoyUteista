import SpInAppUpdates, {IAUUpdateKind, StartUpdateOptions} from 'sp-react-native-in-app-updates';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { StackNavigator } from '@src/navigator/stack-navigator/stack.navigator';
import { useNotifications } from '@src/hooks/use-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SnackbarProvider } from '@src/context/snackbar';
import { AuthProvider } from '@src/context/auth';
import { LogBox, Platform } from 'react-native';

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

  if (Platform.OS === 'android') {
    useNotifications()
  }

  return (
    <NavigationContainer>
      <AppState>
        <PaperProvider>
          <SnackbarProvider>
            <StackNavigator />
          </SnackbarProvider>
        </PaperProvider>
      </AppState>
    </NavigationContainer>
  )
}

export default App;