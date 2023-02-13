import { SimpleDialog } from "@src/components/simple-dialog/simple-dialog.component";
import { sharingInformationService } from "@src/services/sharing-information.service";
import { useNavigation } from '@react-navigation/native';
import { BajoRendManager } from "@src/services";
import { useEffect, useState } from "react";
import { Button } from 'react-native-paper';
import { colores } from "@src/theme";

export const ModalBajoRend = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const showDialog = () => setDialogIsOpen(true);
  const hideDialog = async () => {
    setDialogIsOpen(false);
    BajoRendManager.setFirstTimeAsync();
  };

  const subscription$ = sharingInformationService.getSubject();
  const { navigate } = useNavigation<any>();

  useEffect(() => {
    subscription$.subscribe(data => { //data by default is true
      if (data) return showDialog()
      hideDialog();
    });
  }, [])

  const buttonOnPressHandler = () => {
    navigate("Tutorias");
    hideDialog();
    BajoRendManager.setFirstTimeAsync();
  }


  const actionButton = <Button
    mode='elevated'
    onPress={buttonOnPressHandler}
    buttonColor={colores.Pantone_383_C}
    textColor={colores.White}
    icon="arrow-right-thin"
  >
    {"   "}Ir a tutorias
  </Button>

  const dialog = <SimpleDialog
    dialogTitle='Hey!'
    dialogContent='Sabemos cuan dificil se pueden tornar las actividades academicas.
    Por eso, hemos abierto un espacio para que puedas mejorar tus notas
    en la seccion de tutorias.'
    dialogIsOpen={dialogIsOpen}
    hideDialog={hideDialog}
    buttonsAction={actionButton}
  />

  return dialog
}