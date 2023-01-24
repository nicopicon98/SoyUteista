import { serviciosAPI } from "@src/api";
import { ConvocatoriasResp } from "@src/models";

export const getServiciosAcademicos = async () => {
  const resp = await serviciosAPI.get<ConvocatoriasResp[]>('/convocatorias');
  return resp
}