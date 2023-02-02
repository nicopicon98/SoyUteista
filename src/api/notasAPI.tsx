import axios from 'axios';


const baseURL = 'https://webservice.uts.edu.co/api/v1/production/soyuteista';

const notasAPI = axios.create({ baseURL })

export default notasAPI;