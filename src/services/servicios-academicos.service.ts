import { IConvocatoriasResp } from "@src/screens/convocatorias/models";
import { webserviceAPI } from "@src/api";

/**
 * Represents the Servicios Academicos API, which provides access to academic services data.
 */
export class ServiciosAcademicos {
  /**
   * Retrieves academic services for a given email address
   * @param email The email address to retrieve academic services for.
   * @returns A Promise that resolves to an AxiosResponse containing an array of IConvocatoriasResp objects.
   */
  public static async getAll(email: string): Promise<IConvocatoriasResp[]> {
    const resp = await webserviceAPI.get<IConvocatoriasResp[]>(`/soyuteista/convocatorias/?email=${email}`);
    return resp.data;
  }
}