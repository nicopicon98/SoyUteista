import { useState, useEffect, useContext } from 'react'
import { MateriaInterface } from '../models';
import { API_KEY } from '@src/config/auth';
import { AuthContext } from '@src/context/auth';
import { getHorario } from '@src/services';
import { useSnackbar } from '@src/context/snackbar';

export const useHorario = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [materias, setMaterias] = useState<MateriaInterface[] | null>([]);
  const { authState: { user } } = useContext(AuthContext);
  const { showMessage } = useSnackbar();

  const loadMateria = async () => {
    try {
      const rep = await getHorario(user!.userEmail, API_KEY)
      setMaterias(rep.data.data.MATERIAS);
      setIsLoading(false);
    } catch (error) {
      setMaterias(null);
      showMessage('En este momento estamos experimentando problemas con el servidor, intentalo mas tarde', 'warning')
    }
  }

  //Disparamos la peticion http
  useEffect(() => {
    loadMateria();
  }, [])

  return {
    isLoading,
    materias
  }
}
