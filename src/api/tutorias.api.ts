import axios, { AxiosInstance } from 'axios';
import { PROD_UTS_TUTORIAS_API_BASE_URL } from "@env"

export const tutoriasAPI: AxiosInstance = axios.create({
  baseURL: PROD_UTS_TUTORIAS_API_BASE_URL,
  timeout: 10000,
})

tutoriasAPI.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      // Handle 401 Unauthorized error, e.g. redirect to login page or refresh token
      console.log(error, 'error 401 desde interceptor')
    } else if (status === 403) {
      // Handle 403 Forbidden error, e.g. show an error message or redirect to a 403 page
      console.log(error, 'error 403 desde interceptor')
    } else if (status === 404) {
      // Handle 404 Not Found error, e.g. show an error message or redirect to a 404 page
      console.log(error, 'error 404 desde interceptor')
    } else {
      // Handle other errors, e.g. show an error message or log the error
      console.log(error, 'error desde interceptor otro error')
    }
    return Promise.reject(error);
  }
);
