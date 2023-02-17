import { API_KEY } from '@src/config/auth';
import { AuthContext } from '@src/context/auth';
import { getDirectorioEscolar } from '@src/services';
import { DirectorioEscolar } from '@src/models';
import { useState, useEffect, useContext } from 'react';

export const useDirectorioEscolar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [directories, setDirectories] = useState<DirectorioEscolar[]>();
  const { authState: { user } } = useContext(AuthContext);

  const getDirectorios = async () => {
    const directorioPromise = await getDirectorioEscolar(user?.userEmail!, API_KEY);
    setDirectories(directorioPromise.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getDirectorios();
  }, []);

  return {
    directories,
    isLoading
  };
};
