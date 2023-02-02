import axios from 'axios';

const baseURL = 'https://webservice.uts.edu.co/api/v1/production/soyuteista';
// const baseURL = 'https://webservice.uts.edu.co/endpoint/development';

const carnetAPI = axios.create({ baseURL })

export default carnetAPI;