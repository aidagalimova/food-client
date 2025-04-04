import { useParams, Link } from 'react-router-dom';
import Loader from 'components/Loader';
import Text, { TextTag, TextView, TextWeight } from 'components/Text';
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';
import { IconColor } from 'components/icons/Icon';
import ErrorText from 'components/ErrorText';
import RecipeInfo from './components/RecipeInfo';
import RecipeNeeds from './components/RecipeNeeds';
import RecipeDirections from './components/RecipeDirections';
import { useRecipe } from 'store/recipeStore';
import { observer } from 'mobx-react-lite';

import style from './Recipe.module.scss';

type RecipeParams = {
  id: string;
};

const Recipe = observer(() => {
  const { id } = useParams<RecipeParams>();
  const { recipe, isLoading, error } = useRecipe(id);

  if (error) {
    return <ErrorText error={error} link="/recipes" linkText="Back to recipes list" />;
  }

  if (isLoading || !recipe) {
    return (
      <div className={style.loaderContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <article className={style.recipePage}>
      <header className={style.recipeHeader}>
        <Link to="/recipes" className={style.backLink}>
          <ArrowLeftIcon color={IconColor.ACCENT} cursor="pointer" />
        </Link>

        <Text view={TextView.TITLE} weight={TextWeight.BOLD} tag={TextTag.H1}>
          {recipe.name}
        </Text>
      </header>

      <main className={style.recipeContent}>
        <RecipeInfo
          image={recipe.images[0].url}
          imageAlt={recipe.images[0].alternativeText}
          preparationTime={recipe.preparationTime}
          cookingTime={recipe.cookingTime}
          totalTime={recipe.totalTime}
          likes={recipe.likes}
          servings={recipe.servings}
          rating={recipe.rating}
          summary={recipe.summary}
        />

        <RecipeNeeds recipeIngredients={recipe.ingradients} recipeEquipment={recipe.equipments} />

        <RecipeDirections recipeDirections={recipe.directions} />
      </main>
    </article>
  );
});

export default Recipe;
