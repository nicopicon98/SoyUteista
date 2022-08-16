import { useState, useEffect } from 'react';
import mantenteAlDiaAPI from '../api/mantenteAlDiaAPI';
import { MantenteAlDiaInterface } from '../interfaces/MantenteAlDiaInterface';

export const useMantenteAlDia = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [noticias, setNoticias] = useState<MantenteAlDiaInterface[]>([]);

  const loadNoticia = async () => {
    try {
      const rep = await mantenteAlDiaAPI.get<MantenteAlDiaInterface[]>('/2/numberposts/12');
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