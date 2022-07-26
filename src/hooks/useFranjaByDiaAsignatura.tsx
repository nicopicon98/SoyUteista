import React, { useState } from 'react'

import tutoriasAPI from '../api/tutoriasAPI';
import { TutoriasFranjaByDiaAsignaturaInterface } from '../interfaces/TutoriasFranjaByDiaAsignaturaInterface';

export const useFranjaByDiaAsignatura = () => {

  const [isLoadingFranjaByDiaAsignatura, setisLoadingFranjaByDiaAsignatura] = useState(true);
  const [franjaByDiaAsignatura, setFranjaByDiaAsignatura] = useState<TutoriasFranjaByDiaAsignaturaInterface[]>()

  const onLoadFranjaByDiaAsignatura = async (id_asignatura: string, dia: string) => {
    const rep = await tutoriasAPI.get<TutoriasFranjaByDiaAsignaturaInterface[]>(`/buscar_hora.php?id_asignatura=${id_asignatura}&dia=${dia}`);
    console.log(rep.data);
    setFranjaByDiaAsignatura(rep.data)
    setisLoadingFranjaByDiaAsignatura(false);
  }

  return {
    franjaByDiaAsignatura,
    isLoadingFranjaByDiaAsignatura,
    onLoadFranjaByDiaAsignatura,
  }
}
