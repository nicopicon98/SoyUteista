import { useState, useEffect, useContext } from 'react'
import { getAllTutoriasByUser } from '@src/services';
import { replaceNull } from '@src/utilities';
import { AuthContext } from '@src/context/auth';
import { ITutoriaResp } from '@src/models';
import { useSnackbar } from '@src/context/snackbar';

export const useTutorias = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tutorias, setTutorias] = useState<ITutoriaResp[]>();

  const { authState: { user } } = useContext(AuthContext);
  const {showMessage} = useSnackbar();

  const loadTutorias = async () => {
    try {
      const rep = await getAllTutoriasByUser(user!.userMoreInfo.C_PEGE_DOCUMENTOIDENTIDAD);
      setTutorias(replaceNull(rep.data))
      setIsLoading(false);
    } catch (error) {
      showMessage('En este momento estamos experimentando problemas con el servidor, intentalo mas tarde', 'warning', 8000)
    }
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
