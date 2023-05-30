import {SimpleDialog} from '@src/components/custom-dialogs/simple';
import {sharingInformationService} from '@src/services/sharing-information.service';
import {useNavigation} from '@react-navigation/native';
import {BajoRendManager} from '@src/services';
import {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';
import {colores} from '@src/theme';

interface Props {
  dialogIsOpen: boolean;
  showDialog: () => void;
  hideDialog: () => void;
}

export const DialogBajoRend = ({
  dialogIsOpen,
  hideDialog,
}: Props) => {
  const {navigate} = useNavigation<any>();

  const buttonOnPressHandler = () => {
    navigate('Tutorias');
    hideDialog();
    BajoRendManager.setFirstTimeAsync();
  };

  const actionButton = (
    <Button
      mode="elevated"
      onPress={buttonOnPressHandler}
      buttonColor={colores.Pantone_383_C}
      textColor={colores.White}
      icon="arrow-right-thin">
      {'   '}Ir a tutorias
    </Button>
  );

  const dialog = (
    <SimpleDialog
      dialogTitle="Hey!"
      dialogContent="Sabemos cuan difícil se pueden tornar las actividades académicas.
    Por eso, hemos abierto un espacio para que puedas mejorar tus notas
    en la sección de de servicios academicos en su modulo de tutorías."
      dialogIsOpen={dialogIsOpen}
      hideDialog={hideDialog}
      buttonsAction={actionButton}
    />
  );

  return dialog;
};
