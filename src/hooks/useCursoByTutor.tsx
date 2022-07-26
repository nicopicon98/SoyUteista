import React, { useState } from 'react'

import tutoriasAPI from '../api/tutoriasAPI';
import { TutoriasBringCursoByTutorInterface } from '../interfaces/TutoriasBringCursoByTutorInterface';

export const useCursoByTutor = () => {

  const [isLoadingCursoByTutor, setIsLoadingCursoByTutor] = useState(true);
  const [cursosByTutor, setCursosByTutor] = useState<TutoriasBringCursoByTutorInterface[]>();

  const onLoadCursoByTutor = async (id_tutor: string) => {
    const rep = await tutoriasAPI.get<TutoriasBringCursoByTutorInterface[]>(`/load_curso_tutor.php?id_tutor=${id_tutor}`);
    setIsLoadingCursoByTutor(false);
    setCursosByTutor(rep.data)
    console.log(rep.data);
  }

  return {
    cursosByTutor,
    onLoadCursoByTutor,
    isLoadingCursoByTutor
  }
}
