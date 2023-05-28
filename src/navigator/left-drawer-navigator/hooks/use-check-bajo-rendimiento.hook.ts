import {useEffect, useState, useCallback, useContext} from 'react';
import {BajoRendManager} from '@src/services';
import {IUser} from '@src/models';
import {AuthContext} from '@src/context/auth';

export const useCheckBajoRendimiento = () => {
  const {
    authState: {user},
  } = useContext(AuthContext);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const showDialog = () => setDialogIsOpen(true);
  const hideDialog = () => setDialogIsOpen(false);

  const bajoRendimientoChecker = useCallback(async () => {
    const token = await BajoRendManager.getFirstTimeAsync();
    if (!token) {
      if (user!.userMoreInfo.C_ESTP_PROMEDIOGENERAL > 3.5) {
        setDialogIsOpen(true);
      }
      return;
    }
  }, [user]); // re-run the function creation when `user` changes

  useEffect(() => {
    bajoRendimientoChecker();
  }, [bajoRendimientoChecker]); // re-run the effect when `bajoRendimientoChecker` changes

  return {
    dialogIsOpen,
    showDialog,
    hideDialog,
  };
};
