import clsx from 'clsx';
import Text, { TextView, TextWeight, TextColor } from '../Text';

import style from './Card.module.scss';

export type CardProps = {
  className?: string;
  image: string;
  captionSlot?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  contentSlot?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  actionSlot?: React.ReactNode;
};

const Card = ({ className, image, captionSlot, title, subtitle, contentSlot, onClick, actionSlot }: CardProps) => {
  return (
    <div className={clsx(style.card, className)} onClick={onClick}>
      <div className={style.header}>
        <img src={image} alt={'img'} className={style.img} />
      </div>

      <div className={style.content}>
        <div className={style.body}>
          {captionSlot}

          <Text view={TextView.P_20} weight={TextWeight.MEDIUM} maxLines={2}>
            {title}
          </Text>

          <Text view={TextView.P_16} weight={TextWeight.NORMAL} color={TextColor.SECONDARY} maxLines={3}>
            {subtitle}
          </Text>
        </div>

        <div className={style.footer}>
          {contentSlot && (
            <Text view={TextView.P_18} weight={TextWeight.BOLD} color={TextColor.ACCENT}>
              {contentSlot}
            </Text>
          )}

          {actionSlot}
        </div>
      </div>
    </div>
  );
};

export default Card;
