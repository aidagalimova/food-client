import { makeAutoObservable } from 'mobx';
import { PaginationMeta } from 'api/types';

const PAGE_SIZE = 9;

export enum FilterParams {
  Search = 'search',
  CategoryIds = 'categoryIds',
  Page = 'page',
}

class RecipeFiltersStore {
  searchText: string = '';
  selectedCategoryIds: string[] = [];

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
    this.searchText = params.get(FilterParams.Search) || '';
    this.page = Number(params.get(FilterParams.Page)) || 1;
    this.selectedCategoryIds = params.get(FilterParams.CategoryIds)?.split(',') || [];
  };

  get selectedCategoryIdsStr() {
    return this.selectedCategoryIds.join(',');
  }
}

export default new RecipeFiltersStore();
