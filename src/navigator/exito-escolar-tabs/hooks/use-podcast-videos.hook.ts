import { getExitoEscolarService } from '../../../services/exito-escolar.service';
import { getPodcastService } from '../../../services/podcast.service';
import { VideosInterface } from '../models/get-videos.model';
import { useEffect, useState, useContext } from 'react';
import { PodcastInterface } from '../models';
import { API_KEY } from '@src/config/auth';
import { AuthContext } from '@src/context/auth';
import { useSnackbar } from '@src/context/snackbar';

export const useVideosPodcast = () => {
  const { authState: { user } } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [podcast, setPodcast] = useState<PodcastInterface>({
    data: []
  });

  const {showMessage} = useSnackbar();

  const [videos, setVideos] = useState<VideosInterface>({
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