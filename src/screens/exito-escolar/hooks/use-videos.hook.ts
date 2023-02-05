import { useEffect, useState } from 'react';
import { getExitoEscolarService } from './../../../services/exito-escolar.service';
import { VideosInterface } from './../models/get-videos.model';

export const useVideos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState<VideosInterface>({
    data: []
  });

  const fetchVideos = async () => {
    try {
      const rep = await getExitoEscolarService();
      setVideos(rep.data);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
    }
  }

  //Disparamos la peticion http
  useEffect(() => {
    fetchVideos();
  }, [])


  return {
    isLoading,
    videos
  }
}