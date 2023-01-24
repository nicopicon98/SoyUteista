import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../../context';
import { API_KEY } from '../../../config/auth';
import { getNotas } from '../../../services';
import { Materias } from '../../../models';

export const useGrades = () => {
  const [notasEstudiante, setNotasEstudiante] = useState<Materias[]>();
  const [isLoading, setIsLoading] = useState(true);
  const { authState: { user } } = useContext(AuthContext);

  const loadInfoEstudiante = async () => {
    try {
      const rep = await getNotas(user!.userEmail, API_KEY )
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
