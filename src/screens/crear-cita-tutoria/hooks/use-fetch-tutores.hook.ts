import { getAllTutors } from '@src/services';
import { useState } from 'react'
import { useSnackbar } from '@src/context/snackbar';

export const useFetchTutores = () => {
  const [isLoadingTutor, setIsLoadingTutor] = useState(false);
  const { showMessage } = useSnackbar();
  const onLoadTutores = async (franja: string, id_curso: string, day: string) => {
    try {
      setIsLoadingTutor(true)
      const rep = await getAllTutors(franja, id_curso, day);
      setIsLoadingTutor(false);
      return rep.data
    } catch (error) {
      showMessage('En este momento estamos experimentando problemas con el servidor, intentalo mas tarde', 'warning')
    }
  }

  return {
    onLoadTutores,
    isLoadingTutor
  }
}
