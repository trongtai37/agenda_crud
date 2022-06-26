import Axios from 'axios';
import { API_BASE_URL } from '../constants';

const API = Axios.create({
  baseURL: API_BASE_URL,
});

export { API };
