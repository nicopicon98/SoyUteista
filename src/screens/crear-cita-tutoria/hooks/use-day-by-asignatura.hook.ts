import { getDaysByAsignatura } from '@src/services';
import { DaysByAsignatura } from '@src/models';
import { useState } from 'react'

export const useDayByAsignatura = () => {

  const [isLoadingDaysByAsignatura, setIsLoadingDaysByAsignatura] = useState(false)

  const onLoadDayByAsignatura = async (id_course: string) => {
    setIsLoadingDaysByAsignatura(true);
    const rep = await getDaysByAsignatura(id_course)
    setIsLoadingDaysByAsignatura(false);
    return rep.data
  }

  return {
    isLoadingDaysByAsignatura,
    onLoadDayByAsignatura,
  }
}
