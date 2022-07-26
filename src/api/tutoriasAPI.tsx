import axios from 'axios';

const baseURL = 'https://tutorias.uts.edu.co/api/v1';

const tutoriasAPI = axios.create({ baseURL })

export default tutoriasAPI;