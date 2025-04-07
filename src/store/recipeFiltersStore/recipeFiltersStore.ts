import { makeObservable, observable, action, computed, reaction, IReactionDisposer } from 'mobx';
import { PaginationMeta } from 'api/types';
import rootStore from 'store/rootStore/instance';
import { FilterParams } from 'store/rootStore/queryParamsStore';

const PAGE_SIZE = 9;

type AdditionalFilters = {
  rating: number | null;
  vegetarian: boolean;
  totalTime: number | null;
  cookingTime: number | null;
  preparationTime: number | null;
};
class RecipeFiltersStore {
  searchText: string = '';
  selectedCategoryIds: string[] = [];
  rating: number | null = null;
  vegetarian: boolean = false;
  totalTime: number | null = null;
  cookingTime: number | null = null;
  preparationTime: number | null = null;

  pageSize = PAGE_SIZE;
  page = 1;
  pageCount = 1;
  total = 1;

  private disposers: IReactionDisposer[] = [];

  constructor() {
    makeObservable(this, {
      searchText: observable,
      selectedCategoryIds: observable.ref,
      rating: observable,
      vegetarian: observable,
      totalTime: observable,
      cookingTime: observable,
      preparationTime: observable,
      page: observable,
      pageCount: observable,

      setPaginationInfo: action.bound,
      setSearchText: action.bound,
      setSelectedCategories: action.bound,
      setRating: action.bound,
      setTotalTime: action.bound,
      setCookingTime: action.bound,
      setPreparationTime: action.bound,
      setVegetarian: action.bound,
      setPage: action.bound,
      syncWithUrl: action.bound,
      setAdditionalFilters: action.bound,
      destroy: action.bound,

      selectedCategoryIdsStr: computed,
    });

    this.disposers.push(
      reaction(
        () => this.page,
        (newPage) => {
          rootStore.query.setParam(FilterParams.Page, newPage.toString());
        },
      ),
    );

    this.disposers.push(
      reaction(
        () => this.searchText,
        (newSearchText) => {
          rootStore.query.setParam(FilterParams.Search, newSearchText);
        },
      ),
    );

    this.disposers.push(
      reaction(
        () => this.selectedCategoryIds,
        (newSelectedCategoryIds) => {
          rootStore.query.setParam(FilterParams.CategoryIds, newSelectedCategoryIds.join(','));
        },
      ),
    );

    this.disposers.push(
      reaction(
        () => this.rating,
        (newRating) => {
          rootStore.query.setParam(FilterParams.Rating, newRating?.toString());
        },
      ),
    );

    this.disposers.push(
      reaction(
        () => this.totalTime,
        (newTotalTime) => {
          rootStore.query.setParam(FilterParams.TotalTime, newTotalTime?.toString());
        },
      ),
    );

    this.disposers.push(
      reaction(
        () => this.cookingTime,
        (newCookingTime) => {
          rootStore.query.setParam(FilterParams.CookingTime, newCookingTime?.toString());
        },
      ),
    );

    this.disposers.push(
      reaction(
        () => this.preparationTime,
        (newPreparationTime) => {
          rootStore.query.setParam(FilterParams.PreparationTime, newPreparationTime?.toString());
        },
      ),
    );

    this.disposers.push(
      reaction(
        () => this.vegetarian,
        (isVegetarian) => {
          rootStore.query.setParam(FilterParams.Vegetarian, isVegetarian ? 'true' : '');
        },
      ),
    );
  }

  destroy() {
    this.disposers.forEach((dispose) => dispose());
    this.disposers = [];
  }

  setSearchText(text: string) {
    this.searchText = text;
    this.resetPage();
  }

  setSelectedCategories(categoryIds: string[]) {
    this.selectedCategoryIds = categoryIds;
    this.resetPage();
  }

  setRating(rating: number | null) {
    this.rating = rating;
    this.resetPage();
  }

  setTotalTime(time: number | null) {
    this.totalTime = time;
    this.resetPage();
  }

  setCookingTime(time: number | null) {
    this.cookingTime = time;
    this.resetPage();
  }

  setPreparationTime(time: number | null) {
    this.preparationTime = time;
    this.resetPage();
  }

  setVegetarian(isVegetarian: boolean) {
    this.vegetarian = isVegetarian;
    this.resetPage();
  }

  setPage(page: number) {
    this.page = page;
  }

  resetPage() {
    this.setPage(1);
  }

  setPaginationInfo(paginationInfo: PaginationMeta) {
    this.pageCount = paginationInfo.pageCount;
    this.total = paginationInfo.total;
    this.pageSize = paginationInfo.pageSize;
    this.pageCount = paginationInfo.pageCount;
  }

  setAdditionalFilters(additionalFilters: AdditionalFilters) {
    this.setRating(additionalFilters.rating);
    this.setTotalTime(additionalFilters.totalTime);
    this.setCookingTime(additionalFilters.cookingTime);
    this.setPreparationTime(additionalFilters.preparationTime);
    this.setVegetarian(additionalFilters.vegetarian);
  }

  syncWithUrl() {
    this.page = Number(rootStore.query.getParam(FilterParams.Page)) || 1;
    this.searchText = rootStore.query.getParam(FilterParams.Search)?.toString() || '';
    this.selectedCategoryIds = rootStore.query.getParam(FilterParams.CategoryIds)?.toString().split(',') || [];
    this.rating = Number(rootStore.query.getParam(FilterParams.Rating)) || null;
    this.totalTime = Number(rootStore.query.getParam(FilterParams.TotalTime)) || null;
    this.cookingTime = Number(rootStore.query.getParam(FilterParams.CookingTime)) || null;
    this.preparationTime = Number(rootStore.query.getParam(FilterParams.PreparationTime)) || null;
    this.vegetarian = !!rootStore.query.getParam(FilterParams.Vegetarian);
  }

  get selectedCategoryIdsStr() {
    return this.selectedCategoryIds.join(',');
  }
}

export default new RecipeFiltersStore();
