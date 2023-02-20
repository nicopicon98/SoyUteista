import { useState, useEffect, useContext } from 'react'
import { Tutorias } from '@src/services';
import { useSnackbar } from '@src/context/snackbar';
import { AuthContext } from '@src/context/auth';
import { replaceNull } from '@src/utilities';
import { ITutoriaResp } from '@src/models';

export const useTutorias = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tutorias, setTutorias] = useState<ITutoriaResp[]>();

  const { authState: { user } } = useContext(AuthContext);
  const { showMessage } = useSnackbar();

  const loadTutorias = async () => {
    try {
      const resp = await Tutorias.getAllTutoriasByUser(user!.userMoreInfo.C_PEGE_DOCUMENTOIDENTIDAD);
      setTutorias(replaceNull(resp))
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
