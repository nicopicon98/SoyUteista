import { Tutorias } from '@src/services';
import { useContext, useState } from 'react'
import { useSnackbar } from '@src/context/snackbar';
import { AuthContext } from '@src/context/auth';

export const useFetchTutores = () => {
  const [isLoadingTutor, setIsLoadingTutor] = useState(false);
  const { authState: { user } } = useContext(AuthContext)
  const { showMessage } = useSnackbar();

  const onLoadTutores = async (franja: string, id_curso: string, day: string, modeTutorial : string = "PRESENCIAL") => {
    try {
      setIsLoadingTutor(true);
      const resp = await Tutorias.getAllTutors(id_curso, day, franja, user!.userMoreInfo.C_UNID_NOMBRE, modeTutorial);
      setIsLoadingTutor(false);
      return resp
    } catch (error) {
      showMessage('En este momento estamos experimentando problemas con el servidor, intentalo mas tarde', 'warning')
    }
  }

  return {
    onLoadTutores,
    isLoadingTutor
  }
}
