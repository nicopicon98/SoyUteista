import axios from 'axios';
import { PROD_UTS_WEBSERVICE_API_BASE_URL } from "@env"

export const webserviceAPI = axios.create({ baseURL : PROD_UTS_WEBSERVICE_API_BASE_URL })
