import { useEffect, useState } from 'react';
import { getPodcastService } from './../../../services/podcast.service';
import { PodcastInterface } from './../models/get-podcasts.model';

export const usePodcast = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [podcast, setPodcast] = useState<PodcastInterface>({
    data: []
  });

  const fetchPodcast = async () => {
    try {
      const rep = await getPodcastService();
      setPodcast(rep.data);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  }

  //Disparamos la peticion http
  useEffect(() => {
    fetchPodcast();
  }, [])


  return {
    isLoading,
    podcast
  }
}