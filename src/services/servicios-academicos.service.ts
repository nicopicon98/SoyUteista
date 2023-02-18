import { API_KEY } from '@src/config/auth';
import { webserviceAPI } from "@src/api";
import { ConvocatoriasResp } from "@src/screens/convocatorias/models";

export const getServiciosAcademicos = async (email: string, API_KEY: string) => {
  const resp = await webserviceAPI.get<ConvocatoriasResp[]>(`/convocatorias/?email=${email}&key=${API_KEY}`);
  return resp
}