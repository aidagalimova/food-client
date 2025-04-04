import clsx from 'clsx';

import style from './Text.module.scss';
import { JSX } from 'react';
import { TextView, TextTag, TextWeight, TextColor } from './Text.types';

export type TextProps = {
  className?: string;
  view?: TextView;
  tag?: TextTag;
  weight?: TextWeight;
  children: React.ReactNode;
  color?: TextColor;
  maxLines?: number;
  highlighted?: boolean;
  nonSelectable?: boolean;
};

const Text = ({
  className,
  view,
  tag = TextTag.P,
  weight,
  children,
  color,
  maxLines,
  highlighted,
  nonSelectable,
}: TextProps) => {
  const TextTag = tag as keyof JSX.IntrinsicElements;

  return (
    <TextTag
      color={color}
      className={clsx(
        style.text,
        maxLines && style.maxLines,
        highlighted && style.highlighted,
        nonSelectable && style.nonSelectable,
        view && style[view],
        weight && style[weight],
        color && style[color],
        className,
      )}
      style={{ WebkitLineClamp: maxLines }}
    >
      {children}
    </TextTag>
  );
};

export default Text;
