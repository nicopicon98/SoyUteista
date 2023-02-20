import { Tutorias } from '@src/services';
import { ITutorInfoResp } from '@src/models'
import { useContext, useState } from 'react'
import { useSnackbar } from '@src/context/snackbar';
import { AuthContext } from '@src/context/auth';

export const useTutorInfo = () => {
  const [isLoadingInfoTutor, setisLoadingInfoTutor] = useState(true);
  const { showMessage } = useSnackbar();
  const { authState: { user } } = useContext(AuthContext);

  const onLoadInfoTutor =
    async (id_course: string, day: string, franja: string, id_tutor: string) => {
      try {
        const resp = await Tutorias.getInfoTutor(id_course, day, franja, id_tutor, user!.userMoreInfo?.C_UNID_NOMBRE)
        setisLoadingInfoTutor(false);
        return resp[0]
      } catch (error) {
        showMessage('En este momento estamos experimentando problemas con el servidor, intentalo mas tarde', 'warning')
      }
    }

  return {
    isLoadingInfoTutor,
    onLoadInfoTutor,
  }
}
