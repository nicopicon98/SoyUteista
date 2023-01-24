import { MateriaInterface } from '../models/horario.model';
import { getHorario } from '../services/horario.service';
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/auth.component';
import { API_KEY } from '../config/auth';

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
      setMaterias(null)
      setIsLoading(false)
      console.log("there was an error");
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
