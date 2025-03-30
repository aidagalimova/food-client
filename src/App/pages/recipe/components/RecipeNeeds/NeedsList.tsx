import clsx from 'clsx';
import { Equipment, Ingredient } from 'api/types';
import Text, { TextView, TextWeight, TextTag } from 'components/Text';
import { IngredientIcon } from 'components/icons/IngredientIcon';
import { EquipmentIcon } from 'components/icons/EquipmentIcon';
import { IconColor } from 'components/icons/Icon';

import { NeedType } from './RecipeNeeds.types';
import style from './RecipeNeeds.module.scss';

interface NeedsListProps {
  items: (Ingredient | Equipment)[];
  type: NeedType;
  className?: string;
}

const NeedsList = ({ items, type, className }: NeedsListProps) => {
  return (
    <section className={clsx(style.listContainer, className)}>
      <Text view={TextView.P_20} weight={TextWeight.SEMIBOLD} tag={TextTag.H2}>
        {type}
      </Text>

      <ul className={style.list}>
        {items.map((item) => (
          <li key={item.id} className={style.listItem}>
            {type === NeedType.INGREDIENT ? (
              <IngredientIcon color={IconColor.ACCENT} />
            ) : (
              <EquipmentIcon color={IconColor.ACCENT} />
            )}
            <Text view={TextView.P_16} weight={TextWeight.NORMAL}>
              {'amount' in item && item.amount} {item.name}
            </Text>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NeedsList;
