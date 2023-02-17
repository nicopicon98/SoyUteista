import { getInfoTutor } from '@src/services';
import { ITutorInfoResp } from '@src/models'
import { useState } from 'react'
import { useSnackbar } from '@src/context/snackbar';

export const useTutorInfo = () => {
  const [isLoadingInfoTutor, setisLoadingInfoTutor] = useState(true);
  const { showMessage } = useSnackbar();

  const onLoadInfoTutor =
    async (id_course: string, day: string, franja: string, id_tutor: string) => {
      try {
        const rep = await getInfoTutor(id_course, day, franja, id_tutor)
        setisLoadingInfoTutor(false);
        return rep.data[0]
      } catch (error) {
        showMessage('En este momento estamos experimentando problemas con el servidor, intentalo mas tarde', 'warning')
      }

    }

  return {
    isLoadingInfoTutor,
    onLoadInfoTutor,
  }
}
