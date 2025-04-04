import Text, { TextTag, TextView, TextWeight } from 'components/Text';
import type { Direction } from 'api/recipes';

import style from './RecipeDirections.module.scss';

type RecipeDirectionsProps = {
  recipeDirections?: Direction[];
};

const RecipeDirections = ({ recipeDirections }: RecipeDirectionsProps) => {
  return (
    <section className={style.directionsSection}>
      <Text view={TextView.P_20} weight={TextWeight.SEMIBOLD} tag={TextTag.H2}>
        Directions
      </Text>

      <ol className={style.directionsList}>
        {recipeDirections?.map((step: Direction, index: number) => (
          <li key={step.id} className={style.directionItem}>
            <Text view={TextView.P_16} weight={TextWeight.SEMIBOLD} tag={TextTag.H3}>
              Step {index + 1}
            </Text>

            <Text view={TextView.P_14} weight={TextWeight.NORMAL}>
              {step.description}
            </Text>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default RecipeDirections;
