import useLocalUpdate from './src/hooks/use-local-update.hook';
import {StackNavigator} from '@src/navigator/stack-navigator';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {SnackbarProvider} from '@src/context/snackbar';
import {AuthProvider} from '@src/context/auth';
import * as Sentry from '@sentry/react-native';
import {useEffect} from 'react';

Sentry.init({
  dsn: 'https://73769704cb3c420d9ba224c87dde4ac8@o4505185706639360.ingest.sentry.io/4505185708736512',
});

export const AppState = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  //le puedo pasar children como un elmento jsx o como muchos
  return <AuthProvider>{children}</AuthProvider>;
};
const App = () => {
  const {renderUpdateModal, showUpdateModal} = useLocalUpdate();

  // Manejo de errores globales
  useEffect(() => {
    const globalErrorHandler = (error: any, isFatal?: boolean) => {
      Sentry.captureException(error);
    };

    ErrorUtils.setGlobalHandler(globalErrorHandler);

    return () => {
      ErrorUtils.setGlobalHandler(ErrorUtils.getGlobalHandler()); // Restablecer el controlador de errores global al original
    };
  }, []);

  return (
    <>
      {showUpdateModal ? renderUpdateModal : <></>}
      <NavigationContainer>
        <AppState>
          <PaperProvider>
            <SnackbarProvider>
              <StackNavigator />
            </SnackbarProvider>
          </PaperProvider>
        </AppState>
      </NavigationContainer>
    </>
  );
};

export default App;
