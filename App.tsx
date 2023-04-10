import {StackNavigator} from '@src/navigator/stack-navigator';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {SnackbarProvider} from '@src/context/snackbar';
import {AuthProvider} from '@src/context/auth';
import useLocalUpdate from './src/hooks/use-local-update.hook';
import {useEffect} from 'react';
import {CryptoHelper} from '@src/utilities/http-encryption.utility';
import { REACT_APP_SECRET_KEY } from "@env"

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

  useEffect(() => {
    console.log("the secret key is", REACT_APP_SECRET_KEY)
    // console.log('I mean to encrypt and descrypt', {data: 'xd'});
    const encrypted = CryptoHelper.encrypt(JSON.stringify({data: 'xd'}));
    console.log(encrypted, 'encrypted');
    // console.log(JSON.parse(CryptoHelper.decrypt(encrypted)), 'decrypted');
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
