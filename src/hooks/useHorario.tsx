import { MateriaInterface } from '../models/HorarioInterface';
import { getHorario } from '../services/horario.service';
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext';

export const useHorario = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [materias, setMaterias] = useState<MateriaInterface[] | null>([]);

  const { authState: { user } } = useContext(AuthContext);
  const API_KEY = "JSPHPWORKS4everandever!";

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
