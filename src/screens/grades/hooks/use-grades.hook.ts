import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '@src/context/auth';
import { API_KEY } from '@src/config/auth';
import { getNotas } from '@src/services';
import { Materias } from '@src/models';
import { useSnackbar } from '@src/context/snackbar';

export const useGrades = () => {
  const [notasEstudiante, setNotasEstudiante] = useState<Materias[]>();
  const [isLoading, setIsLoading] = useState(true);
  const { authState: { user } } = useContext(AuthContext);
  const { showMessage } = useSnackbar();
  const loadInfoEstudiante = async () => {
   
    try {
      const rep = await getNotas(user!.userEmail, API_KEY)
      setNotasEstudiante(rep.data.data);
      setIsLoading(false);
    } catch (error) {
      showMessage('En este momento estamos experimentando problemas con el servidor, intentalo mas tarde', 'warning')
    }  
  }

  //Disparamos la peticion http
  useEffect(() => {
    loadInfoEstudiante();
  }, [])

  return {
    isLoading,
    notasEstudiante,
    loadInfoEstudiante,
    setIsLoading
  }
}
