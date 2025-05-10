import DOMPurify from 'dompurify';
import { observer } from 'mobx-react-lite';
import Text, { TextView, TextWeight, TextColor, TextTag } from 'components/Text';
import Button, { ButtonVariant } from 'components/Button';
import { useRecipe } from 'store/recipeStore';
import MinusIcon from 'components/icons/MinusIcon';
import PlusIcon from 'components/icons/PlusIcon';
import { IconColor } from 'components/icons/Icon';

import style from './RecipeInfo.module.scss';

type RecipeInfoProps = {
  preparationTime: number;
  cookingTime: number;
  totalTime: number;
  likes: number;
  servings: number;
  rating: number;
  summary: string;
  image: string;
  imageAlt: string | null;
};

const RecipeInfo = observer(
  ({ preparationTime, cookingTime, totalTime, likes, servings, rating, summary, image, imageAlt }: RecipeInfoProps) => {
    const { servingsMultiplier, setServingsMultiplier } = useRecipe();
    const currentServings = Math.round(servings * servingsMultiplier);
    const step = 1 / servings;

    const handleDecrease = () => {
      if (servingsMultiplier >= step) {
        const newMultiplier = parseFloat((servingsMultiplier - step).toFixed(4));
        setServingsMultiplier(newMultiplier);
      }
    };

    const handleIncrease = () => {
      setServingsMultiplier(servingsMultiplier + step);
    };

    const recipeInfoData = [
      { title: 'Preparation', value: `${preparationTime} minutes` },
      { title: 'Cooking', value: `${cookingTime} minutes` },
      { title: 'Total', value: `${totalTime} minutes` },
      { title: 'Likes', value: likes },
      {
        title: 'Servings',
        value: (
          <div className={style.servingsControl}>
            <Button onClick={handleDecrease} variant={ButtonVariant.SECONDARY} className={style.servingsButton}>
              <MinusIcon color={IconColor.ACCENT} />
            </Button>
            <Text view={TextView.P_16} weight={TextWeight.SEMIBOLD} color={TextColor.ACCENT}>
              {currentServings}
            </Text>
            <Button onClick={handleIncrease} variant={ButtonVariant.SECONDARY} className={style.servingsButton}>
              <PlusIcon color={IconColor.ACCENT} />
            </Button>
          </div>
        ),
      },
      { title: 'Ratings', value: `${rating} / 5` },
    ];

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

                  <Text view={TextView.P_16} weight={TextWeight.SEMIBOLD} color={TextColor.ACCENT} tag={TextTag.SPAN}>
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
  },
);

export default RecipeInfo;
