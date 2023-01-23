import { useState, useEffect, useContext } from 'react'

import tutoriasAPI from '../api/tutorias.api';
import { TutoriasBringTutorInterface } from '../models/TutoriasBringTutorInterface';


export const useBringTutor = () => {
  const [isLoadingTutor, setIsLoadingTutor] = useState(false);
  const [tutores, setTutores] = useState<TutoriasBringTutorInterface[]>();

  const loadTutores = async (tipo_listado: string) => {
    setIsLoadingTutor(true)
    const rep = await tutoriasAPI.get<TutoriasBringTutorInterface[]>(`/load_tutor.php?tipo_listado=${tipo_listado}&sede=SEDE PRINCIPAL`);
    console.log(rep.data);
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
