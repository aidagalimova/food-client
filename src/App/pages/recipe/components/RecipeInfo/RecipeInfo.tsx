import { useMemo } from 'react';
import DOMPurify from 'dompurify';
import Text, { TextView, TextWeight, TextColor } from 'components/Text';

import style from './RecipeInfo.module.scss';

interface RecipeInfoProps {
  preparationTime: number;
  cookingTime: number;
  totalTime: number;
  likes: number;
  servings: number;
  rating: number;
  summary: string;
  image: string;
  imageAlt: string | null;
}

const RecipeInfo = ({
  preparationTime,
  cookingTime,
  totalTime,
  likes,
  servings,
  rating,
  summary,
  image,
  imageAlt,
}: RecipeInfoProps) => {
  const recipeInfoData = useMemo(
    () => [
      { title: 'Preparation', value: `${preparationTime} minutes` },
      { title: 'Cooking', value: `${cookingTime} minutes` },
      { title: 'Total', value: `${totalTime} minutes` },
      { title: 'Likes', value: likes },
      { title: 'Servings', value: `${servings} servings` },
      { title: 'Ratings', value: `${rating} / 5` },
    ],
    [preparationTime, cookingTime, totalTime, likes, servings, rating],
  );

  return (
    <section className={style.recipeInfoContainer}>
      <section className={style.recipeInfoHeader}>
        <img src={image} alt={imageAlt || 'Food'} className={style.recipeInfoImage} />

        <div className={style.recipeInfoContainer}>
          <section className={style.recipeInfo}>
            {recipeInfoData.map((info) => (
              <div key={info.title} className={style.infoBlock}>
                <Text view={TextView.P_16} weight={TextWeight.NORMAL}>
                  {info.title}
                </Text>

                <Text view={TextView.P_16} weight={TextWeight.SEMIBOLD} color={TextColor.ACCENT}>
                  {info.value}
                </Text>
              </div>
            ))}
          </section>
        </div>
      </section>

      <section
        className={style.description}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(summary),
        }}
      />
    </section>
  );
};

export default RecipeInfo;
