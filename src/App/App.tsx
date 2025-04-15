import { Suspense } from 'react';
import Header from 'components/Header';
import Loader from 'components/Loader';
import { useQueryParamsStoreInit } from 'store/rootStore/queryParamsStore';

import style from './App.module.scss';
import Routes from './routing/Routes';

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
          <Routes />
        </Suspense>
      </div>
    </>
  );
}

export default App;
