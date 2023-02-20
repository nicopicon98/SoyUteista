import { useState, useEffect, useContext } from 'react'
import { useSnackbar } from '@src/context/snackbar';
import { HorarioEstudiante } from '@src/services';
import { AuthContext } from '@src/context/auth';
import { IMateriaHorario } from '../models';
import { API_KEY } from '@src/config/auth';

export const useHorario = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [materias, setMaterias] = useState<IMateriaHorario[] | null>([]);
  const { authState: { user } } = useContext(AuthContext);
  const { showMessage } = useSnackbar();

  const loadMateria = async () => {
    try {
      const rep = await HorarioEstudiante.getHorario(user!.userEmail)
      setMaterias(rep.data.MATERIAS);
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
