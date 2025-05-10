import { useEffect } from 'react';
import { useRecipeFilters } from 'store/recipeFiltersStore';
import recipesStore from './recipesStore';

export const useRecipes = (recipeIds?: string[]) => {
  const { recipes, recipesByIds, isLoading, error, fetchRecipes, fetchRecipesByIds } = recipesStore;

  const { searchText, selectedCategoryIdsStr, page, rating, totalTime, cookingTime, preparationTime, vegetarian } =
    useRecipeFilters();

  useEffect(() => {
    if (recipeIds) {
      fetchRecipesByIds(recipeIds);
    }
  }, []);

  useEffect(() => {
    if (!recipeIds) {
      fetchRecipes();
    }
  }, [
    searchText,
    selectedCategoryIdsStr,
    page,
    rating,
    totalTime,
    cookingTime,
    preparationTime,
    vegetarian,
    recipeIds,
  ]);

  return {
    recipes,
    recipesByIds,
    isLoading,
    error,
  };
};
