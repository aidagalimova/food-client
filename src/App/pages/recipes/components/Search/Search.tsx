import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Input from 'components/Input';
import Button from 'components/Button';
import SearchIcon from 'components/icons/SearchIcon';
import { useRecipeFilters } from 'store/recipeFiltersStore';
import { CategoriesDropdown } from './CategoriesDropdown';

import style from './Search.module.scss';

const Search = observer(() => {
  const { searchText, handleSearch } = useRecipeFilters();
  const [localSearchText, setLocalSearchText] = useState('');

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

      <CategoriesDropdown className={style.categoriesDropdown} />
    </section>
  );
});

export default Search;
