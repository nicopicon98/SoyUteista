import axios from 'axios';

const baseURL = 'https://www.uts.edu.co/sitio/wp-json/last-post/v2/category';

const mantenteAlDiaAPI = axios.create({ baseURL })
// mantenteAlDiaAPI.defaults.timeout = 5000
export default mantenteAlDiaAPI;