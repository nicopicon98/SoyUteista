import { Client, ResponseType } from '@microsoft/microsoft-graph-client';
import { GraphAuthProvider } from './GraphAuthProvider';

// Set the authProvider to an instance
// of GraphAuthProvider
const clientOptions = {
  authProvider: new GraphAuthProvider(),
};

// Initialize the client
const graphClient = Client.initWithMiddleware(clientOptions);

export class GraphManager {
  static getUserAsync = async () => {
    // GET /me
    const answer = await graphClient
      .api('/me')
      .select('displayName,givenName,mail,userPrincipalName')
      .get();
    return answer
  };

  static getPhotoAsync = async () => {
    // const objectURL = URL.createObjectURL()
    return await graphClient
      .api('/me/photo/$value')
      .get();
  }
}