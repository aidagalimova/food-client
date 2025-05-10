import clsx from 'clsx';
import Loader, { LoaderSize } from '../Loader';
import Text, { TextView } from '../Text';

import style from './Button.module.scss';

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

const Button = ({ loading, children, className, variant = ButtonVariant.PRIMARY, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={clsx(style.btn, className, {
        [style.loading]: loading,
        [style.secondary]: variant === ButtonVariant.SECONDARY,
      })}
    >
      {loading && <Loader size={LoaderSize.Small} className={style.btnLoader} />}

      <Text view={TextView.BUTTON} className={style.text}>
        {children}
      </Text>
    </button>
  );
};

export default Button;
