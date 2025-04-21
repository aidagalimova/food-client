import savedIngredientsStore from './SavedIngredientsStore';

export const useSavedIngredients = () => {
  const {
    savedIngredients,
    handleIngredientToggle,
    hasIngredient,
    addAllRecipeIngredients,
    removeAllRecipeIngredients,
    ingredientsRecipesIds,
    ingredientsByRecipeId,
  } = savedIngredientsStore;

  return {
    savedIngredients,
    hasIngredient,
    handleIngredientToggle,
    addAllRecipeIngredients,
    removeAllRecipeIngredients,
    ingredientsRecipesIds,
    ingredientsByRecipeId,
  };
};
