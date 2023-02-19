import { API_KEY } from '@src/config/auth';
import { AuthContext } from '@src/context/auth';
import { getDirectorioEscolar } from '@src/services';
import { IDirectorioEscolarResp } from '@src/models';
import { useState, useEffect, useContext } from 'react';
import { useSnackbar } from '@src/context/snackbar';

export const useDirectorioEscolar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [directories, setDirectories] = useState<IDirectorioEscolarResp[]>();
  const { authState: { user } } = useContext(AuthContext);
  const { showMessage } = useSnackbar();

  const getDirectorios = async () => {
    try {
      const directorioPromise = await getDirectorioEscolar(user?.userEmail!, API_KEY);
      setDirectories(directorioPromise.data);
      setIsLoading(false);
    } catch (error) {
      showMessage('En este momento estamos experimentando problemas con el servidor, intentalo mas tarde', 'warning')
    }
  };

  useEffect(() => {
    getDirectorios();
  }, []);

  return {
    directories,
    isLoading
  };
};
