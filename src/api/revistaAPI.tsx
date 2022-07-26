import axios from 'axios';

const baseURL = 'https://soyuteista.uts.edu.co/revista/notAnEndpoint';

const revistaApi = axios.create({ baseURL })

export default revistaApi;