import Text, { TextView, TextWeight } from 'components/Text';
import Link from 'components/Link';

import style from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={style.notFound}>
      <Text view={TextView.TITLE} weight={TextWeight.BOLD}>
        404 - Page Not Found
      </Text>

      <Text view={TextView.P_16}>The requested page does not exist.</Text>

      <Link to="/recipes" name="Go to recipes" decoration="underline" />
    </div>
  );
};

export default NotFound;
