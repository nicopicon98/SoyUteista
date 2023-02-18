import axios from 'axios';
import { PROD_UTS_SOY_UTEISTA_API_BASE_URL } from "@env"

export const revistaAPI = axios.create({ baseURL : PROD_UTS_SOY_UTEISTA_API_BASE_URL })
