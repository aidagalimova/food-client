import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import recipeFiltersStore, { FilterParams } from './recipeFiltersStore';

export const useRecipeFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    selectedCategoryIds,
    searchText,
    page,
    pageCount,
    setPage,
    setSearchText,
    setSelectedCategories,
    syncWithUrl,
    selectedCategoryIdsStr,
  } = recipeFiltersStore;

  useEffect(() => {
    syncWithUrl(searchParams);
  }, []);

  const updateSearchParams = ({
    key,
    value,
    isPageReset = false,
  }: {
    key: string;
    value: string;
    isPageReset?: boolean;
  }) => {
    setSearchParams((prev: URLSearchParams) => {
      const newParams = new URLSearchParams(prev);
      isPageReset && newParams.set(FilterParams.Page, '1');
      value === '' ? newParams.delete(key) : newParams.set(key, value);
      return newParams;
    });
  };

  const handlePageChange = (page: number) => {
    updateSearchParams({ key: FilterParams.Page, value: page.toString() });
    setPage(page);
  };

  const handleSearch = (text: string) => {
    updateSearchParams({ key: FilterParams.Search, value: text, isPageReset: true });
    setSearchText(text);
    setPage(1);
  };

  const handleCategoryChange = (categoryIds: string[]) => {
    updateSearchParams({ key: FilterParams.CategoryIds, value: categoryIds.join(','), isPageReset: true });
    setSelectedCategories(categoryIds);
    setPage(1);
  };

  return {
    page,
    pageCount,
    selectedCategoryIds,
    selectedCategoryIdsStr,
    searchText,
    handlePageChange,
    handleSearch,
    handleCategoryChange,
  };
};
