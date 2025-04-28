import axios from 'axios';
import { VITE_BACKEND_URL } from '../config';

const API = axios.create({
  baseURL: `${VITE_BACKEND_URL}/api/cars`,
});

export default API;
