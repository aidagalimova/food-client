import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

import rootStore from '../instance';

export const useQueryParamsStoreInit = (): void => {
  const { search } = useLocation();
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    rootStore.query.setSearch(search);
  }, []);

  useEffect(() => {
    rootStore.query.setUrlUpdater(setSearchParams);
  }, [setSearchParams]);
};
