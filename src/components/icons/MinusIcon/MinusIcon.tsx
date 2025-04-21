import Icon, { IconProps } from '../Icon';

const MinusIcon: React.FC<IconProps> = ({ width = 24, height = 24, className, ...props }) => {
  return (
    <Icon {...props} width={width} height={height} className={className}>
      <path d="M19 12.998H5V10.998H19V12.998Z" fill="currentColor" />
    </Icon>
  );
};

export default MinusIcon;
