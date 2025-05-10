import { axiosApi } from '../api';
import { AuthResponse, LoginRequest, RegisterRequest, ChangePasswordRequest } from './types';

export const auth = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosApi.post<AuthResponse>('/auth/local/register', data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosApi.post<AuthResponse>('/auth/local', data);
    return response.data;
  },

  changePassword: async (data: ChangePasswordRequest): Promise<AuthResponse> => {
    const response = await axiosApi.post<AuthResponse>('/auth/change-password', data);
    return response.data;
  },
};
