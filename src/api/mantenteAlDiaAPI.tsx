import axios from 'axios';

const baseURL = 'https://soyuteista.uts.edu.co/api/v1';

const mantenteAlDiaAPI = axios.create({baseURL})

export default mantenteAlDiaAPI;