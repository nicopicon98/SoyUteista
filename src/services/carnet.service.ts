import { webserviceAPI } from "../api";
import { CarnetInterface } from "../models/CarnetInterface";

export const getCarnet = async (email: string, API_KEY: string) => {
  const rep = await webserviceAPI.get<CarnetInterface>(`/carnet/?email=${email}&key=${API_KEY}`);
  return rep
}