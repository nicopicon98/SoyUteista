import { StackNavigator } from '@src/navigator/stack-navigator';
import { useNotifications, useCheckUpdates } from '@src/hooks';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SnackbarProvider } from '@src/context/snackbar';
import { AuthProvider } from '@src/context/auth';
import { Platform } from 'react-native';

export const AppState = ({ children }: { children: JSX.Element | JSX.Element[] }) => { //le puedo pasar children como un elmento jsx o como muchos
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}
const App = () => {
  useCheckUpdates();
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