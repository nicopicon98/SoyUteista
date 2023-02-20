import { EUTSPostsCategories, IUTSPosts } from '@src/models';
import { useState, useEffect } from 'react';
import { UTSPosts } from '@src/services';


export const useAgendaInstitucional = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [agendas, setAgendas] = useState<IUTSPosts[]>([]);

  const loadNoticia = async () => {
    const utsPosts = new UTSPosts();
    const resp = await utsPosts.getAll(EUTSPostsCategories.AGENDA, 12);
    setAgendas(resp);
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