import { useState, useEffect, useContext } from 'react'
import { getAllTutoriasByUser } from '../../../services';
import { replaceNull } from '../../../utilities';
import { AuthContext } from '../../../context';
import { TutoriaResp } from '../../../models';

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
