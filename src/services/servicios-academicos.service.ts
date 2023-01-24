import { serviciosAPI } from "../api";
import { ConvocatoriasResp } from "../models";

export const getServiciosAcademicos = async () => {
  const resp = await serviciosAPI.get<ConvocatoriasResp[]>('/convocatorias');
  return resp
}