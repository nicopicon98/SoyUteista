import { UTSPostsCategories } from '../../../models';
import { getAgendas } from '../../../services';
import { useState, useEffect } from 'react';


export const useAgendaInstitucional = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [agendas, setAgendas] = useState<UTSPostsCategories[]>();

  const loadNoticia = async () => {
    try {
      const rep = await getAgendas();
      setAgendas(rep.data);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
    }
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