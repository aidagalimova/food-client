import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';
import Text, { TextView } from 'components/Text';
import ArrowLeftIcon from 'components//icons/ArrowLeftIcon';
import Button from 'components/Button';
import { useRecipeFilters } from 'store/recipeFiltersStore';

import style from './Pagination.module.scss';

type PaginationButtonProps = {
  pageNumber: number;
  onPageChange: (page: number) => void;
  isActive: boolean;
};

const PaginationButton = ({ pageNumber, onPageChange, isActive }: PaginationButtonProps) => {
  return (
    <Button onClick={() => onPageChange(pageNumber)} className={clsx(style.pageButton, { [style.active]: isActive })}>
      {pageNumber}
    </Button>
  );
};

const Pagination = () => {
  const { page, pageCount, handlePageChange } = useRecipeFilters();

  const renderPageNumbers = useMemo(() => {
    const pages = [];
    // Первая страница
    pages.push(
      <PaginationButton key={1} pageNumber={1} onPageChange={() => handlePageChange(1)} isActive={page === 1} />,
    );

    // Многоточие в начале
    if (page > 3) {
      pages.push(
        <Text key={2} view={TextView.P_18} nonSelectable>
          ...
        </Text>,
      );
    }

    // Страницы вокруг текущей
    for (let i = Math.max(2, page - 1); i <= Math.min(pageCount - 1, page + 1); i++) {
      pages.push(
        <PaginationButton key={i} pageNumber={i} onPageChange={() => handlePageChange(i)} isActive={page === i} />,
      );
    }

    // Многоточие в конце
    if (page < pageCount - 2) {
      pages.push(
        <Text key={pageCount - 1} view={TextView.P_18} nonSelectable>
          ...
        </Text>,
      );
    }

    // Последняя страница
    if (pageCount > 1) {
      pages.push(
        <PaginationButton
          key={pageCount}
          pageNumber={pageCount}
          onPageChange={() => handlePageChange(pageCount)}
          isActive={page === pageCount}
        />,
      );
    }

    return pages;
  }, [page, pageCount, handlePageChange]);

  return (
    <div className={style.pagination}>
      <button disabled={page === 1} onClick={() => handlePageChange(page - 1)} className={clsx(style.arrowButton)}>
        <ArrowLeftIcon />
      </button>

      <div className={style.pageNumbersContainer}>{renderPageNumbers}</div>

      <button
        disabled={page === pageCount}
        onClick={() => handlePageChange(page + 1)}
        className={clsx(style.arrowButton, style.rightArrow)}
      >
        <ArrowLeftIcon />
      </button>
    </div>
  );
};

export default observer(Pagination);
