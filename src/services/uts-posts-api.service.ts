import { utsPostsCategoriesAPI } from "@src/api";

/**
 * Generic base class for fetching data from the UTS posts API.
 * 
 * @typeparam T The type of the data to be returned from the API.
 */
export abstract class UTSPostsAPI<T> {
  /**
   * Fetches data from the UTS posts API for the specified URL.
   * @async
   * @protected
   * @param url The URL of the API endpoint to fetch data from.
   * @returns A Promise that resolves to an array of data of type T.
   */
  protected async fetchData(url: string): Promise<T[]> {
    const response = await utsPostsCategoriesAPI.get<T[]>(url);
    return response.data;
  }
}