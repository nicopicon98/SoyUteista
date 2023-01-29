import axios from 'axios';
const baseURL = 'https://webservice.uts.edu.co/api/v1/production/soyuteista';
export const webserviceAPI = axios.create({ baseURL })
