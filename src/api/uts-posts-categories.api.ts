import axios from 'axios';
import { PROD_UTS_POSTS_API_BASE_URL } from "@env"

export const utsPostsCategoriesAPI = axios.create({ baseURL : PROD_UTS_POSTS_API_BASE_URL })
