import axios from 'axios';
import qs from 'qs';

export const axiosApi = axios.create({
  baseURL: process.env.API_URL,
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
