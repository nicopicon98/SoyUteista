import { useContext, useState } from 'react'
import { Tutorias } from '@src/services';
import { AuthContext } from '@src/context/auth';
import { useSnackbar } from '@src/context/snackbar';

export const useFetchCourses = () => {
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const { authState: { user } } = useContext(AuthContext)
  const { showMessage } = useSnackbar();
  
  const onLoadCursos = async () => {
    try {
      const resp = await Tutorias.getAllCourses(user!.userMoreInfo?.C_UNID_NOMBRE);
      setIsLoadingCourses(false);
      return resp
    } catch (error) {
      showMessage('En este momento estamos experimentando problemas con el servidor, intentalo mas tarde', 'warning')
    }   
  }

  return {
    isLoadingCourses,
    onLoadCursos,
  }
}
