import axios from 'axios';

const baseURL = 'https://cafe-react-native-nicolas.herokuapp.com/api';

const cafeApi = axios.create({baseURL})

export default cafeApi;