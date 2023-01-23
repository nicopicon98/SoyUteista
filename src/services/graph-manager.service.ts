import { Client } from '@microsoft/microsoft-graph-client';
import { AuthManager } from './auth-manager.service';


class GraphAuthProvider {
  getAccessToken = async () => {
    const token = await AuthManager.getAccessTokenAsync();
    return token || '';
  };
}

const clientOptions = {
  authProvider: new GraphAuthProvider(),
};

// Initialize the client
const graphClient = Client.initWithMiddleware(clientOptions);

export class GraphManager {
  static getUserAsync = async () => {
    const answer = await graphClient
      .api('/me')
      .select('displayName,givenName,mail,userPrincipalName')
      .get();
    return answer
  };

  static getPhotoAsync = async () => {
    return await graphClient
      .api('/me/photo/$value')
      .get();
  }

  static getUserPhotoAsync = async (email: string) => {
    return await graphClient
      .api(`/users/${email}/photo/$value`)
      .get();
  }
}