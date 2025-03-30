import clsx from 'clsx';
import Icon from '../icons/Icon';

import style from './CheckBox.module.scss';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'checked'> & {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange, className, ...props }) => {
  return (
    <div className={clsx(style.checkboxContainer, className)}>
      {checked && (
        <Icon className={style.icon} width="40" height="40" fill="none">
          <path d="M6.66663 19.3548L16.4625 30L33.3333 11.6667" stroke="currentColor" stroke-width="3.33333" />
        </Icon>
      )}

      <input
        {...props}
        className={style.checkbox}
        type={'checkbox'}
        checked={checked}
        onChange={() => onChange(!checked)}
      />
    </div>
  );
};

export default CheckBox;
