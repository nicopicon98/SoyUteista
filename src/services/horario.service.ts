import { webserviceAPI } from '@src/api';
import { HorarioResp } from '@src/screens/schedule-day/models';

export const getHorario = async (email: string, API_KEY: string) => {
  const rep = await webserviceAPI.get<HorarioResp>(`/schedule/?email=${email}&key=${API_KEY}`);
  return rep
}