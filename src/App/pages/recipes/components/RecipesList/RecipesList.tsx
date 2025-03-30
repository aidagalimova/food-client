import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'components/Card';
import Text, { TextView } from 'components/Text';
import Loader from 'components/Loader';
import Button from 'components/Button';
import TimeIcon from 'components/icons/TimeIcon';
import { IconColor } from 'components/icons/Icon';
import ErrorText from 'components/ErrorText';
import Pagination from 'components/Pagination';
import { Recipe, ApiError, PaginationMeta } from 'api/types';
import { recipesApi } from 'api/recipes';
import { useAddSearchParam } from 'utils/useAddSearchParams';

import style from './RecipesList.module.scss';

const RecipesList = () => {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const [paginationInfo, setPaginationInfo] = useState<PaginationMeta | null>(null);

  const [searchParams, addSearchParam] = useAddSearchParam();
  const currentPage = useMemo(() => Number(searchParams.get('page') || 1), [searchParams]);
  const searchText = useMemo(() => searchParams.get('search') || '', [searchParams]);
  const categoryIds = useMemo(() => searchParams.get('categoryIds') || '', [searchParams]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await recipesApi.getRecipes({
          searchText,
          categoryIds: categoryIds ? categoryIds.split(',') : [],
          page: currentPage,
        });

        setRecipes(response.data);
        setPaginationInfo(response.meta.pagination);
      } catch (err: any) {
        setError(err.response.data.error);
      }
    };

    fetchRecipes();
  }, [searchText, categoryIds, currentPage]);

  useEffect(() => {
    handlePageChange();
  }, [searchText, categoryIds]);

  const handlePageChange = (page = 1) => {
    addSearchParam('page', page.toString());
  };

  if (error) {
    return <ErrorText error={error} />;
  }

  if (recipes === null) {
    return (
      <div className={style.loaderContainer}>
        <Loader />
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <Text view={TextView.P_20} className={style.notFound} nonSelectable>
        Ничего не найдено
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

      {recipes?.length > 0 && paginationInfo && (
        <Pagination
          totalPages={paginationInfo?.pageCount}
          currentPage={paginationInfo?.page}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default RecipesList;
