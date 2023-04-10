import CryptoJS from "crypto-js";
import { REACT_APP_SECRET_KEY } from "@env"

/**
 * Provides encryption and decryption methods using CryptoJS library.
 */
export class CryptoHelper {
  /**
   * Encrypts a given data using the provided secret key.
   *
   * @param {string} data - The data to be encrypted.
   * @returns {string} - The encrypted data.
   */
  static encrypt(data: string): string {
    const secretKey = REACT_APP_SECRET_KEY;
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  }

  /**
   * Decrypts a given encrypted data using the provided secret key.
   *
   * @param {string} encryptedData - The encrypted data to be decrypted.
   * @returns {string} - The decrypted data.
   */
  static decrypt(encryptedData: string): string {
    const secretKey = REACT_APP_SECRET_KEY;
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
