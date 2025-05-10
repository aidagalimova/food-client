import { Suspense } from 'react';
import Header from 'components/Header';
import PageLoader from 'components/PageLoader';
import { useQueryParamsStoreInit } from 'store/rootStore/queryParamsStore';

import style from './App.module.scss';
import Routes from './routing/Routes';

function App() {
  useQueryParamsStoreInit();

  return (
    <>
      <Header />
      <div className={style.pageContainer}>
        <Suspense fallback={<PageLoader />}>
          <Routes />
        </Suspense>
      </div>
    </>
  );
}

export default App;
