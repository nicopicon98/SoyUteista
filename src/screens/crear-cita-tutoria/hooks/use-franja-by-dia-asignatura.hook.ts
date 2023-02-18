import { getFranjaByDayAsignatura } from '@src/services';
import { useState } from 'react'
import { useSnackbar } from '@src/context/snackbar';
export const useFranjaByDiaAsignatura = () => {
  const { showMessage } = useSnackbar();
  const [isLoadingFranjaByDiaAsignatura, setisLoadingFranjaByDiaAsignatura] = useState(false);

  const onLoadFranjaByDiaAsignatura = async (id_course: string, day: string) => {
    
    try {
      setisLoadingFranjaByDiaAsignatura(true);
      const resp = await getFranjaByDayAsignatura(id_course, day);
      setisLoadingFranjaByDiaAsignatura(false);
      return resp.data
    } catch (error) {
      showMessage('En este momento estamos experimentando problemas con el servidor, intentalo mas tarde', 'warning')
    }
  }

  return {
    isLoadingFranjaByDiaAsignatura,
    onLoadFranjaByDiaAsignatura,
  }
}
