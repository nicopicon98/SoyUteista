import { useSnackbar } from '@src/context/snackbar';
import { useState, useEffect } from 'react';
import { UTSPosts } from '@src/services';
import { EUTSPostsCategories, IUTSPosts } from '@src/models';

export const useNoticias = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [noticias, setNoticias] = useState<IUTSPosts[]>([]);
  const { showMessage } = useSnackbar();

  const loadNoticia = async () => {
    try {
      const utsPosts = new UTSPosts();
      const resp = await utsPosts.getAll(EUTSPostsCategories.NOTICIAS, 12);
      setNoticias(resp);
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