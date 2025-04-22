import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from 'components/Header';
import Loader from 'components/Loader';
import { useQueryParamsStoreInit } from 'store/rootStore/queryParamsStore';

import style from './App.module.scss';

const LazyRecipes = React.lazy(() => import('./pages/recipes'));
const LazyRecipe = React.lazy(() => import('./pages/recipe'));
const LazyNotFound = React.lazy(() => import('./pages/notFound'));
const LazyMain = React.lazy(() => import('./pages/main'));

function App() {
  useQueryParamsStoreInit();

  return (
    <>
      <Header />
      <div className={style.pageContainer}>
        <Suspense
          fallback={
            <div className={style.loaderContainer}>
              <Loader />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<LazyMain />} />
            <Route path="/recipes" element={<LazyRecipes />} />
            <Route path="/recipes/:id" element={<LazyRecipe />} />
            <Route path="*" element={<LazyNotFound />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
