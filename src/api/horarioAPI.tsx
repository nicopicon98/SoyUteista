import axios from 'axios';

const baseURL = 'https://webservice.uts.edu.co/endpoint';

const horarioAPI = axios.create({baseURL})

export default horarioAPI;