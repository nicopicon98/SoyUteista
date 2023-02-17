import { API_KEY } from '@src/config/auth';
import { AuthContext } from '@src/context/auth';
import { useSnackbar } from '@src/context/snackbar';
import { getServiciosAcademicos } from '@src/services';
import { useEffect, useState, useContext } from 'react';
import { ConvocatoriasResp } from '../models';

export const useConvocatorias = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [convocatorias, setConvocatorias] = useState<ConvocatoriasResp[]>([]);
  const { authState: { user } } = useContext(AuthContext);

  const {showMessage} = useSnackbar();

  const getConvocatorias = async () => {
    try {
      const resp = await getServiciosAcademicos(user?.userEmail!, API_KEY);
      setConvocatorias(resp.data);
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
