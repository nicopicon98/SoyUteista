import { Tutorias } from '@src/services';
import { useState, useContext } from 'react'
import { useSnackbar } from '@src/context/snackbar';
import { AuthContext } from '@src/context/auth';

export const useFranjaByDiaAsignatura = () => {
  const { authState: { user } } = useContext(AuthContext)
  const { showMessage } = useSnackbar();
  const [isLoadingFranjaByDiaAsignatura, setisLoadingFranjaByDiaAsignatura] = useState(false);

  const onLoadFranjaByDiaAsignatura = async (id_course: string, day: string) => {

    try {
      setisLoadingFranjaByDiaAsignatura(true);
      const resp = await Tutorias.getFranjaByDayAsignatura(id_course, day, user!.userMoreInfo?.C_UNID_NOMBRE);
      setisLoadingFranjaByDiaAsignatura(false);
      return resp
    } catch (error) {
      showMessage('En este momento estamos experimentando problemas con el servidor, intentalo mas tarde', 'warning')
    }
  }

  return {
    isLoadingFranjaByDiaAsignatura,
    onLoadFranjaByDiaAsignatura,
  }
}
