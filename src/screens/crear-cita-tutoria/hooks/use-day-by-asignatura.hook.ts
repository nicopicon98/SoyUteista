import { getDaysByAsignatura } from '../../../services';
import { DaysByAsignatura } from '../../../models';
import { useState } from 'react'

export const useDayByAsignatura = () => {

  const [isLoadingDayByAsignatura, setIsLoadingDayByAsignatura] = useState(true);
  const [dayByAsignatura, setDayByAsignatura] = useState<DaysByAsignatura[]>()

  const onLoadDiaByAsignatura = async (id_asignatura: string) => {
    const rep = await getDaysByAsignatura(id_asignatura)
    console.log(rep.data);
    setDayByAsignatura(rep.data);
    setIsLoadingDayByAsignatura(false);
  }

  return {
    dayByAsignatura,
    isLoadingDayByAsignatura,
    onLoadDiaByAsignatura,
  }
}
