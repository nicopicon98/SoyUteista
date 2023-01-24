import { webserviceAPI } from "@src/api";
import { CarnetResp } from "@src/models/carnet.model";

export const getCarnet = async (email: string, API_KEY: string) => {
  const rep = await webserviceAPI.get<CarnetResp>(`/carnet/?email=${email}&key=${API_KEY}`);
  return rep
}