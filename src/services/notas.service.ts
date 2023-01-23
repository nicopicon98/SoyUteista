
import { webserviceAPI } from "../api";
import { NotasInterface } from "../models/NotasInterface";

export const getNotas = async (email: string, API_KEY: string) => {
  const rep = await webserviceAPI.get<NotasInterface>(`/qualification/?email=${email}&key=${API_KEY}`);
  return rep
}