import { PodcastInterface } from '../navigator/exito-escolar-tabs/models/get-podcasts.model';
import { webserviceAPI } from "@src/api";

export const getPodcastService = async (email: string, API_KEY: string) => {
  const rep = await webserviceAPI.get<PodcastInterface>(`/podcast/?email=${email}&key=${API_KEY}`);
  return rep
}