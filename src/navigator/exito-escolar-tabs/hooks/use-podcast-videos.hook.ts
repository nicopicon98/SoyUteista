import { useEffect, useState, useContext } from 'react';
import { IPodcastsResp, IVideosResp } from '../models';
import { useSnackbar } from '@src/context/snackbar';
import { AuthContext } from '@src/context/auth';
import { ExitoEscolar } from '@src/services';
import { API_KEY } from '@src/config/auth';

export const useVideosPodcast = () => {
  const { authState: { user } } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [podcast, setPodcast] = useState<IPodcastsResp>({data: []});

  const { showMessage } = useSnackbar();

  const [videos, setVideos] = useState<IVideosResp>({ data: [] })

  const fetchPodcast = async () => {
    try {
      const resp = await Promise.all([ExitoEscolar.getPodcasts(user!.userEmail), ExitoEscolar.getVideos(user!.userEmail)])
      setPodcast(resp[0]);
      setVideos(resp[1]);
      setIsLoading(false);
    } catch (error: any) {
      showMessage('Lo sentimos, ocurrio un error cargando la informacion, intenta mas tarde', 'warning')
    }
  }

  //Disparamos la peticion http
  useEffect(() => {
    fetchPodcast();
  }, [])


  return {
    isLoading,
    podcast,
    videos
  }
}