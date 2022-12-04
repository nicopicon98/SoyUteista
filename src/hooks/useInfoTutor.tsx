import React, { useState } from 'react'

import tutoriasAPI from '../api/tutoriasAPI';
import { TutoriasFranjaByDiaAsignaturaInterface } from '../interfaces/TutoriasFranjaByDiaAsignaturaInterface';
import { TutoriasInfoTutorInterface } from '../interfaces/TutoriasInfoTutorInterface';

export const useInfoTutor = () => {

  const [isLoadingInfoTutor, setisLoadingInfoTutor] = useState(true);
  const [infoTutor, setInfoTutor] = useState<TutoriasInfoTutorInterface>()

  const onLoadInfoTutor = async (id_asignatura: string, dia: string, franja: string) => {
    const rep = await tutoriasAPI.get<TutoriasInfoTutorInterface[]>(`/buscar_info_tutor.php?id_asignatura=${id_asignatura}&dia=${dia}&franja=${franja}`);
    setInfoTutor(rep.data[0])
    setisLoadingInfoTutor(false);
  }

  return {
    infoTutor,
    isLoadingInfoTutor,
    onLoadInfoTutor,
  }
}
