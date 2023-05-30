import {DialogUpdateApp} from '@src/components/custom-dialogs/update';
import {StackNavigator} from '@src/navigator/stack-navigator';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {SnackbarProvider} from '@src/context/snackbar';
import {useSentryGlobalErrors} from '@src/hooks';
import {AuthProvider} from '@src/context/auth';
import {useBootBasicInfo} from '@src/hooks';
import {DialogMaintenance} from '@src/components/custom-dialogs/maintenance';
import {DialogCampaign} from '@src/components/custom-dialogs/campaign';
import { PROD_UTS_WEBSERVICE_API_BASE_URL } from '@env';

const CheckForUpdates = () => {
  const {
    updateDialog,
    campaignDialog,
    maintenanceDialog,
    hideCampaignDialog,
    hideMaintenanceDialog,
    hideUpdateAppDialog,
  } = useBootBasicInfo();

  console.log(PROD_UTS_WEBSERVICE_API_BASE_URL, "env")

  return (
    <>
      <StackNavigator />
      <DialogUpdateApp
        dialogIsOpen={updateDialog.is_open}
        hideDialog={hideUpdateAppDialog}
        msg={updateDialog.msg!}
      />
      <DialogMaintenance
        dialogIsOpen={maintenanceDialog.is_open}
        hideDialog={hideMaintenanceDialog}
        msg={maintenanceDialog.msg!}
      />
      <DialogCampaign
        dialogIsOpen={campaignDialog.is_open}
        hideDialog={hideCampaignDialog}
        msg={campaignDialog.msg!}
      />
    </>
  );
};

export const AppState = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  //le puedo pasar children como un elmento jsx o como muchos
  return <AuthProvider>{children}</AuthProvider>;
};
const App = () => {
  useSentryGlobalErrors();
  return (
    <>
      <NavigationContainer>
        <AppState>
          <PaperProvider>
            <SnackbarProvider>
              <CheckForUpdates />
            </SnackbarProvider>
          </PaperProvider>
        </AppState>
      </NavigationContainer>
    </>
  );
};

export default App;
