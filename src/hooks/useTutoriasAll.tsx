import { useState, useEffect, useContext } from 'react'


import tutoriasAPI from '../api/tutoriasAPI';
import { AuthContext } from '../context/AuthContext';
import { replaceNull } from '../helpers/functions';
import { TutoriasAllInterface } from '../interfaces/TutoriasAllInterface';

export const useTutoriasAll = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tutorias, setTutorias] = useState<TutoriasAllInterface[]>();

  const { authState: { user } } = useContext(AuthContext);

  const loadTutorias = async () => {
    const rep = await tutoriasAPI.get<TutoriasAllInterface>(`/listar_tutorias_todas_estudiante.php?documento=${user!.userMoreInfo.C_PEGE_DOCUMENTOIDENTIDAD}`);
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
