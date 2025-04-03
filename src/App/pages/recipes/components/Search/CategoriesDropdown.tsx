import { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import { useMealCategories } from 'store/mealCategoryStore';
import { useRecipeFilters } from 'store/recipeFiltersStore';

type CategoriesDropdownProps = {
  className?: string;
};

export const CategoriesDropdown = observer(({ className }: CategoriesDropdownProps) => {
  const { categoryOptions } = useMealCategories();
  const { selectedCategoryIds, handleCategoryChange } = useRecipeFilters();

  const selectedCategories = useMemo(() => {
    if (!selectedCategoryIds) return [];
    return categoryOptions.filter((category) => selectedCategoryIds.includes(category.key));
  }, [categoryOptions, selectedCategoryIds]);

  const handleDropdownChange = useCallback(
    (value: Option[]) => {
      handleCategoryChange(value.map((option) => option.key));
    },
    [handleCategoryChange],
  );

  const handleDropdownGetTitle = useCallback((value: Option[]) => {
    if (!value.length) return 'Categories';
    return value.map((category) => category.value).join(', ');
  }, []);

  if (!categoryOptions.length) {
    return null;
  }

  return (
    <MultiDropdown
      className={className}
      options={categoryOptions}
      value={selectedCategories}
      onChange={handleDropdownChange}
      getTitle={handleDropdownGetTitle}
    />
  );
});
