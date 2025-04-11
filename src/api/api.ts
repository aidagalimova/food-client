import axios from 'axios';
import qs from 'qs';

export const axiosApi = axios.create({
  baseURL: process.env.API_URL,
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
  },
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.TOKEN}`,
  },
});
