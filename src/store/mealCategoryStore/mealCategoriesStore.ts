import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import mealCategoriesApi, { Category } from 'api/mealCategories';
import type { ApiError } from 'api/types';
import type { Option } from 'components/MultiDropdown';

class MealCategoriesStore {
  categories: Category[] = [];
  isLoading: boolean = false;
  error: ApiError | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchCategories = async () => {
    this.isLoading = true;
    this.error = null;

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
  };

  get categoryOptions(): Option[] {
    return this.categories.map((category) => ({
      key: category.id.toString(),
      value: category.title,
    }));
  }
}

export default new MealCategoriesStore();
