import { SimpleDialog } from '@src/components/custom-dialogs/simple';
import { Button } from 'react-native-paper';
import { colores } from '@src/theme';
import { Dimensions, Linking } from 'react-native';

interface Props {
  dialogIsOpen: boolean;
  msg: string;
  hideDialog: () => void;
}

const { width } = Dimensions.get('window');

export const DialogUpdateApp = ({
  dialogIsOpen,
  hideDialog,
  msg = '',
}: Props) => {
  const buttonOnPressHandler = () => {
    // Replace '<your_app_id>' with your actual app id
    const playStoreUrl = 'market://details?id=com.soyuteista';
    const webStoreUrl = 'https://play.google.com/store/apps/details?id=com.soyuteista';

    Linking.canOpenURL(playStoreUrl)
      .then((supported) => {
        if (!supported) {
          return Linking.openURL(webStoreUrl);
        } else {
          return Linking.openURL(playStoreUrl);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  const actionButton = (
    <Button
      mode="elevated"
      onPress={buttonOnPressHandler}
      buttonColor={colores.Pantone_383_C}
      textColor='white'
      icon="arrow-right-thin">
      {'   '}Actualizar
    </Button>
  );

  const dialog = (
    <SimpleDialog
      dialogTitle="Hey!"
      dialogContent={msg}
      dialogIsOpen={dialogIsOpen}
      hideDialog={hideDialog}
      buttonsAction={actionButton}
      topImg={require('@src/resources/Images/update_app.png')}
      height={width * 0.6}
      width={width * 0.85}
    />
  );

  return dialog;
};
