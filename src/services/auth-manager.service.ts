import AsyncStorage from '@react-native-async-storage/async-storage';
import { authorize, refresh } from 'react-native-app-auth';
import { config } from '@src/config/auth';
import moment from 'moment';

/**
 * The AuthManager class provides methods for handling user authentication and access tokens.
 */
export class AuthManager {
  /**
   * Signs in the user using the provided configuration.
   * @public
   * @static
   * @async
   * @throws An error if there was a problem with the sign in process.
   */
  public static signInAsync = async (): Promise<void> => {
    try {
      const result = await authorize(config);
      await AsyncStorage.setItem('userToken', result.accessToken);
      await AsyncStorage.setItem('refreshToken', result.refreshToken);
      await AsyncStorage.setItem('expireTime', result.accessTokenExpirationDate);
    } catch (error) {
      throw new Error('There was a problem with the sign in process.');
    }
  };

  /**
   * Signs the user out by clearing all stored authentication data.
   * @public
   * @static
   * @async
   */
  public static signOutAsync = async (): Promise<void> => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('expireTime');
  };

  /**
   * Retrieves the access token for the current user, either by returning the saved access token or
   * by refreshing it if it has expired.
   * @public
   * @static
   * @async
   * @returns A Promise that resolves to the access token, or null if there is no access token available.
   */
  public static getAccessTokenAsync = async (): Promise<string | null> => {
    const expireTime = await AsyncStorage.getItem('expireTime');

    if (expireTime !== null) {
      // Get expiration time - 5 minutes
      // If it's <= 5 minutes before expiration, then refresh
      const expire = moment(expireTime).subtract(5, 'minutes');
      const now = moment();

      if (now.isSameOrAfter(expire)) {
        try {
          // Expired, refresh
          console.log('Refreshing token');
          const refreshToken = await AsyncStorage.getItem('refreshToken');
          console.log(`Refresh token: ${refreshToken}`);
          const result = await refresh(config, {
            refreshToken: refreshToken || '',
          });

          // Store the new access token, refresh token, and expiration time in storage
          await AsyncStorage.setItem('userToken', result.accessToken);
          await AsyncStorage.setItem('refreshToken', result.refreshToken || '');
          await AsyncStorage.setItem('expireTime', result.accessTokenExpirationDate);

          return result.accessToken;
        } catch (error) {
          console.log(error, 'getAccessTokenAsync');
          return null;
        }
      }

      // Not expired, just return saved access token
      const accessToken = await AsyncStorage.getItem('userToken');
      return accessToken;
    }

    return null;
  };
}