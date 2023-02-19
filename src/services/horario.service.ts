import { webserviceAPI } from '@src/api';
import { IHorarioResp } from '@src/screens/schedule-day/models';

export const getHorario = async (email: string, API_KEY: string) => {
  const rep = await webserviceAPI.get<IHorarioResp>(`/schedule/?email=${email}&key=${API_KEY}`);
  return rep
}