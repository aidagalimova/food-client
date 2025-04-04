import Icon, { IconProps } from '../Icon';

const CrossIcon: React.FC<IconProps> = ({ width = 24, height = 24, className, ...props }) => {
  return (
    <Icon {...props} width={width} height={height} fill="none" className={className}>
      <path d="M20 20L4 4M20 4L4 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </Icon>
  );
};
export default CrossIcon;
