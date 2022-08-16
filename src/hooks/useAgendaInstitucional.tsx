import { useState, useEffect } from 'react';
import mantenteAlDiaAPI from '../api/mantenteAlDiaAPI';
import { MantenteAlDiaInterface } from '../interfaces/MantenteAlDiaInterface';

export const useAgendaInstitucional = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [agendas, setAgendas] = useState<MantenteAlDiaInterface[]>([]);

  const loadNoticia = async () => {
    try {
      const rep = await mantenteAlDiaAPI.get<MantenteAlDiaInterface[]>('/49/numberposts/12');
      setAgendas(rep.data);
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
    agendas,
    loadNoticia
  }
}