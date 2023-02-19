import { useEffect, useState, useContext } from 'react';
import { getExitoEscolarService } from '@src/services';
import { useSnackbar } from '@src/context/snackbar';
import { getPodcastService } from '@src/services';
import { AuthContext } from '@src/context/auth';
import { API_KEY } from '@src/config/auth';
import { IPodcastResp } from '../models';
import { IVideosResp } from '../models';

export const useVideosPodcast = () => {
  const { authState: { user } } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [podcast, setPodcast] = useState<IPodcastResp>({
    data: []
  });

  const {showMessage} = useSnackbar();

  const [videos, setVideos] = useState<IVideosResp>({
    data: []
  })

  const fetchPodcast = async () => {
    try {
      const rep = await Promise.all([getPodcastService(user!.userEmail, API_KEY), getExitoEscolarService(user!.userEmail, API_KEY)])
      setPodcast(rep[0].data);
      setVideos(rep[1].data);
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