import { useEffect } from 'react';
import recipeFiltersStore from './recipeFiltersStore';

export const MIN_RATING = 0;
export const MAX_RATING = 5;

export const useRecipeFilters = () => {
  const {
    searchText,
    selectedCategoryIds,
    selectedCategoryIdsStr,
    rating,
    vegetarian,
    totalTime,
    cookingTime,
    preparationTime,
    page,
    pageCount,

    setSearchText,
    setSelectedCategories,
    setRating,
    setAdditionalFilters,
    setPage,
    syncWithUrl,
  } = recipeFiltersStore;

  useEffect(() => {
    syncWithUrl();
  }, []);

  return {
    searchText,
    selectedCategoryIds,
    selectedCategoryIdsStr,
    rating,
    vegetarian,
    totalTime,
    cookingTime,
    preparationTime,
    page,
    pageCount,

    setSearchText,
    setSelectedCategories,
    setRating,
    setAdditionalFilters,
    setPage,
  };
};
