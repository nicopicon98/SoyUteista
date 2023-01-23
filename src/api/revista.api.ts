import axios from 'axios';

const baseURL = 'https://soyuteista.uts.edu.co/revista/notAnEndpoint';

export const revistaApi = axios.create({ baseURL })
