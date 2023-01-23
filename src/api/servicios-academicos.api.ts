import axios from 'axios';

const baseURL = 'http://192.168.1.57:9091';
// const baseURL = 'https://webservice.uts.edu.co/endpoint/development';

export const serviciosAPI = axios.create({ baseURL })
