import {webserviceAPI} from '@src/api/web-service.api';
import {IFieldsReq, IFieldsResp} from '@src/screens/crear-cita-bienestar/models';
/**
 * The ProfessionalManager class provides methods for fetching professional and schedule data from the server.
 */
export class FieldsManager {
  /**
   * Retrieves professionals by a given field and email.
   * @public
   * @static
   * @async
   * @param field The field to search for.
   * @param email The email address of the user.
   * @returns A Promise that resolves to an array of IProfessional objects.
   */
  public static getAllByCampus = async ({
    id_campus,
  }: IFieldsReq): Promise<void> => {
    // const resp = await webserviceAPI.get(
    //   `/bienestar/professionals-by-field/?field=${field}&email=${email}`,
    // );
    return Promise.resolve();
  };

}
