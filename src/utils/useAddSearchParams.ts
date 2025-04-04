import { useSearchParams } from 'react-router-dom';

export const useAddSearchParam = (): [URLSearchParams, (name: string, value: string) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const addSearchParam = (name: string, value: string) => {
    setSearchParams((prev: URLSearchParams) => {
      const newParams = new URLSearchParams(prev);
      newParams.set(name, value);
      return newParams;
    });
  };

  return [searchParams, addSearchParam];
};
