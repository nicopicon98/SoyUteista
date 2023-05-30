import axios from 'axios';
import {PROD_UTS_WEBSERVICE_API_BASE_URL, X_WebServiceUTSAPI_Key} from '@env';

export const webserviceAPI = axios.create({
  baseURL: PROD_UTS_WEBSERVICE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'X-WebServiceUTSAPI-Key': X_WebServiceUTSAPI_Key,
  },
});
