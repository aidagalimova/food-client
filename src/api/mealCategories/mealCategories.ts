import { axiosApi } from '../api';
import type { CategoryResponse } from './types';

const mealCategoriesApi = {
  getCategories: async () => {
    const response = await axiosApi.get<CategoryResponse>('meal-categories');
    return response.data;
  },
};

export default mealCategoriesApi;
