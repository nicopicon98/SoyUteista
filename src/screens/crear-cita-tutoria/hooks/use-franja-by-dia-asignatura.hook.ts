import { getFranjaByDayAsignatura } from '@src/services';
import { useState } from 'react'

export const useFranjaByDiaAsignatura = () => {

  const [isLoadingFranjaByDiaAsignatura, setisLoadingFranjaByDiaAsignatura] = useState(false);

  const onLoadFranjaByDiaAsignatura = async (id_course: string, day: string) => {
    setisLoadingFranjaByDiaAsignatura(true);
    const resp = await getFranjaByDayAsignatura(id_course, day);
    setisLoadingFranjaByDiaAsignatura(false);
    return resp.data
  }

  return {
    isLoadingFranjaByDiaAsignatura,
    onLoadFranjaByDiaAsignatura,
  }
}
