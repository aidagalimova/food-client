import { useEffect } from 'react';
import recipeStore from './recipeStore';

export const useRecipe = (recipeId?: string) => {
  const { fetchRecipeById, clearSelectedRecipe, recipe, isLoading, error } = recipeStore;

  useEffect(() => {
    if (recipeId) {
      fetchRecipeById(recipeId);
    }

    return () => {
      if (recipeId) {
        clearSelectedRecipe();
      }
    };
  }, [recipeId]);

  return {
    recipe,
    isLoading,
    error,
  };
};
