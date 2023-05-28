import {useSnackbar} from '@src/context/snackbar';
import {AuthContext} from '@src/context/auth';
import {useContext, useState} from 'react';
import {Tutorias} from '@src/services';

export const useDayByAsignatura = () => {
  const [isLoadingDaysByAsignatura, setIsLoadingDaysByAsignatura] =
    useState(false);
  const {
    authState: {user},
  } = useContext(AuthContext);
  const {showMessage} = useSnackbar();

  const onLoadDayByAsignatura = async (
    id_course: string,
    modeTutorial: string = "PRESENCIAL",
  ) => {
    try {
      setIsLoadingDaysByAsignatura(true);
      const rep = await Tutorias.getDaysByAsignatura(
        id_course,
        user!.userMoreInfo?.C_UNID_NOMBRE,
        modeTutorial,
      );
      setIsLoadingDaysByAsignatura(false);
      return rep;
    } catch (error) {
      showMessage(
        'En este momento estamos experimentando problemas con el servidor, intentalo mas tarde',
        'warning',
      );
    }
  };

  return {
    isLoadingDaysByAsignatura,
    onLoadDayByAsignatura,
  };
};
