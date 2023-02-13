import { serviciosAPI } from "@src/api";
import { ConvocatoriasResp } from "@src/screens/convocatorias/models";

export const getServiciosAcademicos = async () => {
  const resp = await serviciosAPI.get<ConvocatoriasResp[]>('/convocatorias');
  return resp
}