import { useState, useEffect } from 'react';

import { RevistaInterface } from '../models/RevistaInterface';
import revistaApi from '../api/revista.api';

export const useRevista = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [revistas, setRevistas] = useState<RevistaInterface[]>([]);

  const loadRevista = async () => {
    const rep = await revistaApi.get<RevistaInterface[]>('/getNewsletter.php');
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