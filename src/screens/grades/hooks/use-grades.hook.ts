import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '@src/context/auth';
import { API_KEY } from '@src/config/auth';
import { NotasEstudiante } from '@src/services';
import { IMaterias } from '@src/models';
import { useSnackbar } from '@src/context/snackbar';

export const useGrades = () => {
  const [notasEstudiante, setNotasEstudiante] = useState<IMaterias[]>();
  const [isLoading, setIsLoading] = useState(true);
  const { authState: { user } } = useContext(AuthContext);
  const { showMessage } = useSnackbar();
  const loadInfoEstudiante = async () => {
   
    try {
      const rep = await NotasEstudiante.getAll(user!.userEmail)
      setNotasEstudiante(rep.data);
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
