import { PodcastInterface } from './../screens/exito-escolar/models/get-podcasts.model';
import { webserviceAPI } from "@src/api";

export const getPodcastService = async (email: string, API_KEY: string) => {
  const rep = await webserviceAPI.get<PodcastInterface>(`/podcast/?email=${email}&key=${API_KEY}`);
  console.log(rep.data)
  return rep
}