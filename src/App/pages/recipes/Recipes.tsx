import { Fragment } from 'react';
import Banner from './components/Banner';
import RecipesList from './components/RecipesList';
import Search from './components/Search';

import style from './Recipes.module.scss';

const Recipes = () => {
  return (
    <Fragment>
      <header className={style.header}>
        <Banner />
      </header>

      <main className={style.pageContainer}>
        <Search />
        <RecipesList />
      </main>
    </Fragment>
  );
};

export default Recipes;
