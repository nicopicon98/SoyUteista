import { getAllTutors } from '@src/services';
import { useState } from 'react'


export const useFetchTutores = () => {
  const [isLoadingTutor, setIsLoadingTutor] = useState(false);

  const onLoadTutores = async (franja: string, id_curso: string, day: string) => {
    setIsLoadingTutor(true)
    const rep = await getAllTutors(franja,id_curso,day);
    setIsLoadingTutor(false);
    return rep.data
  }

  return {
    onLoadTutores,
    isLoadingTutor
  }
}
