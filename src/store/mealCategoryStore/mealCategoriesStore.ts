import { AxiosError } from 'axios';
import { runInAction, makeObservable, observable, action, computed } from 'mobx';
import mealCategoriesApi, { Category } from 'api/mealCategories';
import type { ApiError } from 'api/types';
import type { Option } from 'components/MultiDropdown';

class MealCategoriesStore {
  categories: Category[] = [];
  isLoading: boolean = false;
  error: ApiError | null = null;

  constructor() {
    makeObservable(this, {
      categories: observable.ref,
      isLoading: observable,
      error: observable,

      fetchCategories: action.bound,

      categoryOptions: computed,
    });
  }

  async fetchCategories() {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    try {
      const response = await mealCategoriesApi.getCategories();
      runInAction(() => {
        this.categories = response.data;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof AxiosError && error.response?.data.error;
        this.isLoading = false;
      });
    }
  }

  get categoryOptions(): Option[] {
    return this.categories.map((category) => ({
      key: category.id.toString(),
      value: category.title,
    }));
  }
}

export default new MealCategoriesStore();
