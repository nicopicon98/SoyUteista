import { webserviceAPI } from "../api";
import { CarnetResp } from "../models/carnet.model";

export const getCarnet = async (email: string, API_KEY: string) => {
  const rep = await webserviceAPI.get<CarnetResp>(`/carnet/?email=${email}&key=${API_KEY}`);
  return rep
}