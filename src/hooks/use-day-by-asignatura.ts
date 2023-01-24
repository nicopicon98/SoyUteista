import { getDaysByAsignatura } from '../services';
import { DaysByAsignatura } from '../models';
import { useState } from 'react'

export const useDayByAsignatura = () => {

  const [isLoadingDiaByAsignatura, setIsLoadingDiaByAsignatura] = useState(true);
  const [diaByAsignatura, setDiaByAsignatura] = useState<DaysByAsignatura[]>()

  const onLoadDiaByAsignatura = async (id_asignatura: string) => {
    const rep = await getDaysByAsignatura(id_asignatura)
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
