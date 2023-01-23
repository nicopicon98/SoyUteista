import axios from 'axios';

// const baseURL = 'https://tutorias.uts.edu.co/api/v1';
const baseURL = 'https://tutorias.uts.edu.co/api/v2';

export const tutoriasAPI = axios.create({ baseURL })
