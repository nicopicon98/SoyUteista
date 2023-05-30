import { webserviceAPI } from "@src/api";
import { IRespEnable } from "@src/screens/temp/models";

/**
 * A class for fetching enabled screens data from the API.
 */
export class EnabledScreensService {
  /**
   * Retrieves the enabled screens for a given email address.
   * @param email The email address to retrieve enabled screens for.
   * @returns A Promise that resolves to an array of IRespEnable objects.
   */
  public static async getAll(email: string): Promise<IRespEnable> {
    const resp = await webserviceAPI.get<IRespEnable>(`/soyuteista/enabled-modules/?email=${email}`);
    return resp.data;
  }
}

