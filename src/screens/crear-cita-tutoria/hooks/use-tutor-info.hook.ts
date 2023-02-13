import { getInfoTutor } from '@src/services';
import {ITutorInfoResp} from '@src/models'
import { useState } from 'react'

export const useTutorInfo = () => {
  const [isLoadingInfoTutor, setisLoadingInfoTutor] = useState(true);

  const onLoadInfoTutor = 
      async (id_course: string, day: string, franja:string, id_tutor: string) : Promise<ITutorInfoResp> => {
    const rep = await getInfoTutor(id_course, day, franja, id_tutor)
    setisLoadingInfoTutor(false);
    return rep.data[0]
  }

  return {
    isLoadingInfoTutor,
    onLoadInfoTutor,
  }
}
