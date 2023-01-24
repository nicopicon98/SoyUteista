import { getFranjaByDayAsignatura } from '@src/services';
import { FranjaByDayAsignatura } from '@src/models';
import { useState } from 'react'

export const useFranjaByDiaAsignatura = () => {

  const [isLoadingFranjaByDiaAsignatura, setisLoadingFranjaByDiaAsignatura] = useState(true);
  const [franjaByDiaAsignatura, setFranjaByDiaAsignatura] = useState<FranjaByDayAsignatura[]>()

  const onLoadFranjaByDiaAsignatura = async (id_asignatura: string, day: string) => {
    const resp = await getFranjaByDayAsignatura(id_asignatura, day);
    setFranjaByDiaAsignatura(resp.data)
    setisLoadingFranjaByDiaAsignatura(false);
  }

  return {
    franjaByDiaAsignatura,
    isLoadingFranjaByDiaAsignatura,
    onLoadFranjaByDiaAsignatura,
  }
}
