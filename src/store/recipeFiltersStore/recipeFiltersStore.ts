import { makeAutoObservable } from 'mobx';
import { PaginationMeta } from 'api/types';

const PAGE_SIZE = 9;

export enum FilterParams {
  Search = 'search',
  CategoryIds = 'categoryIds',
  Page = 'page',
  Rating = 'rating',
  TotalTime = 'totalTime',
  CookingTime = 'cookingTime',
  PreparationTime = 'preparationTime',
  Vegetarian = 'vegetarian',
}

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

  constructor() {
    makeAutoObservable(this);
  }

  setSearchText = (text: string) => {
    this.searchText = text;
  };

  setSelectedCategories = (categoryIds: string[]) => {
    this.selectedCategoryIds = categoryIds;
  };

  setRating = (rating: number | null) => {
    this.rating = rating;
  };

  setTotalTime = (time: number | null) => {
    this.totalTime = time;
  };

  setCookingTime = (time: number | null) => {
    this.cookingTime = time;
  };

  setPreparationTime = (time: number | null) => {
    this.preparationTime = time;
  };

  setVegetarian = (isVegetarian: boolean) => {
    this.vegetarian = isVegetarian;
  };

  setPage = (page: number) => {
    this.page = page;
  };

  setPaginationInfo = (paginationInfo: PaginationMeta) => {
    this.pageCount = paginationInfo.pageCount;
    this.total = paginationInfo.total;
    this.pageSize = paginationInfo.pageSize;
    this.pageCount = paginationInfo.pageCount;
  };

  syncWithUrl = (params: URLSearchParams) => {
    this.page = Number(params.get(FilterParams.Page)) || 1;

    this.searchText = params.get(FilterParams.Search) || '';
    this.selectedCategoryIds = params.get(FilterParams.CategoryIds)?.split(',') || [];

    this.rating = Number(params.get(FilterParams.Rating)) || null;
    this.totalTime = Number(params.get(FilterParams.TotalTime)) || null;
    this.cookingTime = Number(params.get(FilterParams.CookingTime)) || null;
    this.preparationTime = Number(params.get(FilterParams.PreparationTime)) || null;
    this.vegetarian = !!params.get(FilterParams.Vegetarian);
  };

  get selectedCategoryIdsStr() {
    return this.selectedCategoryIds.join(',');
  }
}

export default new RecipeFiltersStore();
