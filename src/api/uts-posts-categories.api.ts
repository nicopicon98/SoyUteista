import axios from 'axios';
const baseURL = 'https://www.uts.edu.co/sitio/wp-json/last-post/v2/category';
export const utsPostsCategoriesAPI = axios.create({ baseURL })
