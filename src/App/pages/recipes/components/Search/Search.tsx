import { useCallback, useEffect, useMemo, useState } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import SearchIcon from 'components/icons/SearchIcon';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import mealCategoriesApi from 'api/mealCategories';
import { useAddSearchParam } from 'utils/useAddSearchParams';

import style from './Search.module.scss';

const Search = () => {
  const [allCategories, setAllCategories] = useState<Option[]>([]);

  const [searchParams, addSearchParam] = useAddSearchParam();

  const searchText = useMemo(() => searchParams.get('search') || '', [searchParams]);

  const selectedCategories = useMemo(() => {
    const selectedCategoryIds = searchParams.get('categoryIds')?.split(',') || [];

    return allCategories.filter((category) => selectedCategoryIds.includes(category.key));
  }, [allCategories, searchParams]);

  const [localSearchText, setLocalSearchText] = useState(searchText);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await mealCategoriesApi.getCategories();
      setAllCategories(categories.data.map((category) => ({ key: category.id.toString(), value: category.title })));
    };

    fetchCategories();
  }, []);

  const handleSearch = () => {
    addSearchParam('search', localSearchText);
  };

  const handleDropdownChange = useCallback((value: Option[]) => {
    addSearchParam('categoryIds', value.map((category) => category.key.toString()).join(','));
  }, []);

  const handleDropdownGetTitle = useCallback((value: Option[]) => {
    if (!selectedCategories.length) return 'Categories';
    return value.map((category) => category.value).join(', ');
  }, []);

  return (
    <section className={style.search}>
      <div className={style.searchInput}>
        <Input
          placeholder={'Enter dishes'}
          value={localSearchText}
          onChange={(value: string) => setLocalSearchText(value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />

        <Button
          className={style.searchButton}
          onClick={handleSearch}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        >
          <SearchIcon />
        </Button>
      </div>

      <div className={style.categoriesDropdown}>
        <MultiDropdown
          options={allCategories}
          value={selectedCategories}
          onChange={handleDropdownChange}
          getTitle={handleDropdownGetTitle}
        />
      </div>
    </section>
  );
};

export default Search;
