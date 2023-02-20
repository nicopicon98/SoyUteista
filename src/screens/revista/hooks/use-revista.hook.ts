import { useState, useEffect } from 'react';
import { Revista } from '@src/services';
import { IRevistaResp } from '@src/models';
import { useSnackbar } from '@src/context/snackbar';

export const useRevista = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [revistas, setRevistas] = useState<IRevistaResp[]>([]);
  const { showMessage } = useSnackbar();
  const loadRevista = async () => {
    try {
      const resp = await Revista.getAll();
      setRevistas(resp);
      setIsLoading(false);
    } catch (error) {
      showMessage('En este momento estamos experimentando problemas con el servidor, intentalo mas tarde', 'warning')
    }  
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