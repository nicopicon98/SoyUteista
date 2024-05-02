import { ICarnetResp } from "@src/models";
import { webserviceAPI } from "@src/api";

/**
 * A class for retrieving carnet information from the web service.
 */
export class CarnetManager {
  /**
   * Retrieves the carnet information for a given email address.
   * @param email The email address to retrieve carnet information for.
   * @returns A Promise that resolves to an ICarnetResp object.
   */
  public static async getCarnet(email: string): Promise<ICarnetResp> {
    const resp = await webserviceAPI.get<ICarnetResp>(`/soyuteista/carnet2/?email=${email}`);
    return resp.data;
  }
}

