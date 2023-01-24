import { serviciosAPI } from "@src/api";
import { DirectorioEscolar } from "@src/models";

export const getDirectorioEscolar = async () => {
  const rep = await serviciosAPI.get<DirectorioEscolar[]>(`/dependencias`);
  return rep
}