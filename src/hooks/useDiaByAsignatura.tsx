import React, { useState } from 'react'

import tutoriasAPI from '../api/tutoriasAPI';
import { TutoriasDiaByAsignaturaInterface } from '../interfaces/TutoriasDiaByAsignaturaInterface';

export const useDiaByAsignatura = () => {

  const [isLoadingDiaByAsignatura, setIsLoadingDiaByAsignatura] = useState(true);
  const [diaByAsignatura, setDiaByAsignatura] = useState<TutoriasDiaByAsignaturaInterface[]>()

  const onLoadDiaByAsignatura = async (id_asignatura: string) => {
    const rep = await tutoriasAPI.get<TutoriasDiaByAsignaturaInterface[]>(`/buscar_dias.php?id_asignatura=${id_asignatura}`);
    console.log(rep.data);
    setDiaByAsignatura(rep.data);
    setIsLoadingDiaByAsignatura(false);
  }

  return {
    diaByAsignatura,
    isLoadingDiaByAsignatura,
    onLoadDiaByAsignatura,
  }
}
