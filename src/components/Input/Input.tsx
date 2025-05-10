import clsx from 'clsx';

import style from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
};

const Input = ({ value, onChange, afterSlot, className, ...props }: InputProps) => {
  return (
    <div className={clsx(style.inputContainer, className)}>
      <input
        className={clsx(style.input, { [style.withAfterSlot]: !!afterSlot })}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        {...props}
      />

      {afterSlot && <div className={style.afterSlot}>{afterSlot}</div>}
    </div>
  );
};

export default Input;
