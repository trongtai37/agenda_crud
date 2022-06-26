import Axios from 'axios';

const API = Axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

export { API };
