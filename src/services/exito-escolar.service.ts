import { webserviceAPI } from "@src/api";
import { VideosInterface } from './../screens/exito-escolar/models/get-videos.model';

export const getExitoEscolarService = async () => {
  const rep = await webserviceAPI.get<VideosInterface>(`/exito-escolar`);
  return rep
}