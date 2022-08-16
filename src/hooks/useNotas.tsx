import { useState, useEffect, useContext } from 'react'


import notasAPI from '../api/notasAPI';
import { AuthContext } from '../context/AuthContext';
import { Materias, NotasInterface } from '../interfaces/NotasInterface';

export const useNotas = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [notasEstudiante, setNotasEstudiante] = useState<Materias[]>();

  const { authState: { user } } = useContext(AuthContext);
  const API_KEY = "JSPHPWORKS4everandever!";

  const loadInfoEstudiante = async () => {
    try {
      const rep = await notasAPI.get<NotasInterface>(`/qualification/?email=${user!.userEmail}&key=${API_KEY}`);
      setNotasEstudiante(rep.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
