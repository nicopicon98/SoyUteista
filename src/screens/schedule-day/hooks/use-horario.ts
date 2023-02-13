import { useState, useEffect, useContext } from 'react'
import { MateriaInterface } from '../models';
import { API_KEY } from '@src/config/auth';
import { AuthContext } from '@src/context/auth';
import { getHorario } from '@src/services';

export const useHorario = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [materias, setMaterias] = useState<MateriaInterface[] | null>([]);
  const { authState: { user } } = useContext(AuthContext);

  const loadMateria = async () => {
    try {
      const rep = await getHorario(user!.userEmail, API_KEY)
      setMaterias(rep.data.data.MATERIAS);
      setIsLoading(false);
    } catch (error) {
      setMaterias(null);
      setIsLoading(false);
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
