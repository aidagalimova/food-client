import { Ingredient, Equipment } from 'api/types';

import NeedsList from './NeedsList';
import { NeedType } from './RecipeNeeds.types';
import style from './RecipeNeeds.module.scss';

interface RecipeNeedsProps {
  recipeIngredients: Ingredient[];
  recipeEquipment: Equipment[];
}

const RecipeNeeds = ({ recipeIngredients, recipeEquipment }: RecipeNeedsProps) => {
  return (
    <div className={style.container}>
      <NeedsList items={recipeIngredients} type={NeedType.INGREDIENT} />
      <NeedsList items={recipeEquipment} type={NeedType.EQUIPMENT} />
    </div>
  );
};

export default RecipeNeeds;
