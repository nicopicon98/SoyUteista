import { getServiciosAcademicos } from '../../../services';
import { useEffect, useState } from 'react';
import { ConvocatoriasResp } from '../models';

export const useConvocatorias = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [convocatorias, setConvocatorias] = useState<ConvocatoriasResp[]>();

  const getConvocatorias = async () => {
    const resp = await getServiciosAcademicos();
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
