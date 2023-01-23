import { useState } from 'react'
import { Carnet } from '../models/CarnetInterface';
import { replaceNull } from '../helpers/functions';
import { getCarnet } from '../services';

export const useCarnet = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [infoEstudiante, setInfoEstudiante] = useState<Carnet | null>();
  const [error, setError] = useState<string>("");

  const API_KEY = "JSPHPWORKS4everandever!";

  //Validar si estudiante o no
  const loadInfoEstudiante = async (email: string) => {
    const rep = await getCarnet(email, API_KEY);
    if(rep.data.result !== 1) {
      setError(rep.data.error);
      setInfoEstudiante(null);
      setIsLoading(false);
      return;
    }
    setInfoEstudiante(replaceNull(rep.data.data));
    setIsLoading(false);
  }

  return {
    isLoading,
    infoEstudiante,
    loadInfoEstudiante,
    error
  }
}
