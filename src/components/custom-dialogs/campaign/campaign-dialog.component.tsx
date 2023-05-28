import {SimpleDialog} from '@src/components/custom-dialogs/simple';
import {Button} from 'react-native-paper';
import {colores} from '@src/theme';

interface Props {
  dialogIsOpen: boolean;
  msg: string;
  hideDialog: () => void;
}

export const DialogCampaign = ({dialogIsOpen, hideDialog, msg = ''}: Props) => {
  const buttonOnPressHandler = () => {
    console.log('click');
  };

  const actionButton = (
    <Button
      mode="elevated"
      onPress={buttonOnPressHandler}
      buttonColor={colores.Pantone_383_C}
      textColor={colores.White}
      icon="arrow-right-thin">
      {'   '}Vamos!
    </Button>
  );

  const dialog = (
    <SimpleDialog
      dialogTitle="Hey, estudiante Uteista!"
      dialogContent={msg}
      dialogIsOpen={dialogIsOpen}
      hideDialog={hideDialog}
      buttonsAction={actionButton}
    />
  );

  return dialog;
};
