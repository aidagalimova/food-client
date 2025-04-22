import { memo, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import Text, { TextView, TextWeight } from 'components/Text';
import UserIcon from 'components/icons/UserIcon';
import LogoIcon from 'components/icons/LogoIcon';
import Link from 'components/Link';
import { IconColor } from 'components/icons/Icon';
import MenuIcon from 'components/icons/MenuIcon';
import CrossIcon from 'components/icons/CrossIcon';
import SignInIcon from 'components/icons/SignInIcon';
import CartIcon from 'components/icons/CartIcon';
import { useAuth } from 'store/rootStore/authStore/useAuth';
import { useProfile } from 'store/rootStore/profileStore';
import { useClickOutside } from 'utils/useClickOutside';

import { links } from './Header.const';
import style from './Header.module.scss';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, handleLogout } = useAuth();

  const { profile } = useProfile();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsProfileMenuOpen(false));

  const handleSignOut = () => {
    handleLogout();
    setIsProfileMenuOpen(false);
  };

  const navigation = useMemo(() => {
    return (
      isAuthenticated && (
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
      )
    );
  }, [location.pathname]);

  return (
    <header className={style.header}>
      <div className={style.leftSide}>
        <div className={style.logo} onClick={() => navigate('/')}>
          <LogoIcon />
          <Text view={TextView.P_20} weight={TextWeight.BOLD} nonSelectable>
            Food Client
          </Text>
        </div>

        {navigation}
      </div>

      <div className={style.rightSideIcons}>
        {isAuthenticated ? (
          <>
            <div className={style.cartIconWrapper}>
              <CartIcon color={IconColor.ACCENT} onClick={() => navigate('/cart')} />
            </div>
            <div ref={ref} className={style.profileMenuWrapper}>
              <UserIcon color={IconColor.ACCENT} onClick={() => setIsProfileMenuOpen(true)} />
              {isProfileMenuOpen && (
                <div className={style.profileMenu}>
                  <div className={style.profileMenuItem} onClick={() => navigate('/profile')}>
                    <Text view={TextView.P_16}>My Profile ({profile?.username})</Text>
                  </div>
                  <div className={style.profileMenuItem} onClick={handleSignOut}>
                    <Text view={TextView.P_16}>Logout</Text>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <SignInIcon color={IconColor.ACCENT} onClick={() => navigate('/login')} />
        )}
      </div>

      {/* Mobile menu */}
      <div className={style.rightSideMenu}>
        {isAuthenticated && (
          <>
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
          </>
        )}
      </div>
    </header>
  );
};

export default memo(Header);
