import { webserviceAPI } from '../api';
import { HorarioInterface } from '../models/HorarioInterface';

export const getHorario = async (email: string, API_KEY: string) => {
  const rep = await webserviceAPI.get<HorarioInterface>(`/schedule/?email=${email}&key=${API_KEY}`);
  return rep
}