import { serviciosAPI } from "../api";
import { DirectorioEscolar } from "../models";
import { ConvocatoriasResp } from "../screens/convocatorias/models/convocatorias.model";

export const getDirectorioEscolar = async () => {
  const rep = await serviciosAPI.get<DirectorioEscolar[]>(`/dependencias`);
  return rep
}