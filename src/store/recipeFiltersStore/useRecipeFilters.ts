import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import recipeFiltersStore, { FilterParams } from './recipeFiltersStore';

export const MIN_RATING = 0;
export const MAX_RATING = 5;

type SearchParams = {
  key: string;
  value?: string;
};

type AdditionalFilters = {
  rating: number | null;
  vegetarian: boolean;
  totalTime: number | null;
  cookingTime: number | null;
  preparationTime: number | null;
};

export const useRecipeFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    selectedCategoryIds,
    searchText,
    page,
    pageCount,
    rating,
    totalTime,
    cookingTime,
    preparationTime,
    vegetarian,
    setPage,
    setSearchText,
    setSelectedCategories,
    setRating,
    setTotalTime,
    setCookingTime,
    setPreparationTime,
    setVegetarian,
    syncWithUrl,
    selectedCategoryIdsStr,
  } = recipeFiltersStore;

  useEffect(() => {
    syncWithUrl(searchParams);
  }, []);

  const updateSearchParams = ({ params, isPageReset = true }: { params: SearchParams[]; isPageReset?: boolean }) => {
    const newParams = new URLSearchParams(searchParams);

    params.forEach(({ key, value }) => {
      if (!value) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    if (isPageReset) {
      newParams.set(FilterParams.Page, '1');
    }

    setSearchParams(newParams);
  };

  const handlePageChange = (page: number) => {
    updateSearchParams({ params: [{ key: FilterParams.Page, value: page.toString() }], isPageReset: false });
    setPage(page);
  };

  const handleSearch = (text: string) => {
    updateSearchParams({ params: [{ key: FilterParams.Search, value: text }] });
    setSearchText(text);
  };

  const handleCategoryChange = (categoryIds: string[]) => {
    updateSearchParams({ params: [{ key: FilterParams.CategoryIds, value: categoryIds.join(',') }] });
    setSelectedCategories(categoryIds);
  };

  const handleAdditionalFiltersChange = (filters: AdditionalFilters) => {
    const vegetarianValue = filters.vegetarian;
    const ratingValue = filters.rating !== MIN_RATING ? filters.rating : null;

    updateSearchParams({
      params: [
        { key: FilterParams.Rating, value: ratingValue?.toString() },
        { key: FilterParams.TotalTime, value: filters.totalTime?.toString() },
        { key: FilterParams.CookingTime, value: filters.cookingTime?.toString() },
        { key: FilterParams.PreparationTime, value: filters.preparationTime?.toString() },
        { key: FilterParams.Vegetarian, value: vegetarianValue ? vegetarianValue.toString() : '' },
      ],
    });

    setRating(ratingValue);
    setVegetarian(vegetarianValue);
    setTotalTime(filters.totalTime);
    setCookingTime(filters.cookingTime);
    setPreparationTime(filters.preparationTime);
    setPage(1);
  };

  return {
    page,
    pageCount,
    selectedCategoryIds,
    selectedCategoryIdsStr,
    searchText,
    rating,
    totalTime,
    cookingTime,
    preparationTime,
    vegetarian,
    handlePageChange,
    handleSearch,
    handleCategoryChange,
    handleAdditionalFiltersChange,
  };
};
