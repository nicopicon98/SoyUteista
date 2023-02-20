import { IRevistaResp } from "@src/models";
import { revistaAPI } from "@src/api";

/**
 * Class for fetching newsletter data from the Revista API.
*/
export class Revista {
  /**
   * Retrieves the latest newsletter from the server.
   * @returns A Promise that resolves to an array of IRevistaResp objects.
   */
  public static getAll = async (): Promise<IRevistaResp[]> => {
    const resp = await revistaAPI.get<IRevistaResp[]>('/getNewsletter.php');
    return resp.data;
  }
}