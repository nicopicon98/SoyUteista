import { API_KEY } from '@src/config/auth';
import { AuthContext } from '@src/context';
import { getServiciosAcademicos } from '@src/services';
import { useEffect, useState, useContext } from 'react';
import { ConvocatoriasResp } from '../models';

export const useConvocatorias = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [convocatorias, setConvocatorias] = useState<ConvocatoriasResp[]>();
  const { authState: { user } } = useContext(AuthContext);
  const getConvocatorias = async () => {
    const resp = await getServiciosAcademicos(user?.userEmail!, API_KEY);
    setConvocatorias(resp.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getConvocatorias();
  }, []);

  return {
    isLoading,
    convocatorias,
  };
};
