import axios from 'axios';

const baseURL = 'https://webservice.uts.edu.co/endpoint/production';
// const baseURL = 'https://webservice.uts.edu.co/endpoint/development';

const horarioAPI = axios.create({ baseURL })

export default horarioAPI;