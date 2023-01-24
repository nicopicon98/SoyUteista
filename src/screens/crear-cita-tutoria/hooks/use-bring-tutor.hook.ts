import { getAllTutors } from '@src/services';
import { TutorResp } from '@src/models';
import { useState } from 'react'


export const useBringTutor = () => {
  const [isLoadingTutor, setIsLoadingTutor] = useState(false);
  const [tutores, setTutores] = useState<TutorResp[]>();

  const loadTutores = async (tipo_listado: string) => {
    setIsLoadingTutor(true)
    const rep = await getAllTutors(tipo_listado);
    setTutores(rep.data)
    setIsLoadingTutor(false);
  }

  return {
    isLoadingTutor,
    setIsLoadingTutor,
    tutores,
    loadTutores
  }
}
