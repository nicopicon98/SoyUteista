import { useState, useEffect } from 'react';
import { getRevista } from '../../../services';
import { RevistaResp } from '../../../models';

export const useRevista = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [revistas, setRevistas] = useState<RevistaResp[]>([]);

  const loadRevista = async () => {
    const rep = await getRevista();
    setRevistas(rep.data);
    setIsLoading(false);
  }

  //Disparamos la peticion http
  useEffect(() => {
    loadRevista();
  }, [])


  return {
    isLoading,
    revistas,
    loadRevista
  }
}