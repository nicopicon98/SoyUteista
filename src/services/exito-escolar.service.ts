import { IVideosResp } from '@src/navigator/exito-escolar-tabs/models';
import { webserviceAPI } from "@src/api";

export const getExitoEscolarService = async (email: string, API_KEY: string) => {
  const rep = await webserviceAPI.get<IVideosResp>(`/exito-escolar/?email=${email}&key=${API_KEY}`);
  return rep
}