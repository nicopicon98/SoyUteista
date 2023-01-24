import { getCourseByTutor } from '@src/services';
import { BringCourseByTutor } from '@src/models';
import { useState } from 'react'

export const useCoursesByIdTutor = () => {

  const [isLoadingCursoByTutor, setIsLoadingCursoByTutor] = useState(false);
  const [cursosByTutor, setCursosByTutor] = useState<BringCourseByTutor[]>([]);

  const onLoadCursoByTutor = async (id_tutor: string) => {
    setIsLoadingCursoByTutor(true);
    const resp = await getCourseByTutor(id_tutor);
    setCursosByTutor(resp.data);
    setIsLoadingCursoByTutor(false);
  }

  return {
    cursosByTutor,
    onLoadCursoByTutor,
    isLoadingCursoByTutor
  }
}
