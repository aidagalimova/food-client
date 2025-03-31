import { useRef, useLayoutEffect } from 'react';

export const useLatest = <T>(value: T) => {
  const ref = useRef(value);

  useLayoutEffect(() => {
    ref.current = value;
  }, []);

  return ref;
};
