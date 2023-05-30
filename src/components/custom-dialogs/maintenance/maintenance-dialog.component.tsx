import {SimpleDialog} from '@src/components/custom-dialogs/simple';
import {Dimensions} from 'react-native';

interface Props {
  dialogIsOpen: boolean;
  msg: string;
  hideDialog: () => void;
}
const {width} = Dimensions.get('window');
export const DialogMaintenance = ({
  dialogIsOpen,
  hideDialog,
  msg = '',
}: Props) => {
  return (
    <SimpleDialog
      dialogTitle="Lo sentimos..."
      dialogContent={msg}
      dialogIsOpen={dialogIsOpen}
      hideDialog={hideDialog}
      topImg={require('@resources/Images/maintenance.png')}
      height={width * 0.7}
      width={width * 1}
    />
  );
};
