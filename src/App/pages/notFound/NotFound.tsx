import Text, { TextView, TextWeight } from 'components/Text';
import Link from 'components/Link';

import style from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={style.notFound}>
      <Text view={TextView.TITLE} weight={TextWeight.BOLD}>
        404 - Страница не найдена
      </Text>

      <Text view={TextView.P_16}>Запрашиваемая страница не существует.</Text>

      <Link to="/recipes" name="Перейти к рецептам" decoration="underline" />
    </div>
  );
};

export default NotFound;
