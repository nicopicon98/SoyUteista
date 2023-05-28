import {SimpleDialog} from '@src/components/custom-dialogs/simple';

interface Props {
  dialogIsOpen: boolean;
  msg: string;
  hideDialog: () => void;
}

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
    />
  );
};
