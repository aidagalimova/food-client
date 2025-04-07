import { AxiosError } from 'axios';
import { action, makeObservable, observable, runInAction } from 'mobx';
import recipesApi, { FullRecipe } from 'api/recipes';
import type { ApiError } from 'api/types';

class RecipeStore {
  recipe: FullRecipe | null = null;
  isLoading: boolean = false;
  error: ApiError | null = null;

  constructor() {
    makeObservable(this, {
      recipe: observable.ref,
      isLoading: observable,
      error: observable,

      fetchRecipeById: action.bound,
      clearSelectedRecipe: action.bound,
    });
  }

  async fetchRecipeById(id: string) {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    try {
      const response = await recipesApi.getRecipeById(id);

      runInAction(() => {
        this.recipe = response.data;
        this.isLoading = false;
      });

      return response;
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof AxiosError && error.response?.data.error;
        this.isLoading = false;
      });
    }
  }

  clearSelectedRecipe() {
    this.recipe = null;
  }
}

export default new RecipeStore();
