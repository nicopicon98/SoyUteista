import { useState, useEffect } from 'react';
import { getRevista } from '@src/services';
import { RevistaResp } from '@src/models';
import { useSnackbar } from '@src/context/snackbar';

export const useRevista = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [revistas, setRevistas] = useState<RevistaResp[]>([]);
  const { showMessage } = useSnackbar();
  const loadRevista = async () => {
    try {
      const rep = await getRevista();
      setRevistas(rep.data);
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