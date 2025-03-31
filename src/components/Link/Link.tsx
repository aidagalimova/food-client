import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import Text, { TextView, TextWeight } from 'components/Text';
import style from './Link.module.scss';

type LinkProps = {
  to: string;
  name: string;
  isActive?: boolean;
  decoration?: 'none' | 'underline';
  className?: string;
};

const Link = ({ to, name, isActive, decoration = 'none', className }: LinkProps) => {
  return (
    <RouterLink
      to={to}
      className={clsx(style.link, className, {
        [style.activeLink]: isActive,
        [style.underline]: decoration === 'underline',
      })}
    >
      <Text view={TextView.P_16} weight={isActive ? TextWeight.SEMIBOLD : TextWeight.NORMAL} nonSelectable>
        {name}
      </Text>
    </RouterLink>
  );
};

export default Link;
