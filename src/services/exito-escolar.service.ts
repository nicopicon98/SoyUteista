import { IPodcastsResp, IVideosResp } from '@src/navigator/exito-escolar-tabs/models';
import { webserviceAPI } from "@src/api";

/**
 * Represents the ExitoEscolar service, which provides access to podcast and video data.
 */
export class ExitoEscolar {
  /**
   * Retrieves podcast data for a given email address.
   * @param email The email address to retrieve podcast data for.
   * @returns A Promise that resolves to an AxiosResponse containing an IPodcastResp object.
   */
  public static getPodcasts = async (email: string): Promise<IPodcastsResp> => {
    const resp = await webserviceAPI.get<IPodcastsResp>(`/soyuteista/podcast/?email=${email}`);
    return resp.data;
  }

  /**
   * Retrieves video data for a given email address.
   * @param email The email address to retrieve video data for.
   * @returns A Promise that resolves to an IVideosResp object.
   */
  public static getVideos = async (email: string): Promise<IVideosResp> => {
    const resp = await webserviceAPI.get<IVideosResp>(`/soyuteista/exito-escolar/?email=${email}`);
    return resp.data
  }
}