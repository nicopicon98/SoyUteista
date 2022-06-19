import { useState, useEffect } from 'react';
import mantenteAlDiaAPI from '../api/mantenteAlDiaAPI';
import { NoticiaInterface, mantenteAlDiaInterface } from '../interfaces/mantenteAlDiaInterface';

export const useMantenteAlDia = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [noticias, setNoticias] = useState<NoticiaInterface[]>([]);

  const loadNoticia = async () => {
    const rep = await mantenteAlDiaAPI.get<mantenteAlDiaInterface>('/getNews.php');
    setNoticias(rep.data.noticias);
    setIsLoading(false);
  }

  //Disparamos la peticion http
  useEffect(() => {
    loadNoticia();
  }, [])


  return {
    isLoading,
    noticias
  }
}