import { getTutorByIdAsignaturaDayFranja } from '../services';
import { TutorInfoResp } from '../models';
import { useState } from 'react'

export const useTutorInfo = () => {
  const [isLoadingInfoTutor, setisLoadingInfoTutor] = useState(true);
  const [infoTutor, setInfoTutor] = useState<TutorInfoResp>()

  const onLoadInfoTutor = async (id_asignatura: string, day: string, franja: string) => {
    const rep = await getTutorByIdAsignaturaDayFranja(id_asignatura, day, franja)
    setInfoTutor(rep.data[0])
    setisLoadingInfoTutor(false);
  }

  return {
    infoTutor,
    isLoadingInfoTutor,
    onLoadInfoTutor,
  }
}
