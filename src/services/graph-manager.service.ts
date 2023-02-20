import { Client } from '@microsoft/microsoft-graph-client';
import { AuthManager } from './';


/**
 * Class for managing the Microsoft Graph API client and making requests for user and photo data.
 */
export class GraphManager {

  /**
   * Retrieves user data for the currently logged in user.
   * @returns A Promise that resolves to a user object with the properties displayName, givenName, mail, and userPrincipalName.
   */
  static getUserAsync = async (): Promise<any> => {
    const answer = await graphClient
      .api('/me')
      .select('displayName,givenName,mail,userPrincipalName')
      .get();
    return answer;
  };

  /**
   * Retrieves the photo for the currently logged in user.
   * @returns A Promise that resolves to a Blob object containing the user's photo.
   */
  static getPhotoAsync = async (): Promise<Blob> => {
    return await graphClient
      .api('/me/photo/$value')
      .get();
  }

  /**
   * Retrieves the photo for a specified user.
   * @param email The email address of the user to retrieve the photo for.
   * @returns A Promise that resolves to a Blob object containing the user's photo.
   */
  static getUserPhotoAsync = async (email: string): Promise<Blob> => {
    return await graphClient
      .api(`/users/${email}/photo/$value`)
      .get();
  }
}

/**
 * Class for providing access tokens to the Microsoft Graph API client.
 */
class GraphAuthProvider {

  /**
   * Retrieves the access token for the currently logged in user.
   * @returns A Promise that resolves to the access token, or an empty string if one is not found.
   */
  getAccessToken = async (): Promise<string> => {
    const token = await AuthManager.getAccessTokenAsync();
    return token || '';
  };
}

// Initialize the client with the GraphAuthProvider as the authentication provider.
const clientOptions = {
  authProvider: new GraphAuthProvider(),
};
const graphClient = Client.initWithMiddleware(clientOptions);