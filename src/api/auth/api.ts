import { axiosApi } from '../api';
import { AuthResponse, LoginRequest, RegisterRequest } from './types';

export const auth = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosApi.post<AuthResponse>('/auth/local/register', data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosApi.post<AuthResponse>('/auth/local', data);
    return response.data;
  },
};
