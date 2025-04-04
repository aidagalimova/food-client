import { useCallback, useEffect, useRef, useState, memo, useMemo } from 'react';
import Text from 'components/Text';
import { TextView } from 'components/Text/Text.types';

import styles from './Slider.module.scss';
import clsx from 'clsx';
import { MIN_RATING } from 'store/recipeFiltersStore';

export type SliderProps = {
  min: number;
  max: number;
  value?: number;
  onChange: (value: number) => void;
  className?: string;
};

const Slider = ({ min, max, onChange, className, value = MIN_RATING }: SliderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  // Конвертирует позицию курсора в значение
  const getValueFromPosition = useCallback(
    (position: number): number => {
      if (!sliderRef.current) return min;

      const { width, left } = sliderRef.current.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(1, (position - left) / width));
      const rawValue = min + percentage * (max - min);

      return Math.round(rawValue);
    },
    [min, max],
  );

  // Обновляет значение при движении мыши
  const updateValue = useCallback(
    (event: MouseEvent | React.MouseEvent) => {
      onChange(getValueFromPosition(event.clientX));
    },
    [getValueFromPosition, onChange],
  );

  const generateMarkers = useMemo(() => {
    const markers = [];
    for (let i = min; i <= max; i++) {
      markers.push(
        <div key={i} className={styles.marker} style={{ left: `${((i - min) / (max - min)) * 100}%` }}>
          <Text view={TextView.P_14}>{i}</Text>
        </div>,
      );
    }
    return markers;
  }, [min, max]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        updateValue(event);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, updateValue]);

  const percentage = useMemo(() => {
    return ((value - min) / (max - min)) * 100;
  }, [value, min, max]);

  return (
    <div className={clsx(styles.slider, className)}>
      <div className={styles.container} ref={sliderRef} onClick={updateValue}>
        <div className={styles.progress} style={{ width: `${percentage}%` }} />
        <div className={styles.thumb} style={{ left: `${percentage}%` }} onMouseDown={() => setIsDragging(true)} />
      </div>

      <div className={styles.markers}>{generateMarkers}</div>
    </div>
  );
};

export default memo(Slider);
