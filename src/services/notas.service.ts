import { webserviceAPI } from "@src/api";
import { INotasResp } from "@src/models";

export const getNotas = async (email: string, API_KEY: string) => {
  const rep = await webserviceAPI.get<INotasResp>(`/qualification/?email=${email}&key=${API_KEY}`);
  return rep
}