import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Class for managing whether the user has viewed the 'bajo rendimiento' screen for the first time.
 */
export class BajoRendManager {
  /**
   * Sets the 'first time' value to 'true' in AsyncStorage.
   * @returns A Promise that resolves when the value has been set.
   */
  static setFirstTimeAsync = (): Promise<void> => {
    return AsyncStorage.setItem('firstTimeBajoRend', "true");
  }

  /**
   * Retrieves the 'first time' value from AsyncStorage.
   * @returns A Promise that resolves to the 'first time' value, or null if it hasn't been set.
   */
  static getFirstTimeAsync = (): Promise<string | null> => {
    return AsyncStorage.getItem('firstTimeBajoRend');
  }
}