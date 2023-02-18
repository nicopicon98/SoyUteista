import { getDaysByAsignatura } from '@src/services';
import { useState } from 'react'
import { useSnackbar } from '@src/context/snackbar';

export const useDayByAsignatura = () => {

  const [isLoadingDaysByAsignatura, setIsLoadingDaysByAsignatura] = useState(false)
  const { showMessage } = useSnackbar();

  const onLoadDayByAsignatura = async (id_course: string) => {
    try {
      setIsLoadingDaysByAsignatura(true);
      const rep = await getDaysByAsignatura(id_course)
      setIsLoadingDaysByAsignatura(false);
      return rep.data
    } catch (error) {
      showMessage('En este momento estamos experimentando problemas con el servidor, intentalo mas tarde', 'warning')
    }
  }

  return {
    isLoadingDaysByAsignatura,
    onLoadDayByAsignatura,
  }
}
