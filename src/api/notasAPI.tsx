import axios from 'axios';

const baseURL = 'http://webservice.uts.edu.co/endpoint/development';
// const baseURL = 'http://webservice.uts.edu.co/endpoint/production';

const notasAPI = axios.create({ baseURL })

export default notasAPI;