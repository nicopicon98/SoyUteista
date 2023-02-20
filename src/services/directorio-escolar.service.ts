import { IDirectorioEscolarResp } from "@src/models";
import { webserviceAPI } from "@src/api";

/**
 * A class that provides methods for fetching data from the Directorio Escolar API.
 */
export class DirectorioEscolarManager {
  /**
   * Retrieves the directory information for the user's school from the Directorio Escolar API.
   * 
   * @param email The email address to retrieve directory information for.
   * @returns A Promise that resolves to an array of IDirectorioEscolarResp objects.
   */
  public static async getAll(email: string): Promise<IDirectorioEscolarResp[]> {
    const resp = await webserviceAPI.get<IDirectorioEscolarResp[]>(`/dependencias/?email=${email}`);
    return resp.data;
  }
}