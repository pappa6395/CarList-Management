import axios from 'axios';
import { BACKEND_URL } from '../config';

const API = axios.create({
  baseURL: `${BACKEND_URL}/api/cars`,
});

export default API;
