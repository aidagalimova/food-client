import clsx from 'clsx';

import style from './Input.module.scss';
import useDebounce from 'utils/useDebounce';
import { useEffect, useState } from 'react';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
  debounced?: boolean;
};

const Input = ({ value, onChange, afterSlot, className, debounced, ...props }: InputProps) => {
  const [localValue, setLocalValue] = useState(value);

  const debouncedValue = debounced ? useDebounce(localValue, 300) : localValue;

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className={clsx(style.inputContainer, className)}>
      <input
        className={clsx(style.input, { [style.withAfterSlot]: !!afterSlot })}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        {...props}
        type="text"
      />

      {afterSlot && <div className={style.afterSlot}>{afterSlot}</div>}
    </div>
  );
};

export default Input;
