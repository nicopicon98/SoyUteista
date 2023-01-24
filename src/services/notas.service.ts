import { webserviceAPI } from "@src/api";
import { NotasResp } from "@src/models";

export const getNotas = async (email: string, API_KEY: string) => {
  const rep = await webserviceAPI.get<NotasResp>(`/qualification/?email=${email}&key=${API_KEY}`);
  return rep
}