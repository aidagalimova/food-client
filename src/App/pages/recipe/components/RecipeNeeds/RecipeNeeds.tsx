import { Ingredient, Equipment } from 'api/recipes';

import NeedsList from './NeedsList';
import { NeedType } from './RecipeNeeds.types';
import style from './RecipeNeeds.module.scss';

type RecipeNeedsProps = {
  recipeIngredients: Ingredient[];
  recipeEquipment: Equipment[];
};

const RecipeNeeds = ({ recipeIngredients, recipeEquipment }: RecipeNeedsProps) => {
  return (
    <div className={style.container}>
      <NeedsList items={recipeIngredients} type={NeedType.INGREDIENT} />
      <NeedsList items={recipeEquipment} type={NeedType.EQUIPMENT} />
    </div>
  );
};

export default RecipeNeeds;
