import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import Loader from 'components/Loader';
import Text, { TextTag, TextView, TextWeight } from 'components/Text';
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';
import { IconColor } from 'components/icons/Icon';
import ErrorText from 'components/ErrorText';
import recipesApi, { FullRecipe } from 'api/recipes';
import type { ApiError } from 'api/types';
import RecipeInfo from './components/RecipeInfo';
import RecipeNeeds from './components/RecipeNeeds';
import RecipeDirections from './components/RecipeDirections';

import style from './Recipe.module.scss';

type RecipeParams = {
  id: string;
};

const Recipe = () => {
  const { id } = useParams<RecipeParams>();
  const [recipe, setRecipe] = useState<FullRecipe | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;

      try {
        setError(null);
        const response = await recipesApi.getRecipeById(id);
        setRecipe(response.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.response?.data.error);
        }
      }
    };

    fetchRecipe();
  }, [id]);

  if (error) {
    return <ErrorText error={error} link="/recipes" linkText="Вернуться к списку рецептов" />;
  }

  if (!recipe) {
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
};

export default Recipe;
