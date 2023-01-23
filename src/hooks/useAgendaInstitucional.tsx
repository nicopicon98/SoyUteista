import { useState, useEffect } from 'react';
import { UTSPostsCategorias } from '../models/UTSPostsCategorias';
import { getAgendas } from '../services';

export const useAgendaInstitucional = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [agendas, setAgendas] = useState<UTSPostsCategorias[]>([]);

  const loadNoticia = async () => {
    try {
      const rep = await getAgendas();
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