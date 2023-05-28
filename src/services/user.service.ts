import { blobToBase64 } from "@src/utilities";
import { GraphManager } from "./";

export class User {
  /**
  * Retrieves the photo of a specific user.
  * @async
  * @public
  * @static
  * @returns A Promise that resolves to an object with a URI property containing the photo URL.
  */
  public static getUserPhoto = async (): Promise<{ uri: string }> => {
    const userImage: Blob = await GraphManager.getPhotoAsync();
    const answerBase64: string = await blobToBase64(userImage);
    const photo: string[] = answerBase64.split(',');
    const resp: string = `data:image/png;base64,${photo[1]}`;
    return { uri: resp };
  };
}