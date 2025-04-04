import { RefObject, useEffect } from 'react';
import { useLatest } from 'utils/useLatest';

export const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handleOnClickOutside: (event: MouseEvent) => void,
) => {
  const cbRef = useLatest(handleOnClickOutside);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      cbRef.current(event);
    };

    document.addEventListener('pointerdown', listener);

    return () => {
      document.removeEventListener('pointerdown', listener);
    };
  }, [ref, cbRef]);
};
