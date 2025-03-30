import clsx from 'clsx';

import style from './Loader.module.scss';
import { LoaderSize } from './Loader.types';

export type LoaderProps = {
  size?: LoaderSize;
  className?: string;
};

const Loader = ({ size = LoaderSize.Large, className }: LoaderProps) => {
  return (
    <div className={clsx(style.loaderContainer, className)}>
      <div className={clsx(style.loader, style[size])} />
    </div>
  );
};

export default Loader;
