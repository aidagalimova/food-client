import { axiosApi } from '../api';
import type { RecipeResponse, SingleRecipeResponse } from './types';

interface GetRecipesParams {
  page?: number;
  pageSize?: number;
  searchText?: string;
  categoryIds?: string[];
}

const recipesApi = {
  getRecipes: async ({ searchText, categoryIds, page = 1, pageSize = 9 }: GetRecipesParams = {}) => {
    const response = await axiosApi.get<RecipeResponse>('recipes', {
      params: {
        populate: ['images', 'ingradients'],
        pagination: {
          page,
          pageSize,
        },
        filters: {
          name: {
            $containsi: searchText,
          },
          category: {
            id: {
              $in: categoryIds,
            },
          },
        },
      },
    });
    return response.data;
  },

  getRecipeById: async (id: string) => {
    const response = await axiosApi.get<SingleRecipeResponse>(`recipes/${id}`, {
      params: {
        populate: ['ingradients', 'equipments', 'directions.image', 'images', 'category'],
      },
    });
    return response.data;
  },
};

export default recipesApi;
