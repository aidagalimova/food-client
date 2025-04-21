import { axiosApi } from '../api';
import type { RecipeResponse, SingleRecipeResponse } from './types';

type GetRecipesParams = {
  page?: number;
  pageSize?: number;
  searchText?: string;
  categoryIds?: string[];
  rating?: number | null;
  totalTime?: number | null;
  cookingTime?: number | null;
  preparationTime?: number | null;
  vegetarian?: boolean | null;
};

const recipesApi = {
  getRecipes: async ({
    searchText,
    categoryIds,
    page = 1,
    pageSize = 9,
    rating = null,
    totalTime = null,
    cookingTime = null,
    preparationTime = null,
    vegetarian = null,
  }: GetRecipesParams = {}) => {
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
          ...(rating && {
            rating: {
              $gte: rating,
            },
          }),
          ...(totalTime && {
            totalTime: {
              $lte: totalTime,
            },
          }),
          ...(cookingTime && {
            cookingTime: {
              $lte: cookingTime,
            },
          }),
          ...(preparationTime && {
            preparationTime: {
              $lte: preparationTime,
            },
          }),
          ...(vegetarian && {
            vegetarian: {
              $eq: vegetarian,
            },
          }),
        },
      },
    });
    return response.data;
  },

  getRecipeById: async (
    id: string,
    populate: string[] = ['ingradients', 'equipments', 'directions.image', 'images', 'category'],
  ) => {
    const response = await axiosApi.get<SingleRecipeResponse>(`recipes/${id}`, {
      params: {
        populate,
      },
    });
    return response.data;
  },
};

export default recipesApi;
