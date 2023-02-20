import { DirectorioEscolarManager } from '@src/services';
import { useState, useEffect, useContext } from 'react';
import { IDirectorioEscolarResp } from '@src/models';
import { useSnackbar } from '@src/context/snackbar';
import { AuthContext } from '@src/context/auth';

export const useDirectorioEscolar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [directories, setDirectories] = useState<IDirectorioEscolarResp[]>();
  const { authState: { user } } = useContext(AuthContext);
  const { showMessage } = useSnackbar();

  const getDirectorios = async () => {
    try {
      const directorioPromise = await DirectorioEscolarManager.getAll(user?.userEmail!);
      setDirectories(directorioPromise);
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
