import axios, { AxiosInstance } from 'axios';
import { PROD_UTS_TUTORIAS_API_BASE_URL } from "@env"

export const tutoriasAPI: AxiosInstance = axios.create({
  baseURL: PROD_UTS_TUTORIAS_API_BASE_URL,
  timeout: 10000,
})