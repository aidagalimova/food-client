import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import recipesApi, { FullRecipe } from 'api/recipes';
import type { ApiError } from 'api/types';

class RecipeStore {
  recipe: FullRecipe | null = null;
  isLoading: boolean = false;
  error: ApiError | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchRecipeById = async (id: string) => {
    this.isLoading = true;
    this.error = null;

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
  };

  clearSelectedRecipe = () => {
    this.recipe = null;
  };
}

export default new RecipeStore();
