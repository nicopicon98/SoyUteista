import { webserviceAPI } from "@src/api";
import { DirectorioEscolar } from "@src/models";

export const getDirectorioEscolar = async (email: string, API_KEY: string) => {
  const rep = await webserviceAPI.get<DirectorioEscolar[]>(`/dependencias/?email=${email}&key=${API_KEY}`);
  return rep
}