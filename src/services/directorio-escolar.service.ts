import { IDirectorioEscolarResp } from "@src/models";
import { webserviceAPI } from "@src/api";

export const getDirectorioEscolar = async (email: string, API_KEY: string) => {
  const rep = await webserviceAPI.get<IDirectorioEscolarResp[]>(`/dependencias/?email=${email}&key=${API_KEY}`);
  return rep
}