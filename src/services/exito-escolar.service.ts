import { webserviceAPI } from "@src/api";
import { VideosInterface } from './../screens/exito-escolar/models/get-videos.model';

export const getExitoEscolarService = async (email: string, API_KEY: string) => {
  const rep = await webserviceAPI.get<VideosInterface>(`/exito-escolar/?email=${email}&key=${API_KEY}`);
  return rep
}