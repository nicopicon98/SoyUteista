import React, { useState } from 'react'

import tutoriasAPI from '../api/tutoriasAPI';
import { TutoriasBringCursoByTutorInterface } from '../interfaces/TutoriasBringCursoByTutorInterface';

export const useCursoByTutor = () => {

  const [isLoadingCursoByTutor, setIsLoadingCursoByTutor] = useState(false);
  const [cursosByTutor, setCursosByTutor] = useState<TutoriasBringCursoByTutorInterface[]>([]);

  const onLoadCursoByTutor = async (id_tutor: string) => {
    setIsLoadingCursoByTutor(true);
    const { data } = await tutoriasAPI.get<TutoriasBringCursoByTutorInterface[]>(`/load_curso_tutor.php?id_tutor=${id_tutor}`);
    setCursosByTutor(data)
    setIsLoadingCursoByTutor(false);
  }

  return {
    cursosByTutor,
    onLoadCursoByTutor,
    isLoadingCursoByTutor
  }
}
