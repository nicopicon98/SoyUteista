import axios from 'axios';
import { getValidationError, SnackbarManager, } from '../utilities';

export const AuthInterceptor = () => {
  axios.interceptors.response.use(
    (response) => {
      console.log('response Auth', response);
      SnackbarManager.onSuccess('Success');
      return response;
    },
    (error) => {
      console.log('error Auth', error);
      SnackbarManager.onError(getValidationError(error.code));
      return Promise.reject(error);
    }
  );
};