import { useEffect, useState, useContext } from 'react';
import { ServiciosAcademicos } from '@src/services';
import { useSnackbar } from '@src/context/snackbar';
import { AuthContext } from '@src/context/auth';
import { IConvocatoriasResp } from '../models';
import { API_KEY } from '@src/config/auth';

export const useConvocatorias = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [convocatorias, setConvocatorias] = useState<IConvocatoriasResp[]>([]);
  const { authState: { user } } = useContext(AuthContext);

  const { showMessage } = useSnackbar();

  const getConvocatorias = async () => {
    try {
      const resp = await ServiciosAcademicos.getAll(user?.userEmail!);
      setConvocatorias(resp);
      setIsLoading(false);
    } catch (error) {
      showMessage('En este momento estamos experimentando problemas con el servidor, intentalo mas tarde', 'warning')
    }
  };

  useEffect(() => {
    getConvocatorias();
  }, []);

  return {
    isLoading,
    convocatorias,
    getConvocatorias
  };
};
