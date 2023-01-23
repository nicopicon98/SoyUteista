import { DirectorioEscolarInterface } from '../models/DirectorioEscolarInterface';
import serviciosAPI from '../api/servicios-academicos.api';
import {useState, useEffect} from 'react';

export const useDirectorioEscolar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState<DirectorioEscolarInterface[]>();

  const getDirectorios = async () => {
    const directorioPromise =
      await serviciosAPI.get<DirectorioEscolarInterface[]>(`/dependencias`);
    setState(directorioPromise.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getDirectorios();
  }, []);

  return {
    state,
    isLoading
  };
};
