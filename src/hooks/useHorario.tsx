import { useState, useEffect, useContext } from 'react'

import horarioAPI from '../api/horarioAPI';
import { HorarioInterface, MateriaInterface } from '../interfaces/HorarioInterface';
import { AuthContext } from '../context/AuthContext';

export const useHorario = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [materias, setMaterias] = useState<MateriaInterface[] | null>([]);

  const { authState: { user } } = useContext(AuthContext);
  const API_KEY = "JSPHPWORKS4everandever!";

  const loadMateria = async () => {
    try {
      const repDefinite = await horarioAPI.get<HorarioInterface>(`/schedule/?email=${user!.userEmail}&key=${API_KEY}`);
      setMaterias(repDefinite.data.data.MATERIAS);
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
