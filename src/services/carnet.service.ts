import { ICarnetResp } from "@src/models";
import { webserviceAPI } from "@src/api";

export const getCarnet = async (email: string, API_KEY: string) => {
  const rep = await webserviceAPI.get<ICarnetResp>(`/carnet/?email=${email}&key=${API_KEY}`);
  return rep
}