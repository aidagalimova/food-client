import { useCallback, memo, useMemo } from 'react';
import clsx from 'clsx';
import Text from 'components/Text';
import { TextView } from 'components/Text/Text.types';
import styles from './Slider.module.scss';

export type SliderProps = {
  min: number;
  max: number;
  value: number | null;
  onChange: (value: number) => void;
  className?: string;
};

const Slider = ({ min, max, onChange, className, value }: SliderProps) => {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value);
      onChange(newValue);
    },
    [onChange],
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

  return (
    <div className={clsx(styles.container, className)}>
      <input
        type="range"
        min={min}
        max={max}
        value={value || min}
        onChange={handleInputChange}
        className={styles.rangeInput}
      />
      <div className={styles.markers}>{generateMarkers}</div>
    </div>
  );
};

export default memo(Slider);
