import axios from 'axios';
import { PROD_UTS_TUTORIAS_API_BASE_URL } from "@env"

export const tutoriasAPI = axios.create({ baseURL : PROD_UTS_TUTORIAS_API_BASE_URL })
