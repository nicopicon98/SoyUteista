import { EUTSPostsCategories, IUTSPosts } from "@src/models";
import { UTSPostsAPI } from "./uts-posts-api.service";

/**
 * 
 * Class for fetching agendas and noticias data from the UTS posts API.
 */
export class UTSPosts extends UTSPostsAPI<IUTSPosts> {
  /**
   * Fetches data from the UTS posts API for the specified category and results size.
   * @public
   * @async
   * @param type The category of UTS posts to fetch (noticias or agendas).
   * @param resultsSize The number of results to fetch.
   * @returns A Promise that resolves to an array of IUTSPosts objects.
   */
  public async getAll(type: EUTSPostsCategories, resultsSize: number): Promise<IUTSPosts[]> {
    return this.fetchData(`/${type}/numberposts/${resultsSize}`);
  }
}