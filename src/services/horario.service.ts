import { webserviceAPI } from '../api';
import { HorarioResp } from '../models/horario.model';

export const getHorario = async (email: string, API_KEY: string) => {
  const rep = await webserviceAPI.get<HorarioResp>(`/schedule/?email=${email}&key=${API_KEY}`);
  return rep
}