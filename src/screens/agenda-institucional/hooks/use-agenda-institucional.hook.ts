import { IUTSPostsCategories } from '@src/models';
import { useState, useEffect } from 'react';
import { getAgendas } from '@src/services';


export const useAgendaInstitucional = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [agendas, setAgendas] = useState<IUTSPostsCategories[]>();

  const loadNoticia = async () => {
    const rep = await getAgendas();
    setAgendas(rep.data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadNoticia();
  }, [])


  return {
    isLoading,
    agendas,
    loadNoticia
  }
}