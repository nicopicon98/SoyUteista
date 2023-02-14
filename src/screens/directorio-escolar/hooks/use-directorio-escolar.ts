import { API_KEY } from '@src/config/auth';
import { AuthContext } from '@src/context/auth';
import { getDirectorioEscolar } from '@src/services';
import { DirectorioEscolar } from '@src/models';
import { useState, useEffect, useContext } from 'react';

export const useDirectorioEscolar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState<DirectorioEscolar[]>();

  const getDirectorios = async () => {
    const { authState: { user } } = useContext(AuthContext);
    const directorioPromise = await getDirectorioEscolar(user?.userEmail!, API_KEY);
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
