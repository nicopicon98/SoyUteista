import { useState, useEffect, useContext } from 'react'
import { getAllTutoriasByUser } from '@src/services';
import { replaceNull } from '@src/utilities';
import { AuthContext } from '@src/context/auth';
import { TutoriaResp } from '@src/models';

export const useTutorias = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tutorias, setTutorias] = useState<TutoriaResp[]>();

  const { authState: { user } } = useContext(AuthContext);

  const loadTutorias = async () => {
    const rep = await getAllTutoriasByUser(user!.userMoreInfo.C_PEGE_DOCUMENTOIDENTIDAD);
    setTutorias(replaceNull(rep.data))
    setIsLoading(false);
  }

  //Disparamos la peticion http
  useEffect(() => {
    loadTutorias();
  }, [])

  return {
    isLoading,
    tutorias,
    loadTutorias
  }
}
