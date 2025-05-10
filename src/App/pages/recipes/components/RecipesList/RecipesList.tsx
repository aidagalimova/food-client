import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import PageLoader from 'components/PageLoader';
import Card from 'components/Card';
import Text, { TextView } from 'components/Text';
import TimeIcon from 'components/icons/TimeIcon';
import { IconColor } from 'components/icons/Icon';
import Button from 'components/Button';
import ErrorText from 'components/ErrorText';
import Pagination from 'components/Pagination';
import { useRecipes } from 'store/recipesStore';

import style from './RecipesList.module.scss';

const RecipesList = observer(() => {
  const navigate = useNavigate();
  const { recipes, isLoading, error } = useRecipes();

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <ErrorText error={error} />;
  }

  if (!recipes.length) {
    return (
      <Text view={TextView.P_20} className={style.notFound} nonSelectable>
        No recipes found
      </Text>
    );
  }

  return (
    <>
      <section className={style.recipesList}>
        {recipes.map((recipe) => {
          return (
            <Card
              key={recipe.id}
              onClick={() => navigate(`/recipes/${recipe.documentId}`)}
              image={recipe.images[0].url}
              captionSlot={
                <div className={style.captionSlot}>
                  <TimeIcon color={IconColor.ACCENT} />
                  <Text view={TextView.P_14}>{`${recipe.cookingTime} minutes`}</Text>
                </div>
              }
              title={recipe.name}
              subtitle={recipe.ingradients.map((ingradient) => ingradient.name).join(' + ')}
              contentSlot={`${recipe.calories} kcal`}
              actionSlot={<Button onClick={(e) => e.stopPropagation()}>Save</Button>}
              className={style.recipeCard}
            />
          );
        })}
      </section>

      {recipes.length > 0 && <Pagination />}
    </>
  );
});

export default RecipesList;
