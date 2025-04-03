import { useEffect } from 'react';
import { useRecipeFilters } from 'store/recipeFiltersStore';
import recipesStore from './recipesStore';

export const useRecipes = () => {
  const { fetchRecipes, recipes, isLoading, error } = recipesStore;
  const { searchText, selectedCategoryIdsStr, page } = useRecipeFilters();

  useEffect(() => {
    fetchRecipes();
  }, [searchText, selectedCategoryIdsStr, page]);

  return {
    recipes,
    isLoading,
    error,
  };
};
