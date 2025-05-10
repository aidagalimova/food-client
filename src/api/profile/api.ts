import { axiosApi } from '../api';
import { UserProfileResponse } from './types';

export const profile = {
  getCurrentUser: async (): Promise<UserProfileResponse> => {
    const response = await axiosApi.get<UserProfileResponse>('/users/me');
    return response.data;
  },
};
