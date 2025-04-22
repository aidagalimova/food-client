import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

import rootStore from '../instance';

export const useQueryParamsStoreInit = (): void => {
  const { search } = useLocation();
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    rootStore.query.setSearch(search);
    rootStore.query.setUrlUpdater(setSearchParams);

    return () => {
      rootStore.query.setUrlUpdater(null);
      rootStore.query.clearParams();
    };
  }, [search, setSearchParams]);
};
