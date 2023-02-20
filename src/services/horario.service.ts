import { IHorarioResp } from '@src/screens/schedule-day/models';
import { webserviceAPI } from '@src/api';

/**
 * Class for fetching student schedule data from the server.
 */
export class HorarioEstudiante {
  /**
   * Retrieves the schedule for a given email address.
   * @param email The email address to retrieve the schedule for.
   * @returns A Promise that resolves to an IHorarioResp object.
   */
  public static getHorario = async (email: string): Promise<IHorarioResp> => {
    const resp = await webserviceAPI.get<IHorarioResp>(`/schedule/?email=${email}`);
    return resp.data;
  }
}