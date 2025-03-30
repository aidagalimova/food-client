import Text, { TextWeight, TextView, TextTag, TextColor } from 'components/Text';
import { Link } from 'react-router-dom';
import type { ApiError } from 'api/types';
import style from './ErrorText.module.scss';

interface ErrorTextProps {
  error: ApiError;
  link?: string;
  linkText?: string;
}

const ErrorText = ({ error, link, linkText }: ErrorTextProps) => {
  return (
    <div className={style.errorContainer}>
      <Text view={TextView.TITLE} weight={TextWeight.BOLD} tag={TextTag.H1}>
        Ошибка
      </Text>
      <Text view={TextView.P_20} tag={TextTag.P}>
        {error.status} {error.message}
      </Text>
      {link && (
        <Link to={link} className={style.backLink}>
          <Text view={TextView.P_16} color={TextColor.PRIMARY}>
            {linkText}
          </Text>
        </Link>
      )}
    </div>
  );
};

export default ErrorText;
