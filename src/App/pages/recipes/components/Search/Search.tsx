import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Input from 'components/Input';
import Button from 'components/Button';
import SearchIcon from 'components/icons/SearchIcon';
import { FilterIcon } from 'components/icons/FilterIcon';
import { useRecipeFilters } from 'store/recipeFiltersStore';
import { CategoriesDropdown } from './CategoriesDropdown';
import { AdditionalFilters } from './AdditionalFilters';

import style from './Search.module.scss';

const Search = observer(() => {
  const { searchText, handleSearch } = useRecipeFilters();
  const [localSearchText, setLocalSearchText] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setLocalSearchText(searchText);
  }, [searchText]);

  const handleSearchClick = () => {
    handleSearch(localSearchText);
  };

  return (
    <section className={style.search}>
      <div className={style.searchInput}>
        <Input
          placeholder={'Enter dishes'}
          value={localSearchText}
          onChange={(value: string) => setLocalSearchText(value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchClick();
            }
          }}
        />
        <Button className={style.searchButton} onClick={handleSearchClick}>
          <SearchIcon />
        </Button>
      </div>

      <div className={style.filters}>
        <CategoriesDropdown className={style.categoriesDropdown} />
        <FilterIcon className={style.filterIcon} onClick={() => setIsFilterOpen(!isFilterOpen)} />
      </div>

      <AdditionalFilters isOpen={isFilterOpen} />
    </section>
  );
});

export default Search;
