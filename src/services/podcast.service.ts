import { PodcastInterface } from './../screens/exito-escolar/models/get-podcasts.model';
import { webserviceAPI } from "@src/api";

export const getPodcastService = async () => {
  const rep = await webserviceAPI.get<PodcastInterface>(`/podcast`);
  return rep
}