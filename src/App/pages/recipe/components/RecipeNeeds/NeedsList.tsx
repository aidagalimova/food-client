import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import { Equipment, Ingredient } from 'api/recipes';
import Button, { ButtonVariant } from 'components/Button';
import Text, { TextView, TextWeight, TextTag, TextColor } from 'components/Text';
import { IngredientIcon } from 'components/icons/IngredientIcon';
import { EquipmentIcon } from 'components/icons/EquipmentIcon';
import { IconColor } from 'components/icons/Icon';
import PlusIcon from 'components/icons/PlusIcon';
import MinusIcon from 'components/icons/MinusIcon';
import { useSavedIngredients } from 'store/savedIngredientsStore';

import { NeedType } from './RecipeNeeds.types';
import style from './RecipeNeeds.module.scss';
import { useRecipe } from 'store/recipeStore';

type NeedsListIngredients = {
  type: NeedType.INGREDIENT;
  items: Ingredient[];
};

type NeedsListEquipment = {
  type: NeedType.EQUIPMENT;
  items: Equipment[];
};

type NeedsListProps = (NeedsListIngredients | NeedsListEquipment) & {
  className?: string;
};

const NeedsList = ({ items, type, className }: NeedsListProps) => {
  const {
    hasIngredient,
    handleIngredientToggle,
    addAllRecipeIngredients,
    removeAllRecipeIngredients,
    ingredientsByRecipeId,
  } = useSavedIngredients();
  const { recipe } = useRecipe();
  const recipeId = recipe?.documentId;

  const isAllIngredientsAdded = recipeId && ingredientsByRecipeId(recipeId).length === items.length;

  const handleToggle = (ingredient: Ingredient) => {
    if (recipeId) {
      handleIngredientToggle(ingredient, recipeId);
    }
  };

  const handleToggleAll = () => {
    if (recipeId && type === NeedType.INGREDIENT) {
      if (isAllIngredientsAdded) {
        removeAllRecipeIngredients(recipeId);
      } else {
        addAllRecipeIngredients(items as Ingredient[], recipeId);
      }
    }
  };

  return (
    <section className={clsx(style.listContainer, className)}>
      <div className={style.listHeader}>
        <Text view={TextView.P_20} weight={TextWeight.SEMIBOLD} tag={TextTag.H2}>
          {type}
        </Text>

        {type === NeedType.INGREDIENT && (
          <div onClick={handleToggleAll} className={style.addAllContainer}>
            <Text view={TextView.P_14} weight={TextWeight.NORMAL} tag={TextTag.SPAN} color={TextColor.ACCENT}>
              {isAllIngredientsAdded ? 'Remove all' : 'Add all'}
            </Text>
          </div>
        )}
      </div>

      <ul className={style.list}>
        {items.map((item) => (
          <li key={item.id} className={style.listItem}>
            {type === NeedType.INGREDIENT ? (
              <IngredientIcon color={IconColor.ACCENT} />
            ) : (
              <EquipmentIcon color={IconColor.ACCENT} />
            )}
            <Text view={TextView.P_16} weight={TextWeight.NORMAL}>
              {type === NeedType.INGREDIENT && (item as Ingredient).amount} {item.name}
            </Text>
            {type === NeedType.INGREDIENT && (
              <Button
                onClick={() => handleToggle(item as Ingredient)}
                variant={ButtonVariant.SECONDARY}
                className={style.addButton}
              >
                {recipeId && hasIngredient(item.id, recipeId) ? (
                  <MinusIcon color={IconColor.ACCENT} />
                ) : (
                  <PlusIcon color={IconColor.ACCENT} />
                )}
              </Button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default observer(NeedsList);
