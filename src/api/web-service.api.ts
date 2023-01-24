import axios from 'axios';
const baseURL = 'https://webservice.uts.edu.co/endpoint/production';
export const webserviceAPI = axios.create({ baseURL })
