import { AuthConfiguration } from "react-native-app-auth";

export const AuthConfig = {
  appId: '6112809e-ef44-4718-be4d-9826c4eb1ed3',
  appScopes: [
    'openid',
    'offline_access',
    'profile',
    'User.Read',
  ],
};

export const API_KEY = "JSPHPWORKS4everandever!";

export const config: AuthConfiguration = {
  clientId: AuthConfig.appId,
  redirectUrl: 'app-uts-sistemas://react-native-auth/',
  scopes: AuthConfig.appScopes,
  additionalParameters: { prompt: 'select_account' },
  serviceConfiguration: {
    authorizationEndpoint:'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    tokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
  },
};