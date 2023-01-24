import { useState } from 'react'
import { BringCourseByTutor } from '../models';
import { getCourseByTutor } from '../services';

export const useCoursesByIdTutor = () => {

  const [isLoadingCursoByTutor, setIsLoadingCursoByTutor] = useState(false);
  const [cursosByTutor, setCursosByTutor] = useState<BringCourseByTutor[]>([]);

  const onLoadCursoByTutor = async (id_tutor: string) => {
    setIsLoadingCursoByTutor(true);
    const resp = await getCourseByTutor(id_tutor);
    setCursosByTutor(resp.data)
    setIsLoadingCursoByTutor(false);
  }

  return {
    cursosByTutor,
    onLoadCursoByTutor,
    isLoadingCursoByTutor
  }
}
