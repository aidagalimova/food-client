import { useEffect } from 'react';
import { useRecipeFilters } from 'store/recipeFiltersStore';
import recipesStore from './recipesStore';

export const useRecipes = () => {
  const { recipes, isLoading, error, fetchRecipes } = recipesStore;

  const { searchText, selectedCategoryIdsStr, page, rating, totalTime, cookingTime, preparationTime, vegetarian } =
    useRecipeFilters();

  useEffect(() => {
    fetchRecipes();
  }, [searchText, selectedCategoryIdsStr, page, rating, totalTime, cookingTime, preparationTime, vegetarian]);

  return {
    recipes,
    isLoading,
    error,
  };
};
