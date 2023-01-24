import axios from 'axios';
const baseURL = 'http://192.168.1.57:9091';
export const serviciosAPI = axios.create({ baseURL })
