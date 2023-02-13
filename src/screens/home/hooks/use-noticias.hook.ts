import { UTSPostsCategories } from '@src/models';
import { useState, useEffect } from 'react';
import { getNoticias } from '@src/services';

export const useNoticias = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [noticias, setNoticias] = useState<UTSPostsCategories[]>([]);

  const loadNoticia = async () => {
    const rep = await getNoticias();
    setNoticias(rep.data);
    setIsLoading(false);
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