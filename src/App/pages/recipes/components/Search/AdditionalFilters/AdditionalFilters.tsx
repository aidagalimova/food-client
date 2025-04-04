import { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import Input from 'components/Input';
import CheckBox from 'components/CheckBox';
import Slider from 'components/Slider';
import Button, { ButtonVariant } from 'components/Button';
import Text, { TextView, TextWeight } from 'components/Text';
import { useRecipeFilters, MIN_RATING, MAX_RATING } from 'store/recipeFiltersStore';

import style from './AdditionalFilters.module.scss';

type AdditionalFiltersProps = {
  isOpen: boolean;
};

export const AdditionalFilters = observer(({ isOpen }: AdditionalFiltersProps) => {
  const { rating, totalTime, cookingTime, preparationTime, vegetarian, handleAdditionalFiltersChange } =
    useRecipeFilters();

  const [localRating, setLocalRating] = useState<number | null>(null);
  const [localTotalTime, setLocalTotalTime] = useState<number | null>(null);
  const [localCookingTime, setLocalCookingTime] = useState<number | null>(null);
  const [localPreparationTime, setLocalPreparationTime] = useState<number | null>(null);
  const [localVegetarian, setLocalVegetarian] = useState<boolean>(false);

  useEffect(() => {
    setLocalRating(rating);
    setLocalTotalTime(totalTime);
    setLocalCookingTime(cookingTime);
    setLocalPreparationTime(preparationTime);
    setLocalVegetarian(vegetarian);
  }, [rating, totalTime, cookingTime, preparationTime, vegetarian]);

  const applyFilters = useCallback(() => {
    handleAdditionalFiltersChange({
      rating: localRating,
      totalTime: localTotalTime,
      cookingTime: localCookingTime,
      preparationTime: localPreparationTime,
      vegetarian: localVegetarian,
    });
  }, [
    localRating,
    localTotalTime,
    localCookingTime,
    localPreparationTime,
    localVegetarian,
    handleAdditionalFiltersChange,
  ]);

  const clearFilters = useCallback(() => {
    setLocalRating(MIN_RATING);
    setLocalTotalTime(null);
    setLocalCookingTime(null);
    setLocalPreparationTime(null);
    setLocalVegetarian(false);

    handleAdditionalFiltersChange({
      rating: MIN_RATING,
      vegetarian: false,
      totalTime: null,
      cookingTime: null,
      preparationTime: null,
    });
  }, [handleAdditionalFiltersChange]);

  return (
    <div className={clsx(style.container, { [style.containerClosed]: !isOpen })}>
      <Text view={TextView.P_20} weight={TextWeight.BOLD}>
        Filters
      </Text>

      <div className={style.bodyContainer}>
        <div className={style.filtersContainer}>
          <div className={style.timesFilterGroup}>
            <Input
              className={style.timeInput}
              placeholder="Total time"
              value={localTotalTime?.toString() || ''}
              onChange={(value) => setLocalTotalTime(Number(value) || null)}
              type="number"
              min={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  applyFilters();
                }
              }}
            />

            <Input
              className={style.timeInput}
              placeholder="Cooking time"
              value={localCookingTime?.toString() || ''}
              onChange={(value) => setLocalCookingTime(Number(value) || null)}
              type="number"
              min={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  applyFilters();
                }
              }}
            />

            <Input
              className={style.timeInput}
              placeholder="Preparation time"
              value={localPreparationTime?.toString() || ''}
              onChange={(value) => setLocalPreparationTime(Number(value) || null)}
              type="number"
              min={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  applyFilters();
                }
              }}
            />
          </div>

          <div className={style.additionalFiltersContainer}>
            <div className={style.ratingFilterGroup}>
              <Text view={TextView.P_16} weight={TextWeight.MEDIUM}>
                Rating
              </Text>
              <Slider
                min={MIN_RATING}
                max={MAX_RATING}
                value={localRating ?? undefined}
                onChange={(value) => setLocalRating(value)}
              />
            </div>

            <div className={style.checkboxFilterGroup}>
              <CheckBox checked={localVegetarian === true} onChange={(value) => setLocalVegetarian(value)} />
              <Text view={TextView.P_16} weight={TextWeight.MEDIUM}>
                Vegetarian
              </Text>
            </div>
          </div>
        </div>
        <div className={style.buttonsContainer}>
          <Button onClick={clearFilters} variant={ButtonVariant.SECONDARY}>
            Clear
          </Button>
          <Button onClick={applyFilters}>Apply</Button>
        </div>
      </div>
    </div>
  );
});
