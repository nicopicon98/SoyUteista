import { webserviceAPI } from "@src/api";
import { INotasResp } from "@src/models";

/**
 * Class for fetching student grades data from the API.
 */
export class NotasEstudiante {
  /**
   * Retrieves student grades data for a given email address.
   * @param email The email address to retrieve student grades data for.
   * @returns A Promise that resolves to an INotasResp object.
   */
  public static getAll = async (email: string): Promise<INotasResp> => {
    const resp = await webserviceAPI.get<INotasResp>(`/qualification/?email=${email}`);
    return resp.data
  }
}