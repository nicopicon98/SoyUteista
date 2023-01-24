import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/auth.component';
import { getAllTutoriasByUser } from '../services';
import { TutoriaResp } from '../models';
import { replaceNull } from '../utilities';

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
