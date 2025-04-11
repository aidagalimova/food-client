import { AxiosError } from 'axios';
import { action, makeObservable, observable, runInAction } from 'mobx';
import recipesApi, { Recipe } from 'api/recipes';
import type { ApiError } from 'api/types';
import { recipeFiltersStore } from 'store/recipeFiltersStore';

class RecipesStore {
  recipes: Recipe[] = [];
  isLoading: boolean = false;
  error: ApiError | null = null;

  constructor() {
    makeObservable(this, {
      recipes: observable.ref,
      isLoading: observable,
      error: observable.ref,

      fetchRecipes: action.bound,
    });
  }

  async fetchRecipes() {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    try {
      const response = await recipesApi.getRecipes({
        searchText: recipeFiltersStore.searchText,
        categoryIds: recipeFiltersStore.selectedCategoryIds,
        page: recipeFiltersStore.page,
        pageSize: recipeFiltersStore.pageSize,
        rating: recipeFiltersStore.rating,
        totalTime: recipeFiltersStore.totalTime,
        cookingTime: recipeFiltersStore.cookingTime,
        preparationTime: recipeFiltersStore.preparationTime,
        vegetarian: recipeFiltersStore.vegetarian,
      });

      runInAction(() => {
        this.recipes = response.data;
        this.isLoading = false;
        recipeFiltersStore.setPaginationInfo(response.meta.pagination);
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof AxiosError && error.response?.data.error;
        this.isLoading = false;
      });
    }
  }
}

export default new RecipesStore();
