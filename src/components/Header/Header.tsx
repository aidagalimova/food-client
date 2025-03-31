import { memo, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import Text, { TextView, TextWeight } from 'components/Text';
import LikeIcon from 'components/icons/LikeIcon';
import UserIcon from 'components/icons/UserIcon';
import LogoIcon from 'components/icons/LogoIcon';
import Link from 'components/Link';
import { IconColor } from 'components/icons/Icon';
import MenuIcon from 'components/icons/MenuIcon';
import CrossIcon from 'components/icons/CrossIcon';

import { links } from './Header.const';
import style from './Header.module.scss';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = useMemo(() => {
    return (
      <nav className={style.navigation}>
        <ul className={style.list}>
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.id}>
                <Link to={link.path} name={link.name} isActive={isActive} />
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }, [location.pathname]);

  return (
    <header className={style.header}>
      <div className={style.leftSide}>
        <div className={style.logo} onClick={() => navigate('/recipes')}>
          <LogoIcon />
          <Text view={TextView.P_20} weight={TextWeight.BOLD} nonSelectable>
            Food Client
          </Text>
        </div>

        {navigation}
      </div>

      <div className={style.rightSideIcons}>
        <LikeIcon color={IconColor.ACCENT} />
        <UserIcon color={IconColor.ACCENT} />
      </div>

      {/* Mobile menu */}
      <div className={style.rightSideMenu}>
        {isMobileMenuOpen ? (
          <CrossIcon
            color={IconColor.ACCENT}
            cursor="pointer"
            onClick={() => setIsMobileMenuOpen(false)}
            className={style.crossIcon}
          />
        ) : (
          <MenuIcon color={IconColor.ACCENT} cursor="pointer" onClick={() => setIsMobileMenuOpen(true)} />
        )}
        <div className={clsx(style.mobileMenu, { [style.active]: isMobileMenuOpen })}>{navigation}</div>
        <div
          className={clsx(style.overlay, { [style.active]: isMobileMenuOpen })}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </header>
  );
};

export default memo(Header);
