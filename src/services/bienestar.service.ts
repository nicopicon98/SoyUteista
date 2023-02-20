import { webserviceAPI } from '@src/api/web-service.api';
import { IBienestarProfessional, IBienestarProfessionalSchedule } from '@src/screens/crear-cita-bienestar/models';

/**
 * The ProfessionalManager class provides methods for fetching professional and schedule data from the server.
 */
export class ProfessionalManager {
  /**
   * Retrieves professionals by a given field and email.
   * @public
   * @static
   * @async
   * @param field The field to search for.
   * @param email The email address of the user.
   * @returns A Promise that resolves to an array of IProfessional objects.
   */
  public static getAllByField = async (field: string, email: string): Promise<IBienestarProfessional[]> => {
    const resp = await webserviceAPI.get(`/bienestar/professionals-by-field/?field=${field}&email=${email}`)
    return resp.data;
  }

  /**
   * Retrieves schedule by a given user id and email.
   * @public
   * @static
   * @async
   * @param user_id The user ID to search for.
   * @param email The email address of the user.
   * @returns A Promise that resolves to an array of ICalendar objects.
   */
  public static getScheduleById = async(user_id: string, email: string): Promise<IBienestarProfessionalSchedule[]> => {
    const resp = await webserviceAPI.get(`/bienestar/calendar-by-user-id/?user_id=${user_id}&email=${email}`)
    return resp.data;
  }
}