import { FC, useMemo } from 'react';
import clsx from 'clsx';
import Text, { TextView } from 'components/Text';
import ArrowLeftIcon from 'components//icons/ArrowLeftIcon';
import Button from 'components/Button';

import style from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

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

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = useMemo(() => {
    const pages = [];

    // Первая страница
    pages.push(<PaginationButton key={1} pageNumber={1} onPageChange={onPageChange} isActive={currentPage === 1} />);

    // Многоточие в начале
    if (currentPage > 3) {
      pages.push(
        <Text key={2} view={TextView.P_18} nonSelectable>
          ...
        </Text>,
      );
    }

    // Страницы вокруг текущей
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(<PaginationButton key={i} pageNumber={i} onPageChange={onPageChange} isActive={currentPage === i} />);
    }

    // Многоточие в конце
    if (currentPage < totalPages - 2) {
      pages.push(
        <Text key={totalPages - 1} view={TextView.P_18} nonSelectable>
          ...
        </Text>,
      );
    }

    // Последняя страница
    if (totalPages > 1) {
      pages.push(
        <PaginationButton
          key={totalPages}
          pageNumber={totalPages}
          onPageChange={onPageChange}
          isActive={currentPage === totalPages}
        />,
      );
    }

    return pages;
  }, [currentPage, totalPages, onPageChange]);

  return (
    <div className={style.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={clsx(style.arrowButton)}
      >
        <ArrowLeftIcon />
      </button>

      <div className={style.pageNumbersContainer}>{renderPageNumbers}</div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={clsx(style.arrowButton, style.rightArrow)}
      >
        <ArrowLeftIcon />
      </button>
    </div>
  );
};

export default Pagination;
