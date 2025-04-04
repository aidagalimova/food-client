import Icon, { IconProps } from '../Icon';

const CheckIcon: React.FC<IconProps> = ({ width = 24, height = 24, className, ...props }) => {
  return (
    <Icon {...props} width={width} height={height} fill="none" className={className}>
      <path d="M4 11.613L9.878 18 20 7" stroke="currentColor" strokeWidth="2" />
    </Icon>
  );
};

export default CheckIcon;
