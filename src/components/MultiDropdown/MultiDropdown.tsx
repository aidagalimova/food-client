import { memo, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import Input from '../Input';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import Text, { TextView, TextWeight } from '../Text';
import { useClickOutside } from 'utils/useClickOutside';

import style from './MultiDropdown.module.scss';

export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  getTitle: (value: Option[]) => string;
};

const MultiDropdown = ({ className, options, value, onChange, getTitle, disabled }: MultiDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setIsOpen(false));

  const filteredOptions = useMemo(() => {
    if (!searchValue) return options;

    return options.filter((option) => option.value.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }, [searchValue, options]);

  const optionItems = useMemo(() => {
    if (!filteredOptions.length) {
      return (
        <li className={style.notFound}>
          <Text view={TextView.P_16} weight={TextWeight.NORMAL}>
            No options found
          </Text>
        </li>
      );
    }

    return filteredOptions.map((option) => {
      const withoutCurOption = value.filter((value) => value.key !== option.key);
      const isSelected = withoutCurOption.length !== value.length;

      return (
        <li
          key={option.key}
          className={clsx(style.optionsItem, { [style.selected]: isSelected })}
          onClick={() => onChange(isSelected ? withoutCurOption : [...value, option])}
        >
          <Text view={TextView.P_16} weight={TextWeight.NORMAL}>
            {option.value}
          </Text>
        </li>
      );
    });
  }, [value, onChange, filteredOptions]);

  return (
    <div className={clsx(style.dropdownContainer, className)} ref={ref}>
      <Input
        placeholder={getTitle(value)}
        value={searchValue ? searchValue : ''}
        onChange={(value) => setSearchValue(value)}
        afterSlot={
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className={clsx(style.arrowIcon, { [style.arrowUpIcon]: isOpen })}
          >
            <ArrowDownIcon />
          </div>
        }
        onFocus={() => setIsOpen(true)}
        disabled={disabled}
        className={clsx({ [style.withSelectedValues]: value.length })}
      />

      {isOpen && !disabled && <ul className={style.optionsList}>{optionItems}</ul>}
    </div>
  );
};

export default memo(MultiDropdown);
