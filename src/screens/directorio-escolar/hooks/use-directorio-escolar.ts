import { getDirectorioEscolar } from '@src/services';
import { DirectorioEscolar } from '@src/models';
import { useState, useEffect } from 'react';

export const useDirectorioEscolar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState<DirectorioEscolar[]>();

  const getDirectorios = async () => {
    const directorioPromise = await getDirectorioEscolar();
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
