import axios from 'axios';

const API_HOST = process.env.REACT_APP_API_HOST;

const apiClient = axios.create({
  baseURL: API_HOST,
});

export default apiClient;
