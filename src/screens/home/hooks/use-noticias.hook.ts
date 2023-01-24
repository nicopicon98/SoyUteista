import { UTSPostsCategories } from '../../../models';
import { useState, useEffect } from 'react';
import { getNoticias } from '../../../services';

export const useNoticias = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [noticias, setNoticias] = useState<UTSPostsCategories[]>([]);

  const loadNoticia = async () => {
    try {
      const rep = await getNoticias();
      setNoticias(rep.data);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
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