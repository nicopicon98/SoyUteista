import { Carnet } from '../models/carnet.model';
import { replaceNull } from '../utilities';
import { API_KEY } from '../config/auth';
import { getCarnet } from '../services';
import { useState } from 'react';

export const useCarnet = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [infoEstudiante, setInfoEstudiante] = useState<Carnet | null>();
  const [error, setError] = useState<string>();

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
