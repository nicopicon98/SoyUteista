import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '@src/context';
import { API_KEY } from '@src/config/auth';
import { getNotas } from '@src/services';
import { Materias } from '@src/models';

export const useGrades = () => {
  const [notasEstudiante, setNotasEstudiante] = useState<Materias[]>();
  const [isLoading, setIsLoading] = useState(true);
  const { authState: { user } } = useContext(AuthContext);

  const loadInfoEstudiante = async () => {
    try {
      const rep = await getNotas(user!.userEmail, API_KEY)
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
