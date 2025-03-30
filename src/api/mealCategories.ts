import { axiosApi } from './api';
import type { CategoryResponse } from './types';

export const mealCategoriesApi = {
  getCategories: async () => {
    const response = await axiosApi.get<CategoryResponse>('meal-categories');
    return response.data;
  },
};
