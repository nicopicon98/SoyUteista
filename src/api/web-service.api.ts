import axios from 'axios';

const baseURL = 'https://webservice.uts.edu.co/endpoint/production';
// const baseURL = 'https://webservice.uts.edu.co/endpoint/development';

export const webserviceAPI = axios.create({ baseURL })
