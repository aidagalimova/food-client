import { useEffect } from 'react';
import mealCategoriesStore from './mealCategoriesStore';

export const useMealCategories = () => {
  const { categoryOptions, isLoading, error, fetchCategories } = mealCategoriesStore;

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categoryOptions,
    isLoading,
    error,
  };
};

export default useMealCategories;
