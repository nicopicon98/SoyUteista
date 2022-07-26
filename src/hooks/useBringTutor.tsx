import { useState, useEffect, useContext } from 'react'

import tutoriasAPI from '../api/tutoriasAPI';
import { TutoriasBringTutorInterface } from '../interfaces/TutoriasBringTutorInterface';


export const useBringTutor = () => {
  const [isLoadingTutor, setIsLoadingTutor] = useState(true);
  const [tutores, setTutores] = useState<TutoriasBringTutorInterface[]>();

  const loadTutores = async (tipo_listado: string) => {
    const rep = await tutoriasAPI.get<TutoriasBringTutorInterface[]>(`/load_tutor.php?tipo_listado=${tipo_listado}`);
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
