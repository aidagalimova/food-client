import { observer } from 'mobx-react-lite';
import Text, { TextView, TextWeight, TextTag } from 'components/Text';
import { IngredientIcon } from 'components/icons/IngredientIcon';
import { IconColor } from 'components/icons/Icon';
import MinusIcon from 'components/icons/MinusIcon';
import Button from 'components/Button';
import Link from 'components/Link';
import PageLoader from 'components/PageLoader';
import ErrorText from 'components/ErrorText';
import { Ingredient, FullRecipe } from 'api/recipes/types';
import { useSavedIngredients } from 'store/savedIngredientsStore';
import { useRecipes } from 'store/recipesStore';

import style from './Cart.module.scss';

const Cart = observer(() => {
  const { ingredientsByRecipeId, handleIngredientToggle, ingredientsRecipesIds } = useSavedIngredients();
  const { recipesByIds, isLoading, error } = useRecipes(ingredientsRecipesIds);

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <ErrorText error={error} />;
  }

  return (
    <div className={style.container}>
      <Text view={TextView.P_20} weight={TextWeight.SEMIBOLD} tag={TextTag.H1}>
        Shopping List
      </Text>

      {ingredientsRecipesIds.length === 0 && (
        <Text view={TextView.P_16} weight={TextWeight.NORMAL}>
          You don't have any saved ingredients in your shopping list yet
        </Text>
      )}

      <ul className={style.list}>
        {ingredientsRecipesIds.map((recipeId) => (
          <RecipeIngredients
            key={recipeId}
            ingredients={ingredientsByRecipeId(recipeId)}
            onIngredientToggle={handleIngredientToggle}
            recipe={recipesByIds.get(recipeId)}
          />
        ))}
      </ul>
    </div>
  );
});

type RecipeIngredientsProps = {
  ingredients: Ingredient[];
  recipe?: FullRecipe;
  onIngredientToggle: (ingredient: Ingredient, recipeId: string) => void;
};

const RecipeIngredients = observer(({ ingredients, recipe, onIngredientToggle }: RecipeIngredientsProps) => {
  if (!recipe) return null;

  return (
    <li className={style.recipe}>
      {<Link to={`/recipes/${recipe.documentId}`} name={recipe.name} />}

      <ul className={style.ingredientsList}>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id} className={style.listItem}>
            <div className={style.itemContent}>
              <IngredientIcon color={IconColor.ACCENT} />
              <Text view={TextView.P_16} weight={TextWeight.NORMAL}>
                {ingredient.amount} {ingredient.unit} {ingredient.name}
              </Text>
            </div>
            <Button onClick={() => onIngredientToggle(ingredient, recipe.documentId)}>
              <MinusIcon />
            </Button>
          </li>
        ))}
      </ul>
    </li>
  );
});

export default Cart;
