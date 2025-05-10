import { makeObservable, observable, action, computed, runInAction } from 'mobx';
import { Ingredient } from 'api/recipes/types';

const STORAGE_KEY = 'savedIngredients';

class SavedIngredientsStore {
  // ключ - id рецепта, значение - объект с id ингредиентов и ингредиентами
  savedIngredients: { [key: string]: { [key: number]: Ingredient } } = observable.object({});

  constructor() {
    makeObservable(this, {
      savedIngredients: observable,

      ingredientsRecipesIds: computed,

      ingredientsByRecipeId: action.bound,
      handleIngredientToggle: action.bound,
      hasIngredient: action.bound,
      addAllRecipeIngredients: action.bound,
      removeAllRecipeIngredients: action.bound,
    });

    this.loadFromStorage();
  }

  private loadFromStorage() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return;

    const parsedData = JSON.parse(savedData);
    this.savedIngredients = parsedData;
  }

  private saveToStorage() {
    const data = Object.fromEntries(Object.entries(this.savedIngredients));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  get ingredientsRecipesIds() {
    return Object.keys(this.savedIngredients);
  }

  ingredientsByRecipeId(recipeId: string) {
    return Object.values(this.savedIngredients[recipeId] || {});
  }

  hasIngredient(ingredientId: number, recipeId: string): boolean {
    const recipeIngredients = this.savedIngredients[recipeId];
    return !!(recipeIngredients && recipeIngredients[ingredientId]);
  }

  handleIngredientToggle(ingredient: Ingredient, recipeId: string, servingsMultiplier: number = 1) {
    runInAction(() => {
      if (!this.savedIngredients[recipeId]) {
        const adjustedIngredient = {
          ...ingredient,
          amount: ingredient.amount * servingsMultiplier,
        };
        this.savedIngredients[recipeId] = { [ingredient.id]: adjustedIngredient };
        this.saveToStorage();
        return;
      }

      const ingredients = { ...this.savedIngredients };

      if (ingredients[recipeId][ingredient.id]) {
        delete ingredients[recipeId][ingredient.id];
        if (!Object.keys(ingredients[recipeId]).length) {
          delete ingredients[recipeId];
        }
      } else {
        const adjustedIngredient = {
          ...ingredient,
          amount: ingredient.amount * servingsMultiplier,
        };
        ingredients[recipeId][ingredient.id] = adjustedIngredient;
      }

      this.savedIngredients = ingredients;
      this.saveToStorage();
    });
  }

  addAllRecipeIngredients(ingredients: Ingredient[], recipeId: string, servingsMultiplier: number = 1) {
    runInAction(() => {
      const recipeIngredients = ingredients.reduce((acc, ingredient) => {
        const adjustedIngredient = {
          ...ingredient,
          amount: ingredient.amount * servingsMultiplier,
        };
        return { ...acc, [ingredient.id]: adjustedIngredient };
      }, {});

      this.savedIngredients = { ...this.savedIngredients, [recipeId]: recipeIngredients };
      this.saveToStorage();
    });
  }

  removeAllRecipeIngredients(recipeId: string) {
    runInAction(() => {
      delete this.savedIngredients[recipeId];
      this.saveToStorage();
    });
  }
}

export default new SavedIngredientsStore();
