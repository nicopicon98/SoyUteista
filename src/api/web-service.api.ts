import axios from 'axios';
import CryptoJS from 'crypto-js';
import {
  PROD_UTS_WEBSERVICE_API_BASE_URL,
  X_WebServiceUTSAPI_Key,
  REACT_APP_SECRET_KEY,
} from '@env';
import {CryptoHelper} from '@src/utilities';

const BIENESTAR_PATH = '/bienestar/';

const webserviceAPI = axios.create({
  baseURL: PROD_UTS_WEBSERVICE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'X-WebServiceUTSAPI-Key': X_WebServiceUTSAPI_Key,
  },
});

webserviceAPI.interceptors.request.use(config => {
  if (config.url?.includes(BIENESTAR_PATH)) {
    if (config.method === 'post' && config.data) {
      const encryptedData = CryptoHelper.encrypt(JSON.stringify(config.data));
      config.data = {content: encryptedData};
    }
  }
  return config;
});

webserviceAPI.interceptors.response.use(
  response => {
    if (response.config.url?.includes(BIENESTAR_PATH)) {
      if (response.data && response.data.content) {
        const decryptedData = JSON.parse(
          CryptoHelper.decrypt(response.data.content),
        );
        response.data = decryptedData;
      }
    }
    return response;
  },
  error => {
    // Handle errors globally here if needed
    console.log(error);
    return Promise.reject(error);
  },
);

export {webserviceAPI};
