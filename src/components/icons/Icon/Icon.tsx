import clsx from 'clsx';
import { IconColor } from './Icon.types';

import style from './Icon.module.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: IconColor;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({ className, children, color, ...props }) => {
  return (
    <svg {...props} className={clsx(color && style[color], className)}>
      {children}
    </svg>
  );
};

export default Icon;
