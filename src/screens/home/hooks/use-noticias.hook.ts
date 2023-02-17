import { UTSPostsCategories } from '@src/models';
import { useState, useEffect } from 'react';
import { getNoticias } from '@src/services';
import { useSnackbar } from '@src/context/snackbar';

export const useNoticias = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [noticias, setNoticias] = useState<UTSPostsCategories[]>([]);
  const { showMessage } = useSnackbar();
  const loadNoticia = async () => {

    try {
      const rep = await getNoticias();
      setNoticias(rep.data);
      setIsLoading(false);
    } catch (error) {
      showMessage('En este momento estamos experimentando problemas con el servidor, intentalo mas tarde', 'warning')
    }
  }

  //Disparamos la peticion http
  useEffect(() => {
    loadNoticia();
  }, [])


  return {
    isLoading,
    noticias,
    loadNoticia
  }
}